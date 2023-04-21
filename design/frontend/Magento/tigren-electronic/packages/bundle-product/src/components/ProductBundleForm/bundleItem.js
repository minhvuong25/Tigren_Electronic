import React, { useMemo } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { FormattedMessage } from 'react-intl';
import combine from '@magento/venia-ui/lib/util/combineValidators';
import Field from '@magento/venia-ui/lib/components/Field';
import Select from '@magento/venia-ui/lib/components/Select';

import Checkbox from './render/checkbox';
import RadioGroup from './render/radioGroup';
import { isRequired } from '../../util/formValidators';
import defaultClasses from './bundleItem.module.css';
import { getPriceSelectedValue } from '../../util/getSelectedPrice';

const getRenderComponent = type => {
    switch (type) {
        case 'radio':
            return RadioGroup;
        case 'select':
            return Select;
        case 'multi':
            return Select;
        case 'checkbox':
            return Checkbox;
        default:
            return null;
    }
};

const BundleItem = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const {
        index,
        item,
        selectedOptions,
        handleOptionChange,
        handleChangeOptionQty,
        dynamicPrice,
        storeCurrency,
        isShowExclTax
    } = props;
    const { title, required, options, option_id, type } = item;

    const optionsItem = options.filter(option => option.product !== null);
    const OptionRender = useMemo(() => getRenderComponent(type), [type]);
    const qtyId = `${option_id}-qty`;
    const selected = selectedOptions.find(
        selectedOption => selectedOption.id == option_id
    );
    const selectQuantity =
        selected &&
        selected.values &&
        selected.values[0] &&
        selected.values[0].qty;
    const initialValue =
        selected && selected.values
            ? type === 'select'
                ? selected.values[0]
                    ? selected.values[0].option_id
                    : null
                : selected.values.map(value => {
                      return value.option_id;
                  })
            : null;

    const disable = !(
        selectQuantity &&
        selected &&
        selected.values[0].can_change_quantity
    );
    const defaultSelect = {
        value: '',
        label: '--Please select--'
    };
    let items = type === 'select' ? [defaultSelect] : [];

    items = [
        ...items,
        ...optionsItem.map(option => {
            const { exclMinimal, realMinimal } = getPriceSelectedValue(
                option,
                dynamicPrice
            );
            let label = `${option.label} + ${parseFloat(realMinimal).toFixed(
                2
            )}`;
            if (isShowExclTax) {
                label += ` (Excl. Tax: ${parseFloat(exclMinimal).toFixed(2)})`;
            }

            return {
                value: option.id,
                label
            };
        })
    ];

    const rest =
        type === 'radio' || type === 'checkbox'
            ? {
                  selectedOptions,
                  options: optionsItem,
                  optionId: option_id,
                  'data-option-id': option_id,
                  id: classes.option_id
              }
            : type === 'select'
            ? {
                  'data-option-id': option_id,
                  items,
                  initialValue
              }
            : {
                  'data-option-id': option_id,
                  items,
                  multiple: true,
                  initialValue
              };

    const child = useMemo(
        () => (
            <>
                {OptionRender && (
                    <div className={classes.root} key={index}>
                        <Field
                            isRequired={required}
                            id={classes.country}
                            label={title}
                        >
                            <OptionRender
                                {...rest}
                                classes={classes}
                                isShowExclTax={isShowExclTax}
                                dynamicPrice={dynamicPrice}
                                storeCurrency={storeCurrency}
                                id={classes.option_id}
                                field={`field_${option_id}`}
                                onChange={handleOptionChange}
                                validate={combine([[isRequired, required]])}
                            />
                            {(type == 'select' || type == 'radio') && (
                                <div className={classes.optionQty}>
                                    <label htmlFor={qtyId}>
                                        <span>
                                            <FormattedMessage
                                                id="bundle.quantity"
                                                defaultMessage="Quantity"
                                            />
                                        </span>
                                    </label>
                                    <input
                                        className={classes.textInput}
                                        id={qtyId}
                                        field="quantity"
                                        disabled={disable}
                                        value={selectQuantity}
                                        onChange={handleChangeOptionQty}
                                    />
                                </div>
                            )}
                        </Field>
                    </div>
                )}
            </>
        ),
        [selectedOptions]
    );
    return <>{child} </>;
};

export default BundleItem;
