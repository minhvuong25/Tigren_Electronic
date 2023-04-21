import React, { useMemo, useState } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './orderBundleItems.module.css';
import Price from '@magento/venia-ui/lib/components/Price';
import { FormattedMessage } from 'react-intl';

const OrderBundleItems = props => {
    const { bundleOptions } = props;
    const classes = useStyle(props.classes, defaultClasses);
    const [open, setOpen] = useState(false);
    const expandButton = (
        <button
            className={classes.expandButton}
            type={'button'}
            onClick={() => setOpen(open => !open)}
        >
            {open ? (
                <FormattedMessage
                    id={'global.showLess'}
                    defaultMessage={'Show less'}
                />
            ) : (
                <FormattedMessage
                    id={'global.showMore'}
                    defaultMessage={'Show more'}
                />
            )}
        </button>
    );

    const displayOptions = useMemo(
        () =>
            bundleOptions &&
            bundleOptions.map(({ label, values }) => {
                const valuesContent = values.map(
                    ({ quantity, product_name, price }) => {
                        const nameLabel = (
                            <span>
                                {product_name}{' '}
                                <Price
                                    value={price.value}
                                    currencyCode={price.currency || 'USD'}
                                />
                            </span>
                        );

                        return (
                            <div className={classes.rootBundleItem}>
                                <span className={classes.quantity}>
                                    <FormattedMessage
                                        id="bundleItem.quantity"
                                        defaultMessage="{quantity} x "
                                        values={{
                                            quantity
                                        }}
                                    />
                                </span>
                                <div className={classes.wrapContent}>
                                    <div className={classes.wrapName}>
                                        <div>
                                            <div
                                                className={
                                                    classes.nameContainer
                                                }
                                            >
                                                <span>{nameLabel}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.price} />

                                    <div className={classes.price} />
                                </div>
                            </div>
                        );
                    }
                );

                return (
                    <>
                        <div>
                            <div>
                                {label}
                                {' : '}
                            </div>
                            {valuesContent}
                        </div>
                    </>
                );
            }),
        [classes, bundleOptions]
    );

    if (!displayOptions || displayOptions.length === 0) {
        return null;
    }

    return (
        <div className={`${classes.bundleOptions} ${open ? classes.open : ''}`}>
            {!open ? (
                expandButton
            ) : (
                <>
                    {expandButton}
                    {displayOptions}
                </>
            )}
        </div>
    );
};

export default OrderBundleItems;
