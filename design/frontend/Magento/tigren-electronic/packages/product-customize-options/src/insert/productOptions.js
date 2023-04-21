import React, { useMemo } from 'react';
import { arrayOf, shape, string } from 'prop-types';

import { mergeClasses } from '@magento/venia-ui/lib/classify';

import defaultClasses from '@magento/venia-ui/lib/components/LegacyMiniCart/productOptions.css';

const convertCustomizeToConfig = (options = []) => {
    return options.reduce((result, option) => {
        const optionLabel = option.label;

        const valueLabelMap = ((option && option.values) || []).reduce(
            (valueLabels, value) => {
                valueLabels = [...valueLabels, value.label];
                return valueLabels;
            },
            []
        );
        const valueLabel = valueLabelMap.join(', ');

        result.push({
            option_label: optionLabel,
            value_label: valueLabel
        });
        return result;
    }, []);
};
