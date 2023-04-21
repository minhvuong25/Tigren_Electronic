import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useToasts } from '@magento/peregrine';
import { useHistory, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useUserContext } from '@magento/peregrine/lib/context/user';

import get from '@tigrensolutions/core/src/util/get';

export const useAccountInformationPage = props => {
    const [, { addToast }] = useToasts();
    const { formatMessage } = useIntl();
    const history = useHistory();
    const {
        mutations: {
            setCustomerInformationMutation,
            changeCustomerPasswordMutation
        },
        queries: { getCustomerInformationQuery }
    } = props;

    const location = useLocation();
    const [{ isSignedIn }] = useUserContext();
    const [shouldShowNewPassword, setShouldShowNewPassword] = useState(false);
    const [formApi, setFormApi] = useState();

    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [isChangeEmail, setIsChangeEmail] = useState(false);

    // If the user clicks change password from my account page,
    // auto select change password checkbox.
    useEffect(() => {
        const action = location && location.state && location.state.action;

        if (action === 'changPassword' && formApi) {
            setTimeout(() => {
                formApi.setValue('change_password', true);
                setShouldShowNewPassword(true);
            }, 300);
        }
    }, [location, formApi]);

    // Use local state to determine whether to display errors or not.
    // Could be replaced by a "reset mutation" function from apollo client.
    // https://github.com/apollographql/apollo-feature-requests/issues/170
    const [displayError, setDisplayError] = useState(false);

    const { data: accountInformationData, error: loadDataError } = useQuery(
        getCustomerInformationQuery,
        {
            skip: !isSignedIn,
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );

    const [
        setCustomerInformation,
        {
            error: customerInformationUpdateError,
            loading: isUpdatingCustomerInformation
        }
    ] = useMutation(setCustomerInformationMutation);

    const [
        changeCustomerPassword,
        {
            error: customerPasswordChangeError,
            loading: isChangingCustomerPassword
        }
    ] = useMutation(changeCustomerPasswordMutation);

    const initialValues = useMemo(() => {
        if (accountInformationData) {
            return {
                customer: accountInformationData.customer
            };
        }
    }, [accountInformationData]);

    const handleChangePassword = useCallback(() => {
        setShouldShowNewPassword(!shouldShowNewPassword);
    }, [setShouldShowNewPassword, shouldShowNewPassword]);

    const handleChangeEmail = useCallback(
        e => {
            const newEmail = e.target.value;
            const initialEmail = get(initialValues, 'customer.email', '');

            const maybeChangeEmail = initialEmail !== newEmail.trim();

            setIsChangeEmail(maybeChangeEmail);
        },
        [setIsChangeEmail, initialValues]
    );

    const showUpdateMode = useCallback(() => {
        setIsUpdateMode(true);

        // If there were errors from removing/updating info, hide them
        // when we open the modal.
        setDisplayError(false);
    }, [setIsUpdateMode]);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = useCallback(
        async (values = {}) => {
            try {
                const {
                    firstname,
                    lastname,
                    customer,
                    password,
                    currentPassword,
                    newPassword,
                    phone_number,
                    gender,
                    is_subscribed,
                    day,
                    month,
                    year
                } = values;

                const dateOfBirth = [day, month, year].join('/');

                const formInputs = {
                    firstname: firstname ? firstname.trim() : firstname,
                    lastname: lastname ? lastname.trim() : lastname,
                    email: customer?.email
                        ? customer?.email.trim()
                        : customer?.email,
                    // You must send password because it is required
                    // when changing email.
                    password: password ? password.trim() : password,
                    phone_number: phone_number
                        ? phone_number.trim()
                        : phone_number,
                    gender,
                    is_subscribed: !!is_subscribed,
                    date_of_birth: dateOfBirth
                };

                await setCustomerInformation({
                    variables: {
                        customerInput: formInputs
                    }
                });

                if (currentPassword && newPassword) {
                    await changeCustomerPassword({
                        variables: {
                            currentPassword: currentPassword,
                            newPassword: newPassword
                        }
                    });
                }

                addToast({
                    type: 'info',
                    message: formatMessage({
                        id: 'global.saveAccountInfoSuccess',
                        defaultMessage: 'You saved the account information.'
                    }),
                    timeout: 7000
                });

                history.push('/customer/account');
            } catch (error) {
                // Make sure any errors from the mutation are displayed.
                setDisplayError(true);
                setIsSubmit(false);

                // we have an onError link that logs errors, and FormError
                // already renders this error, so just return to avoid
                // triggering the success callback
            }
        },
        [setCustomerInformation, changeCustomerPassword, initialValues, history]
    );

    const errors = displayError
        ? [customerInformationUpdateError, customerPasswordChangeError]
        : [];

    return {
        formErrors: errors,
        handleSubmit,
        handleChangePassword,
        handleChangeEmail,
        initialValues,
        isChangeEmail,
        isDisabled: isUpdatingCustomerInformation || isChangingCustomerPassword,
        isUpdateMode,
        isSignedIn,
        loadDataError,
        shouldShowNewPassword,
        showUpdateMode,
        isSubmit,
        setFormApi
    };
};
