import { useCallback, useMemo, useState } from 'react';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useToasts } from '@magento/peregrine';
import { useApolloClient } from '@apollo/client';
import { useIntl } from 'react-intl';

import DEFAULT_OPERATIONS from '@tigrensolutions/order-and-returns/src/talons/OrdersAndReturns/ordersAndReturns.gql';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';

export const useOrdersAndReturns = (props = {}) => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { submitGuestViewQuery } = operations;

    const guestViewQuery = useAwaitQuery(submitGuestViewQuery);
    const [isPopupOrderDetailsOpen, setIsPopupOrderDetailsOpen] = useState(
        false
    );
    const [selectedType, setSelectedType] = useState('');
    const [hideEmail, setHideEmail] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentOrder, setCurrentOrder] = useState({});
    const [formApi, setFormApi] = useState();

    const apolloClient = useApolloClient();
    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();
    const [{ currentUser }] = useUserContext();

    const sanitizedInitialValues = useMemo(() => {
        const { email, firstname, lastname, ...rest } = currentUser;
        return email
            ? {
                  oar_email: email,
                  oar_type: 'email',
                  name: `${firstname} ${lastname}`,
                  ...rest
              }
            : {
                  oar_type: 'email'
              };
    }, [currentUser]);

    const turnOnLoading = useCallback(() => {
        setIsLoading(true);
    }, []);

    const turnOffLoading = useCallback(() => {
        setIsLoading(false);
    }, []);

    const setOrder = order => {
        setCurrentOrder(order);
        openPopupOrderDetail();
    };

    const openPopupOrderDetail = useCallback(() => {
        setIsPopupOrderDetailsOpen(true);
    }, [setIsPopupOrderDetailsOpen]);

    const closePopupOrderDetail = useCallback(() => {
        setIsPopupOrderDetailsOpen(false);
    }, [setIsPopupOrderDetailsOpen]);

    const changeFindOrderBy = useCallback(
        e => {
            const selectedType = e.currentTarget.value;
            let hideEmail = false;

            if (selectedType && selectedType === 'zip') {
                hideEmail = true;
            }
            setSelectedType(selectedType);
            setHideEmail(hideEmail);
        },
        [setSelectedType, selectedType, setHideEmail, hideEmail]
    );

    const handleSubmit = useCallback(
        async values => {
            turnOnLoading();
            try {
                const { data: dataGuestViewQuery } = await guestViewQuery({
                    variables: values
                });
                setOrder(
                    dataGuestViewQuery && dataGuestViewQuery.trackingOrder
                );
                setSelectedType('');
            } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                    console.error(error);
                }
                addToast({
                    type: 'error',
                    message: formatMessage({
                        id: 'ordersAndReturns.notFoundOrder',
                        defaultMessage: error.message
                    }),
                    timeout: 3000
                });
            } finally {
                turnOffLoading();
            }
        },
        [
            formApi,
            apolloClient,
            submitGuestViewQuery,
            addToast,
            formatMessage,
            setSelectedType
        ]
    );

    return {
        hideEmail,
        selectedType,
        isLoading: isLoading,
        isPopupOrderDetailsOpen,
        initialValues: sanitizedInitialValues,
        currentOrder,
        setFormApi,
        closePopupOrderDetail,
        changeFindOrderBy,
        handleSubmit
    };
};
