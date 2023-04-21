import React, { useMemo } from 'react';

import Label from '@magento/venia-ui/lib/components/Checkout/label';
import Price from '@magento/venia-ui/lib/components/Price';

import defaultClasses from '../option.module.css';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { FormattedMessage } from 'react-intl';

const Radio = props => {
    const {
        option,
        optionPrice,
        currency,
        onOptionChange,
        isShowExclTax
    } = props;

    const classes = mergeClasses(defaultClasses, props.classes);
    const valueList = useMemo(
        () =>
            option.value.map((optionItem, index) => {
                const optionIdentifier = `options_${option.option_id}_${
                    optionItem.option_type_id
                }`;

                const priceType = optionItem.price_type;
                const price = optionPrice(optionItem.final_price, priceType);
                const priceExclTax = optionPrice(optionItem.price, priceType);

                const maybePrice = (
                    <span>
                        {price >= 0 ? ' + ' : ' - '}{' '}
                        <Price currencyCode={currency} value={Number(price)} />
                    </span>
                );
                const maybePriceExclTax = isShowExclTax ? (
                    <span className={classes.exclPrice}>
                        {' '}
                        (
                        <FormattedMessage
                            id="productPrice.textPriceExclTax"
                            defaultMessage="Excl. Tax: "
                        />
                        <Price
                            currencyCode={currency}
                            value={Number(priceExclTax)}
                        />
                        )
                    </span>
                ) : null;

                return (
                    <div className={classes.optionRenderRadio} key={index}>
                        <input
                            type="radio"
                            onChange={onOptionChange}
                            name={option.option_id}
                            id={optionIdentifier}
                            value={optionItem.option_type_id}
                        />
                        <Label
                            className={classes.optionLabel}
                            htmlFor={optionIdentifier}
                        >
                            <span>
                                {optionItem.title} {maybePrice}
                                {maybePriceExclTax}
                            </span>
                        </Label>
                    </div>
                );
            }),
        [option, currency, optionPrice, onOptionChange]
    );
    return valueList;
};

export default Radio;
