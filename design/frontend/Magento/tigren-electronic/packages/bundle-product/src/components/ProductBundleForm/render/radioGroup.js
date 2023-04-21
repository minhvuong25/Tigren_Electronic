import React, { useCallback, useEffect, useMemo } from 'react';

import { asField } from 'informed';
import classify, { useStyle } from '@magento/venia-ui/lib/classify';
import { Message } from '@magento/venia-ui/lib/components/Field';
import { compose } from 'redux';
import Price from '@magento/venia-ui/lib/components/Price';

import defaultClasses from '../option.module.css';

import { getPriceSelectedValue } from '../../../util/getSelectedPrice';
import { FormattedMessage } from 'react-intl';

const Radio = ({ fieldState, fieldApi, ...props }) => {
    const { setValue } = fieldApi;
    const {
        options,
        optionId,
        onChange,
        selectedOptions,
        message,
        field,
        dynamicPrice,
        storeCurrency,
        isShowExclTax
    } = props;

    const classes = useStyle(defaultClasses, props.classes);
    const selected = selectedOptions.find(
        selectedOption => selectedOption.id == optionId
    );

    const changeHandler = useCallback(
        e => {
            const inputValue = e.target.value;
            setValue(inputValue);

            if (onChange) {
                onChange(e);
            }
        },
        [onChange, setValue]
    );

    useEffect(() => {
        const value =
            selected && selected.values && selected.values[0].option_id;
        setValue(value);
    }, []);

    const valueList = useMemo(
        () =>
            options.map((optionItem, index) => {
                const optionIdentifier =
                    'options' + '_' + optionId + '_' + optionItem.id;
                let value;
                if (selected) {
                    value = selected.values.find(
                        val => val.option_id == optionItem.id
                    );
                }

                const { exclMinimal, realMinimal } = getPriceSelectedValue(
                    optionItem,
                    dynamicPrice
                );

                return (
                    <div className={classes.optionRenderRadio} key={index}>
                        <input
                            name={field}
                            onChange={changeHandler}
                            type="radio"
                            name={optionId}
                            data-option-id={optionId}
                            id={optionIdentifier}
                            value={optionItem.id}
                            checked={value ? true : false}
                        />
                        <label
                            className={classes.optionLabel}
                            htmlFor={optionIdentifier}
                        >
                            <span>{optionItem.label} + </span>
                            <Price
                                value={realMinimal}
                                currencyCode={storeCurrency}
                            />
                            {isShowExclTax && (
                                <span className={classes.exclPrice}>
                                    {' '}
                                    (
                                    <FormattedMessage
                                        id="productPrice.textPriceExclTax"
                                        defaultMessage="Excl. Tax: "
                                    />
                                    <Price
                                        value={exclMinimal}
                                        currencyCode={storeCurrency}
                                    />
                                    )
                                </span>
                            )}
                        </label>
                    </div>
                );
            }),
        [
            options,
            classes.optionRenderRadio,
            optionId,
            classes.optionLabel,
            classes.bundleProductPrice,
            changeHandler,
            selected
        ]
    );

    const simpleValue = useMemo(
        () =>
            options.map((optionItem, index) => {
                const { realMinimal } = getPriceSelectedValue(
                    optionItem,
                    dynamicPrice
                );

                return (
                    <div
                        className={classes.optionRenderRadioSingle}
                        key={index}
                    >
                        <span>{optionItem.label} + </span>
                        <Price
                            value={realMinimal}
                            currencyCode={storeCurrency}
                        />
                    </div>
                );
            }),
        [options, classes.bundleProductPrice, classes.optionRenderRadioSingle]
    );

    return (
        <>
            {options.length > 1 ? valueList : simpleValue}
            <Message className={classes.message} fieldState={fieldState}>
                {message}
            </Message>
        </>
    );
};

export default compose(
    classify(defaultClasses),
    asField
)(Radio);
