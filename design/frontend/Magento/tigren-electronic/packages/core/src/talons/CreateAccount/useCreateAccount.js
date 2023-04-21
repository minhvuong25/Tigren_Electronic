import { useCallback, useMemo, useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { useIntl } from 'react-intl';

import { clearCartDataFromCache } from '@magento/peregrine/lib/Apollo/clearCartDataFromCache';
import { clearCustomerDataFromCache } from '@magento/peregrine/lib/Apollo/clearCustomerDataFromCache';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { retrieveCartId } from '@magento/peregrine/lib/store/actions/cart';
import { useToasts } from '@magento/peregrine';

import DEFAULT_OPERATIONS from './createAccount.gql';
import { useHistory } from 'react-router-dom';

/**
 * Returns props necessary to render CreateAccount component. In particular this
 * talon handles the submission flow by first doing a pre-submisson validation
 * and then, on success, invokes the `onSubmit` prop, which is usually the action.
 *
 * @param {CreateAccountQueries} props.queries queries used by the talon
 * @param {CreateAccountMutations} props.mutations mutations used by the talon
 * @param {InitialValues} props.initialValues initial values to sanitize and seed the form
 * @param {Function} props.onSubmit the post submit callback
 * @param {Function} props.onCancel the cancel callback
 *
 * @returns {CreateAccountProps}
 *
 * @example <caption>Importing into your project</caption>
 * import { useForgotPassword } from '@magento/peregrine/lib/talons/CreateAccount/useCreateAccount.js';
 */
export const useCreateAccount = props => {
    const { initialValues = {}, onSubmit, onCancel, orderNumber } = props;
    const [isTermCheck, setIsTermCheck] = useState(false);

    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);

    const {
        createAccountMutation,
        createCartMutation,
        getCartDetailsQuery,
        getCustomerQuery,
        mergeCartsMutation,
        signInMutation
    } = operations;

    const apolloClient = useApolloClient();
    const [, { addToast }] = useToasts();
    const { formatMessage } = useIntl();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [
        { cartId },
        { createCart, removeCart, getCartDetails }
    ] = useCartContext();
    const [
        { isGettingDetails },
        { getUserDetails, setToken }
    ] = useUserContext();

    const history = useHistory();

    const [fetchCartId] = useMutation(createCartMutation);

    const [mergeCarts] = useMutation(mergeCartsMutation);

    // For create account and sign in mutations, we don't want to cache any
    // personally identifiable information (PII). So we set fetchPolicy to 'no-cache'.
    const [createAccount, { error: createAccountError }] = useMutation(
        createAccountMutation,
        {
            fetchPolicy: 'no-cache'
        }
    );

    const [signIn, { error: signInError }] = useMutation(signInMutation, {
        fetchPolicy: 'no-cache'
    });

    const fetchUserDetails = useAwaitQuery(getCustomerQuery);
    const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);

    const handleCancel = useCallback(() => {
        onCancel();
    }, [onCancel]);

    const handleSubmit = useCallback(
        async formValues => {
            setIsSubmitting(true);
            try {
                // Get source cart id (guest cart id).
                const sourceCartId = cartId;
                const dateOfBirth =
                    formValues.day +
                    '/' +
                    formValues.month +
                    '/' +
                    formValues.year;

                // Create the account and then sign in.
                await createAccount({
                    variables: {
                        email: formValues.customer.email,
                        firstname: formValues.customer.firstname,
                        lastname: formValues.customer.lastname,
                        password: formValues.password,
                        is_subscribed: !!formValues.subscribe,
                        gender: formValues.gender,
                        date_of_birth: dateOfBirth,
                        phone_number: formValues.phone_number,
                        order_number: orderNumber
                    }
                });
                const signInResponse = await signIn({
                    variables: {
                        email: formValues.customer.email,
                        password: formValues.password
                    }
                });
                const token = signInResponse.data.generateCustomerToken.token;
                await setToken(token);

                // Clear all cart/customer data from cache and redux.
                await clearCartDataFromCache(apolloClient);
                await clearCustomerDataFromCache(apolloClient);
                await removeCart();

                // Create and get the customer's cart id.
                await createCart({
                    fetchCartId
                });
                const destinationCartId = await retrieveCartId();

                // Merge the guest cart into the customer cart.
                await mergeCarts({
                    variables: {
                        destinationCartId,
                        sourceCartId
                    }
                });
                addToast({
                    type: 'info',
                    message: formatMessage({
                        id: 'createAccount.titleSuccess',
                        defaultMessage: 'Registration success!'
                    }),
                    timeout: 7000
                });

                // Ensure old stores are updated with any new data.
                await getUserDetails({ fetchUserDetails });
                await getCartDetails({ fetchCartId, fetchCartDetails });

                // Finally, invoke the post-submission callback.
                if (onSubmit) {
                    onSubmit();
                }
                history.go(0);
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }
                addToast({
                    type: 'error',
                    message: error.message,
                    timeout: 7000
                });
                setIsSubmitting(false);
            }
        },
        [
            cartId,
            apolloClient,
            removeCart,
            createAccount,
            signIn,
            setToken,
            createCart,
            fetchCartId,
            mergeCarts,
            getUserDetails,
            fetchUserDetails,
            getCartDetails,
            fetchCartDetails,
            onSubmit,
            orderNumber
        ]
    );

    const sanitizedInitialValues = useMemo(() => {
        const { email, firstName, lastName, ...rest } = initialValues;

        return {
            customer: { email, firstname: firstName, lastname: lastName },
            ...rest
        };
    }, [initialValues]);

    const errors = useMemo(
        () =>
            new Map([
                ['createAccountQuery', createAccountError],
                ['signInMutation', signInError]
            ]),
        [createAccountError, signInError]
    );

    const handleChange = useCallback(
        value => {
            setIsTermCheck(value.target.checked);
        },
        [setIsTermCheck]
    );

    return {
        errors,
        handleCancel,
        handleSubmit,
        initialValues: sanitizedInitialValues,
        isDisabled: isSubmitting || isGettingDetails,
        handleChange,
        isTermCheck
    };
};

/** JSDocs type definitions */

/**
 * GraphQL queries for the create account form.
 * This is a type used by the {@link useCreateAccount} talon.
 *
 * @typedef {Object} CreateAccountQueries
 *
 * @property {GraphQLAST} customerQuery query to fetch customer details
 * @property {GraphQLAST} getCartDetailsQuery query to get cart details
 */

/**
 * GraphQL mutations for the create account form.
 * This is a type used by the {@link useCreateAccount} talon.
 *
 * @typedef {Object} CreateAccountMutations
 *
 * @property {GraphQLAST} createAccountMutation mutation for creating new account
 * @property {GraphQLAST} createCartMutation mutation for creating new cart
 * @property {GraphQLAST} mergeCartsMutation mutation for merging carts
 * @property {GraphQLAST} signInMutation mutation for signing
 */

/**
 * Initial values for the create account form.
 * This is a type used by the {@link useCreateAccount} talon.
 *
 * @typedef {Object} InitialValues
 *
 * @property {String} email email id of the user
 * @property {String} firstName first name of the user
 * @property {String} lastName last name of the user
 */

/**
 * Sanitized initial values for the create account form.
 * This is a type used by the {@link useCreateAccount} talon.
 *
 * @typedef {Object} SanitizedInitialValues
 *
 * @property {String} email email id of the user
 * @property {String} firstname first name of the user
 * @property {String} lastname last name of the user
 */

/**
 * Object type returned by the {@link useCreateAccount} talon.
 * It provides props data to use when rendering the create account form component.
 *
 * @typedef {Object} CreateAccountProps
 *
 * @property {Map} errors a map of errors to their respective mutations
 * @property {Function} handleCancel callback function to handle form cancellations
 * @property {Function} handleSubmit callback function to handle form submission
 * @property {SanitizedInitialValues} initialValues initial values for the create account form
 * @property {Boolean} isDisabled true if either details are being fetched or form is being submitted. False otherwise.
 */
