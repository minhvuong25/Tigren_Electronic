import React, { useEffect, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { AlertCircle as AlertCircleIcon } from 'react-feather';
import { shape, string } from 'prop-types';

import { useToasts } from '@magento/peregrine/lib/Toasts';
import OrderHistoryContextProvider from '@magento/peregrine/lib/talons/OrderHistoryPage/orderHistoryContext';
import { useOrderHistoryPage } from '@tigrensolutions/core/src/talons/OrderHistoryPage/useOrderHistoryPage';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Button from '@magento/venia-ui/lib/components/Button';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';

import OrderRow from './orderRow';
import Pagination from '@magento/venia-ui/lib/components/Pagination';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import imgNoOrder from '@tigrensolutions/core/src/static/images/no-order.png';
import defaultClasses from './orderHistoryPage.module.css';

const errorIcon = (
    <Icon
        src={AlertCircleIcon}
        attrs={{
            width: 18
        }}
    />
);
const CONFIG_PAGINATION = {
    LOAD_MORE: 'LOAD_MORE',
    PAGINATE: 'PAGINATE'
};

const DEFAULT_PAGINATION = 'PAGINATE';

const OrderHistoryPage = props => {
    const talonProps = useOrderHistoryPage();
    const {
        errorMessage,
        loadMoreOrders,
        isBackgroundLoading,
        isLoadingWithoutData,
        orders,
        searchText,
        pageControl
    } = talonProps;

    const [, { addToast }] = useToasts();
    const { formatMessage } = useIntl();
    const PAGE_TITLE = formatMessage({
        id: 'orderHistoryPage.pageTitleText',
        defaultMessage: 'My Orders'
    });

    const classes = useStyle(defaultClasses, props.classes);

    const orderRows = useMemo(() => {
        return orders.map(order => {
            return <OrderRow key={order.id} order={order} />;
        });
    }, [orders]);

    const pageContents = useMemo(() => {
        if (
            isLoadingWithoutData ||
            (isBackgroundLoading && !!orders && !orders.length)
        ) {
            return (
                <div className={classes.skeleton}>
                    <Shimmer width="100%" height="100%" />
                    <Shimmer width="100%" height="100%" />
                    <Shimmer width="100%" height="100%" />
                </div>
            );
        } else if (!isBackgroundLoading && searchText && !orders.length) {
            return (
                <h3 className={classes.emptyHistoryMessage}>
                    <FormattedMessage
                        id={'orderHistoryPage.invalidOrderNumber'}
                        defaultMessage={`Order "${searchText}" was not found.`}
                        values={{
                            number: searchText
                        }}
                    />
                </h3>
            );
        } else if (!isBackgroundLoading && !orders.length) {
            return (
                <div className={classes.wrapNoOrder}>
                    <img
                        alt={'no order'}
                        className={classes.noOrder}
                        src={imgNoOrder}
                    />
                    <h3 className={classes.emptyHistoryMessage}>
                        <FormattedMessage
                            id={'orderHistoryPage.emptyDataMessage'}
                            defaultMessage={'You have placed no orders.'}
                        />
                    </h3>
                </div>
            );
        } else {
            return (
                <ul className={classes.orderHistoryTable}>
                    <li className={classes.wrapTitleTable}>
                        <div className={classes.titleTable}>
                            <h5>
                                <FormattedMessage
                                    id={'orderHistoryPage.orderNumber'}
                                    defaultMessage={'Order #'}
                                />
                            </h5>
                        </div>
                        <div className={classes.titleTable}>
                            <h5>
                                <FormattedMessage
                                    id={'orderHistoryPage.date'}
                                    defaultMessage={'Date'}
                                />
                            </h5>
                        </div>
                        <div className={classes.titleTable}>
                            <h5>
                                <FormattedMessage
                                    id={'orderHistoryPage.consignee'}
                                    defaultMessage={'Consignee'}
                                />
                            </h5>
                        </div>
                        <div className={classes.titleTable}>
                            <h5>
                                <FormattedMessage
                                    id={'orderHistoryPage.orderTotal'}
                                    defaultMessage={'Order Total'}
                                />
                            </h5>
                        </div>
                        <div className={classes.titleTable}>
                            <h5>
                                <FormattedMessage
                                    id={'orderHistoryPage.status'}
                                    defaultMessage={'Status'}
                                />
                            </h5>
                        </div>
                        <div className={classes.titleTable} />
                    </li>
                    {orderRows}
                </ul>
            );
        }
    }, [
        classes.emptyHistoryMessage,
        classes.orderHistoryTable,
        isBackgroundLoading,
        isLoadingWithoutData,
        orderRows,
        orders.length,
        searchText
    ]);

    const loadMoreButton = loadMoreOrders ? (
        <Button
            classes={{ root_lowPriority: classes.loadMoreButton }}
            disabled={isBackgroundLoading || isLoadingWithoutData}
            onClick={loadMoreOrders}
            priority="low"
        >
            <FormattedMessage
                id={'orderHistoryPage.loadMore'}
                defaultMessage={'Load More'}
            />
        </Button>
    ) : null;

    useEffect(() => {
        if (errorMessage) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: errorMessage,
                dismissable: true,
                timeout: 10000
            });
        }
    }, [addToast, errorMessage]);

    return (
        <OrderHistoryContextProvider>
            <div className={classes.root}>
                <StoreTitle>{PAGE_TITLE}</StoreTitle>
                <h1 className={classes.heading}>{PAGE_TITLE}</h1>
                {pageContents}
                {pageControl.totalPages > 1 &&
                    (DEFAULT_PAGINATION === CONFIG_PAGINATION.LOAD_MORE ? (
                        loadMoreButton
                    ) : (
                        <div className={classes.pagination}>
                            <Pagination pageControl={pageControl} />
                        </div>
                    ))}
            </div>
        </OrderHistoryContextProvider>
    );
};

export default OrderHistoryPage;

OrderHistoryPage.propTypes = {
    classes: shape({
        root: string,
        heading: string,
        emptyHistoryMessage: string,
        orderHistoryTable: string,
        search: string,
        searchButton: string,
        submitIcon: string,
        loadMoreButton: string
    })
};
