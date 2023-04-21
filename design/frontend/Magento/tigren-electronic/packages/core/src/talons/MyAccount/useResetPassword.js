import { useCallback, useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useToasts } from '@magento/peregrine';
import { useIntl } from 'react-intl';

import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';

/**
 * Returns props necessary to render a ResetPassword form.
 *
 * @param {function} props.mutations - mutation to call when the user submits the new password.
 *
 * @returns {ResetPasswordProps} - GraphQL mutations for the reset password form.
 *
 * @example <caption>Importing into your project</caption>
 * import { useResetPassword } from '@magento/peregrine/lib/talons/MyAccount/useResetPassword.js';
 */
export const useResetPassword = props => {
    const { mutations } = props;
    const location = useLocation();
    const [, { addToast }] = useToasts();
    const [
        resetPassword,
        { error: resetPasswordErrors, loading: resetPasswordLoading }
    ] = useMutation(mutations.resetPasswordMutation);
    const [
        validateLinkToken,
        { error: validateLinkTokenErrors, loading: validateLinkTokenLoading }
    ] = useMutation(mutations.validateLinkTokenMutation);
    const searchParams = useMemo(() => new URLSearchParams(location.search), [
        location
    ]);
    const token = searchParams.get('token');
    const customerId = searchParams.get('id');
    const history = useHistory();
    const { formatMessage } = useIntl();

    useEffect(() => {
        const errorMessage = deriveErrorMessage([resetPasswordErrors]);

        if (errorMessage && errorMessage !== '') {
            addToast({
                type: 'error',
                message: errorMessage,
                timeout: 3000
            });
        }
    }, [resetPasswordErrors, addToast]);

    useEffect(() => {
        const validateToken = async () => {
            const validToken = await validateLinkToken({
                variables: { token: token, customerId: customerId }
            });
            if (
                !validToken ||
                !validToken.data ||
                !validToken.data.validateLinkToken
            ) {
                history.replace('/forgot-password');

                addToast({
                    type: 'error',
                    message: formatMessage({
                        id: 'resetPasswordPage.linkExpired',
                        defaultMessage: 'Your password reset link has expired.'
                    }),
                    timeout: 3000
                });
            }
        };

        if (token) {
            validateToken();
        }
    }, []);

    const handleSubmit = useCallback(
        async ({ newPassword, confirm }) => {
            try {
                if (token && newPassword && confirm && customerId) {
                    await resetPassword({
                        variables: { token, newPassword, confirm, customerId }
                    });

                    history.push('/customer/account/login');

                    addToast({
                        type: 'info',
                        message: formatMessage({
                            id: 'resetPassword.savedPasswordText',
                            defaultMessage: 'Your new password has been saved.'
                        }),
                        timeout: 3000
                    });
                }
            } catch (err) {
                console.log(err);
            }
        },
        [resetPassword, token]
    );

    return {
        formErrors: [resetPasswordErrors, validateLinkTokenErrors],
        handleSubmit,
        loading: resetPasswordLoading || validateLinkTokenLoading,
        token
    };
};

/** JSDocs type definitions */

/**
 * GraphQL mutations for the reset password form.
 * This is a type used by the {@link useResetPassword} talon.
 *
 * @typedef {Object} ResetPasswordMutations
 *
 * @property {GraphQLAST} resetPasswordMutation mutation for resetting password
 *
 * @see [resetPassword.gql.js]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/MyAccount/ResetPassword/resetPassword.gql.js}
 * for the query used in Venia
 */

/**
 * Object type returned by the {@link useResetPassword} talon.
 * It provides props data to use when rendering the reset password form component.
 *
 * @typedef {Object} ResetPasswordProps
 *
 * @property {Array} formErrors A list of form errors
 * @property {Function} handleSubmit Callback function to handle form submission
 * @property {Boolean} hasCompleted True if password reset mutation has completed. False otherwise
 * @property {Boolean} loading True if password reset mutation is in progress. False otherwise
 * @property {String} token token needed for password reset, will be sent in the mutation
 */
