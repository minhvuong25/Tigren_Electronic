import React, { useMemo, useState } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './productBundle.module.css';
import Price from '@magento/venia-ui/lib/components/Price';
import { FormattedMessage } from 'react-intl';

const ProductBundleOptions = props => {
    const { bundleOptions, currency, isCheckout = false } = props;
    const classes = useStyle(props.classes, defaultClasses);
    const [open, setOpen] = useState(false);

    const classesOptions = isCheckout
        ? classes.optionsCheckout
        : classes.options;

    const expandButton = (
        <button
            className={classes.expandButton}
            onClick={() => setOpen(open => !open)}
            type={'button'}
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
            bundleOptions.map(({ label, values }) => {
                const optionLabelString = `${label} :`;
                const value_label = values.map((value, ind) => {
                    return (
                        <span key={ind}>
                            {value.quantity} x {value.label} {` `}
                            <Price
                                value={value.price}
                                currencyCode={currency || 'USD'}
                            />
                            {` `}
                        </span>
                    );
                });
                return (
                    <div key={label} className={classes.optionLabel}>
                        <dt className={classes.optionName}>
                            {optionLabelString}
                        </dt>
                        <dd
                            className={classes.optionValue}
                            data-cy="ProductOptions-optionValue"
                        >
                            {value_label}
                        </dd>
                    </div>
                );
            }),
        [classes, bundleOptions]
    );

    if (displayOptions.length === 0) {
        return null;
    }

    return (
        <dl className={`${classesOptions} ${open ? classes.display : ''}`}>
            {!open ? (
                expandButton
            ) : (
                <>
                    {expandButton}
                    {displayOptions}
                </>
            )}
        </dl>
    );
};

export default ProductBundleOptions;
