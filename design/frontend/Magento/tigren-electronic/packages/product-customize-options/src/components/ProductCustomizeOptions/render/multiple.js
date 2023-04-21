import React, { Fragment, useMemo } from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import { FormattedMessage, useIntl } from 'react-intl';

import Select from 'react-select';
import Price from '@magento/venia-ui/lib/components/Price';

import defaultClasses from '../option.module.css';
import { customStyles } from './dropdown';

const Multiple = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { formatMessage } = useIntl();

    const {
        option,
        optionPrice,
        currency,
        onOptionChange,
        isShowExclTax
    } = props;

    const optionItems =
        option.value &&
        option.value.reduce((result, item) => {
            const priceType = item.price_type;
            const price = Number(optionPrice(item.final_price, priceType));
            const priceExclTax = Number(optionPrice(item.price, priceType));

            const value = item && item.option_type_id;
            const maybePrice = (
                <Fragment>
                    <span>{price >= 0 ? ' + ' : ' - '} </span>
                    <Price currencyCode={currency} value={price} />
                </Fragment>
            );
            const maybePriceExclTax = isShowExclTax ? (
                <span className={classes.exclPrice}>
                    (
                    <FormattedMessage
                        id="productPrice.textPriceExclTax"
                        defaultMessage="Excl. Tax: "
                    />
                    <Price currencyCode={currency} value={priceExclTax} />)
                </span>
            ) : null;

            const label = (
                <p>
                    {' '}
                    {item.title} {maybePrice} {maybePriceExclTax}
                </p>
            );

            result.push({
                value,
                label
            });
            return result;
        }, []);

    const placeholder = formatMessage({
        id: 'multipleOption.placeholder',
        defaultMessage: 'Add Product Options'
    });

    const NoOptionsMessage = () => {
        return (
            <p className={classes.noOptionsMessage}>
                {formatMessage({
                    id: 'multiple.noOptions',
                    defaultMessage: 'No options'
                })}
            </p>
        );
    };

    const valueList = useMemo(() => {
        return (
            <div className={classes.optionRenderMutiSelect}>
                <Select
                    isMulti
                    options={optionItems}
                    styles={customStyles}
                    placeholder={placeholder}
                    components={{ NoOptionsMessage }}
                    onChange={values => onOptionChange(values, 'muti_select')}
                />
            </div>
        );
    }, [option, currency, optionPrice, onOptionChange]);
    return valueList;
};

export default Multiple;
