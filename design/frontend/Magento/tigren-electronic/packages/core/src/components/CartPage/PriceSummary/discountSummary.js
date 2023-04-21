import React, { Fragment, useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Price from '@magento/venia-ui/lib/components/Price';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './priceSummary.module.css';

const MINUS_SYMBOL = '-';

const DEFAULT_AMOUNT = {
    currency: 'USD',
    value: 0
};

/**
 * Reduces discounts array into a single amount.
 *
 * @param {Array} discounts
 */
const getDiscount = (discounts = []) => {
    // discounts from data can be null
    if (!discounts || !discounts.length) {
        return DEFAULT_AMOUNT;
    } else {
        return {
            currency: discounts[0].amount.currency,
            value: discounts.reduce(
                (acc, discount) => acc + discount.amount.value,
                0
            ),
            label: discounts[0].label
        };
    }
};

/**
 * A component that renders the discount summary line item.
 *
 * @param {Object} props.classes
 * @param {Object} props.data fragment response data
 */
const DiscountSummary = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { data } = props;
    const discount = getDiscount(props.data);
    const [isShow, setIsShow] = useState(false);

    const handleClick = useCallback(() => {
        setIsShow(!isShow);
    }, [isShow]);

    const labelClass = isShow ? classes.show : '';
    const discountClass = isShow ? classes.showDiscount : '';

    const content =
        data &&
        data.length > 0 &&
        data.map(item => {
            return (
                <>
                    <span
                        className={classes.lineItemLabel}
                        onClick={handleClick}
                    >
                        {item.label ? item.label : null}
                    </span>
                    <span className={classes.price}>
                        {MINUS_SYMBOL}
                        <Price
                            value={item.amount.value}
                            currencyCode={item.amount.currency}
                        />
                    </span>
                </>
            );
        });

    return discount.value ? (
        <Fragment>
            <div className={classes.lineItemsDiscount}>
                <span
                    className={`${classes.lineItemLabelDiscount} ${labelClass}`}
                    onClick={handleClick}
                >
                    <FormattedMessage
                        id={'discountSummary.lineItemLabel'}
                        defaultMessage={'Discounts'}
                    />
                </span>
                <span className={classes.price}>
                    {MINUS_SYMBOL}
                    <Price
                        value={discount.value}
                        currencyCode={discount.currency}
                    />
                </span>
            </div>
            <div className={`${classes.discount} ${discountClass}`}>
                {content}
            </div>
        </Fragment>
    ) : null;
};

export default DiscountSummary;
