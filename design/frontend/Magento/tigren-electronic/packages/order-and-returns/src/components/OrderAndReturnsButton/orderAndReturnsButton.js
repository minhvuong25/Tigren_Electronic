import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import defaultClasses from './orderAndReturnsButton.module.css';
import { Link } from 'react-router-dom';

const OrderAndReturnsButton = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { formatMessage } = useIntl();

    return (
        <React.Fragment>
            <Link
                to={resourceUrl('/order-tracking')}
                className={classes.orderLink}
            >
                <span className={classes.textLabel}>
                    {formatMessage({
                        id: 'header.orderTracking',
                        defaultMessage: 'Order Tracking'
                    })}
                </span>
            </Link>
        </React.Fragment>
    );
};

export default OrderAndReturnsButton;
