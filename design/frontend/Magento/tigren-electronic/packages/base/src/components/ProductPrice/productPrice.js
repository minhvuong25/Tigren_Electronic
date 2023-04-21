import React, { useMemo } from 'react';

import { useProductPrice } from '@tigrensolutions/base/src/talons/ProductPrice';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { FormattedMessage } from 'react-intl';
import Price from '@magento/venia-ui/lib/components/Price';
import defaultClasses from './productPrice.module.css';
import RegularPrice from './regularPrice';

const ProductPrice = props => {
    const {
        product,
        optionSelections,
        customizeOptions,
        optionCodes,
        layout,
        showTitle
    } = props;

    const talonProps = useProductPrice({
        product,
        optionSelections,
        customizeOptions,
        optionCodes
    });

    const { currency, priceRanges, isShowBoth } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    let priceClass;
    switch (layout) {
        case 'listPage':
            priceClass = classes.priceList;
            break;
        case 'productPage':
            priceClass = classes.price;
            break;
        case 'searchPopup':
            priceClass = classes.priceSearch;
            break;
        case 'cartPage':
            priceClass = classes.priceCart;
            break;
        default:
            priceClass = classes.price;
    }

    const textPriceExclTax = (
        <FormattedMessage
            id="productPrice.textPriceExclTax"
            defaultMessage="Excl. Tax: "
        />
    );

    const priceRange = useMemo(() => {
        return priceRanges.map(
            ({ finalValue, regularValue, finalValueExclTax }, index) => {
                const specialClass =
                    finalValue && finalValue < regularValue
                        ? classes.specialPrice
                        : classes.productPrice;
                if (priceRanges.length > 1) {
                    const rowPriceText =
                        index === 0 ? (
                            <FormattedMessage
                                id="productPrice.from"
                                defaultMessage="From"
                            />
                        ) : (
                            <FormattedMessage
                                id="productPrice.to"
                                defaultMessage="To"
                            />
                        );
                    return (
                        <div key={index}>
                            {rowPriceText}
                            <div className={specialClass}>
                                <Price
                                    value={finalValue || regularValue}
                                    currencyCode={currency || 'USD'}
                                />
                            </div>
                            {isShowBoth && finalValueExclTax && (
                                <div className={classes.exclPrice}>
                                    {textPriceExclTax}
                                    <Price
                                        value={finalValueExclTax}
                                        currencyCode={currency || 'USD'}
                                    />
                                </div>
                            )}
                            <RegularPrice
                                finalValue={finalValue}
                                regularValue={regularValue}
                                classes={classes}
                                showTitle={showTitle}
                                currency={currency}
                            />
                        </div>
                    );
                }

                return (
                    <div key={index}>
                        <div className={specialClass}>
                            <Price
                                value={finalValue || regularValue}
                                currencyCode={currency || 'USD'}
                            />
                        </div>
                        {isShowBoth && finalValueExclTax && (
                            <div className={classes.exclPrice}>
                                {textPriceExclTax}
                                <Price
                                    value={finalValueExclTax}
                                    currencyCode={currency || 'USD'}
                                />
                            </div>
                        )}
                        <RegularPrice
                            finalValue={finalValue}
                            regularValue={regularValue}
                            classes={classes}
                            showTitle={showTitle}
                            currency={currency}
                        />
                    </div>
                );
            }
        );
    }, [priceRanges, currency]);

    return <div className={`${classes.root} ${priceClass}`}>{priceRange}</div>;
};

export default ProductPrice;
