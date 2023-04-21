import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { useIntl } from 'react-intl';
import { useToasts } from '@magento/peregrine';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import defaultOperations from './addressBookPage.gql';

/**
 *  A talon to support the functionality of the Address Book page.
 *
 *  @function
 *
 *  @param {Object} props
 *  @param {Object} props.operations - GraphQL operations to be run by the talon.
 *
 *  @returns {AddressBookPageTalonProps}
 *
 * @example <caption>Importing into your project</caption>
 * import { useAddressBookPage } from '@magento/peregrine/lib/talons/AddressBookPage/useAddressBookPage';
 */
export const useAddressBookPage = (props = {}) => {
    const operations = mergeOperations(defaultOperations, props.operations);
    const [, { addToast }] = useToasts();
    const { formatMessage } = useIntl();
    const {
        createCustomerAddressMutation,
        deleteCustomerAddressMutation,
        getCustomerAddressesQuery,
        updateCustomerAddressMutation
    } = operations;

    const [{ isSignedIn }] = useUserContext();

    const history = useHistory();

    const {
        data: customerAddressesData,
        loading,
        refetch: refetchCustomerAddress
    } = useQuery(getCustomerAddressesQuery, {
        fetchPolicy: 'cache-and-network',
        skip: !isSignedIn
    });

    const [
        deleteCustomerAddress,
        { loading: isDeletingCustomerAddress }
    ] = useMutation(deleteCustomerAddressMutation);

    const [confirmDeleteAddressId, setConfirmDeleteAddressId] = useState();
    const [formApi, setFormApi] = useState();

    const customerAddresses =
        (customerAddressesData &&
            customerAddressesData.customer &&
            customerAddressesData.customer.addresses) ||
        [];

    const countries =
        customerAddressesData && customerAddressesData.countries
            ? customerAddressesData.countries
            : null;
    const firstname =
        customerAddressesData && customerAddressesData.customer.firstname
            ? customerAddressesData.customer.firstname
            : null;
    const lastname =
        customerAddressesData && customerAddressesData.customer.lastname
            ? customerAddressesData.customer.lastname
            : null;

    const [
        createCustomerAddress,
        {
            error: createCustomerAddressError,
            loading: isCreatingCustomerAddress
        }
    ] = useMutation(createCustomerAddressMutation);
    const [
        updateCustomerAddress,
        {
            error: updateCustomerAddressError,
            loading: isUpdatingCustomerAddress
        }
    ] = useMutation(updateCustomerAddressMutation);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isFormEditMode, setIsFormEditMode] = useState(false);
    const [formAddress, setFormAddress] = useState({});

    // Use local state to determine whether to display errors or not.
    // Could be replaced by a "reset mutation" function from apollo client.
    // https://github.com/apollographql/apollo-feature-requests/issues/170
    const [displayError, setDisplayError] = useState(false);

    // If the user is no longer signed in, redirect to the home page.
    useEffect(() => {
        if (!isSignedIn) {
            history.push('/');
        }
    }, [history, isSignedIn]);

    const handleAddAddress = useCallback(() => {
        // Hide all previous errors when we open the Form.
        setDisplayError(false);

        setIsFormEditMode(false);
        let country_code = DEFAULT_COUNTRY_CODE;
        if (countries && countries[0] && countries[0].id) {
            country_code = countries[0].id;
        }
        setFormAddress({ firstname, lastname, country_code });
        setIsFormOpen(true);
    }, [countries, firstname, lastname]);

    const handleDeleteAddress = useCallback(addressId => {
        setConfirmDeleteAddressId(addressId);
    }, []);

    const handleCancelDeleteAddress = useCallback(() => {
        setConfirmDeleteAddressId(null);
    }, []);

    const handleConfirmDeleteAddress = useCallback(async () => {
        try {
            await deleteCustomerAddress({
                variables: { addressId: confirmDeleteAddressId },
                refetchQueries: [{ query: getCustomerAddressesQuery }],
                awaitRefetchQueries: true
            });

            await refetchCustomerAddress();
            setConfirmDeleteAddressId(null);
        } catch (e) {
            console.log(e);
        }
    }, [
        refetchCustomerAddress,
        confirmDeleteAddressId,
        deleteCustomerAddress,
        getCustomerAddressesQuery
    ]);

    const handleEditAddress = useCallback(
        address => {
            // history.push('/customer/address');
            // Hide all previous errors when we open the Form.
            setDisplayError(false);

            setIsFormEditMode(true);
            setFormAddress(address);
            setIsFormOpen(true);
        },
        [history]
    );

    const handleCancelForm = useCallback(() => {
        setIsFormOpen(false);
    }, []);
    const handleConfirmForm = useCallback(
        async formValues => {
            const { country_code, ...address } = formValues;
            const customerAddress = {
                ...address,
                country_code
            };
            if (isFormEditMode) {
                try {
                    await updateCustomerAddress({
                        variables: {
                            addressId: formAddress.id,
                            updated_address: customerAddress
                        },
                        refetchQueries: [{ query: getCustomerAddressesQuery }],
                        awaitRefetchQueries: true
                    });
                    await refetchCustomerAddress();
                    setIsFormOpen(false);
                    addToast({
                        type: 'success',
                        message: formatMessage({
                            id: 'global.saveAddressSuccess',
                            defaultMessage: 'Address saved successfully'
                        }),
                        timeout: 7000
                    });
                } catch {
                    // Make sure any errors from the mutations are displayed.
                    setDisplayError(true);

                    // we have an onError link that logs errors, and FormError
                    // already renders this error, so just return to avoid
                    // triggering the success callback
                }
            } else {
                try {
                    await createCustomerAddress({
                        variables: { address: customerAddress },
                        refetchQueries: [{ query: getCustomerAddressesQuery }],
                        awaitRefetchQueries: true
                    });
                    await refetchCustomerAddress();
                    setIsFormOpen(false);
                    addToast({
                        type: 'success',
                        message: formatMessage({
                            id: 'global.saveAddressSuccess',
                            defaultMessage: 'Address saved successfully.'
                        }),
                        timeout: 7000
                    });
                } catch {
                    // Make sure any errors from the mutations are displayed.
                    setDisplayError(true);

                    // we have an onError link that logs errors, and FormError
                    // already renders this error, so just return to avoid
                    // triggering the success callback
                }
            }
        },
        [
            refetchCustomerAddress,
            createCustomerAddress,
            formAddress,
            getCustomerAddressesQuery,
            isFormEditMode,
            updateCustomerAddress
        ]
    );

    const formErrors = useMemo(() => {
        if (displayError) {
            return new Map([
                ['createCustomerAddressMutation', createCustomerAddressError],
                ['updateCustomerAddressMutation', updateCustomerAddressError]
            ]);
        } else return new Map();
    }, [createCustomerAddressError, displayError, updateCustomerAddressError]);

    const isFormBusy = isCreatingCustomerAddress || isUpdatingCustomerAddress;
    const isLoadingWithoutData = !customerAddressesData && loading;

    const formProps = {
        initialValues: formAddress
    };

    return {
        confirmDeleteAddressId,
        customerAddresses,
        formErrors,
        formProps,
        handleAddAddress,
        handleCancelDeleteAddress,
        handleCancelForm,
        handleConfirmDeleteAddress,
        handleConfirmForm,
        handleDeleteAddress,
        handleEditAddress,
        isDeletingCustomerAddress,
        isFormBusy,
        isFormEditMode,
        isFormOpen,
        isLoading: isLoadingWithoutData,
        countries,
        formApi,
        setFormApi
    };
};
