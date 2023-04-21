import React, { useCallback, useMemo } from 'react';

import { useIntl } from 'react-intl';
import {
    useOption,
    getOptionPrice
} from '@tigrensolutions/product-customize-options/src/talons/useOption';

import Dropdown from './render/dropdown';
import Radio from './render/radio';
import Checkbox from './render/checkbox';
import Multiple from './render/multiple';

import defaultClasses from './option.module.css';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

const getRenderComponent = option => {
    switch (option.__typename) {
        case 'CustomizableDropDownOption':
            return Dropdown;
        case 'CustomizableRadioOption':
            return Radio;
        case 'CustomizableCheckboxOption':
            return Checkbox;
        case 'CustomizableMultipleOption':
            return Multiple;
        default:
            return null;
    }
};

export const themes = {
    primaryColor: '#000',
    hoverColor: '#D8D8D8',
    borderColor: '#000',
    textColor: '#000',
    textHoverColor: '#fff'
};

const convertJsVariablesToCss = (variables = {}) => {
    return Object.entries(variables).reduce((result, [name, value]) => {
        const cssName = `--${name}`;
        result[cssName] = value;
        return result;
    }, {});
};

const Option = props => {
    const { onOptionChange, option, product, isProduct } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const { formatMessage } = useIntl();

    const talonProps = useOption({
        product,
        option,
        onOptionChange
    });
    const { currency, handleOptionChange, isShowExclTax } = talonProps;

    const OptionRender = useMemo(() => getRenderComponent(option, isProduct), [
        option
    ]);

    if (!OptionRender) {
        return null;
    }

    const optionPrice = useCallback(
        (price, type) => getOptionPrice(product, price, type),
        [product]
    );

    const requireLabel = formatMessage({
        id: 'option.require',
        defaultMessage: '*must select 1 option'
    });

    const cssVariables = convertJsVariablesToCss(themes);

    return (
        <div className={classes.root} style={cssVariables}>
            <h3 className={classes.title}>
                {option.title}
                {option.required && <span>{requireLabel}</span>}
            </h3>
            <OptionRender
                option={option}
                optionPrice={optionPrice}
                currency={currency}
                product={product}
                onOptionChange={handleOptionChange}
                classes={classes}
                isShowExclTax={isShowExclTax}
            />
        </div>
    );
};

export default Option;
