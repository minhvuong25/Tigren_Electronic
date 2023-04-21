import React, { useCallback, useEffect, useMemo } from 'react';

import classify, { useStyle } from '@magento/venia-ui/lib/classify';
import { asField } from 'informed';

import { Message } from '@magento/venia-ui/lib/components/Field';
import { compose } from 'redux';

import { getPriceSelectedValue } from '../../../util/getSelectedPrice';
import defaultClasses from '../option.module.css';
import Price from '@magento/venia-ui/lib/components/Price';
import { FormattedMessage } from 'react-intl';

const Checkbox = ({ fieldState, fieldApi, ...props }) => {
    const { value } = fieldState;
    const { setValue } = fieldApi;
    const {
        selectedOptions,
        options,
        optionId,
        onChange,
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
            const nextValue = new Set(value || []);

            if (nextValue.has(inputValue)) {
                nextValue.delete(inputValue);
            } else {
                nextValue.add(inputValue);
            }

            setValue([...nextValue]);

            if (onChange) {
                onChange(e);
            }
        },
        [onChange, setValue, value]
    );

    useEffect(() => {
        const initValue =
            selected && selected.values && selected.values[0].option_id;
        setValue([initValue + '']);
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
                    <div className={classes.optionRenderCheckbox} key={index}>
                        <input
                            name={field}
                            type="checkbox"
                            onChange={changeHandler}
                            data-option-id={optionId}
                            id={optionIdentifier}
                            value={optionItem.id}
                            checked={value ? true : false}
                        />
                        <label
                            className={classes.optionLabel}
                            htmlFor={optionIdentifier}
                        >
                            <span>{`${optionItem.quantity} x ${
                                optionItem.label
                            } + `}</span>
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
            value,
            options,
            classes.optionRenderRadio,
            optionId,
            classes.optionLabel,
            selectedOptions
        ]
    );
    return (
        <>
            {valueList}
            <Message fieldState={fieldState}>{message}</Message>
        </>
    );
};

export default compose(
    classify(defaultClasses),
    asField
)(Checkbox);
