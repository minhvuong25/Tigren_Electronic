import React, { Fragment, useMemo } from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { themes } from '../option';

import Select from 'react-select';
import Price from '@magento/venia-ui/lib/components/Price';

import { FormattedMessage, useIntl } from 'react-intl';

import defaultClasses from '../option.module.css';
/*
 * ReactSelect custom styles document:
 * https://react-select.com/home#custom-styles
 * */

export const customStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? themes.primaryColor : '',
        '&:hover': {
            backgroundColor: state.isSelected
                ? themes.primaryColor
                : themes.hoverColor
        },
        '&:active': {
            backgroundColor: state.isSelected
                ? themes.primaryColor
                : themes.hoverColor
        }
    }),
    control: provided => ({
        ...provided,
        borderColor: themes.borderColor,
        boxShadow: null,
        '&:hover': {
            borderColor: themes.borderColor,
            boxShadow: '0 0 0 1px #ffffff'
        }
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
};

const Dropdown = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const {
        option,
        optionPrice,
        currency,
        onOptionChange,
        isShowExclTax
    } = props;

    const { formatMessage } = useIntl();

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
        id: 'dropdown.placeholder',
        defaultMessage: 'Add Option'
    });

    const valueList = useMemo(() => {
        return (
            <div className={classes.optionRenderDowndown}>
                <Select
                    options={optionItems}
                    styles={customStyles}
                    placeholder={placeholder}
                    onChange={values => onOptionChange(values, 'select')}
                />
            </div>
        );
    }, [option, currency, optionPrice, onOptionChange]);

    return valueList;
};

export default Dropdown;
