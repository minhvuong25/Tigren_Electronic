import React, { useMemo } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { useWindowSize } from '@magento/peregrine';

import Slick from 'react-slick';

import defaultClasses from './options.module.css';

const slickSettings = {
    infinite: false,
    slidesToShow: 3,
    arrows: true
    // slidesToScroll: 1
};

const Options = (props = {}) => {
    const {
        data,
        selectedOptions,
        inStockVariants,
        options,
        handleChangeOption
    } = props;

    const { attribute_code: attributeCode } = data;
    const classes = useStyle(defaultClasses, props.classes);

    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 960;
    if (isMobile) {
        slickSettings.arrows = false;
    } else {
        slickSettings.arrows = true;
    }

    const items = useMemo(() => {
        const { values } = data;

        return (values || []).map(value => {
            const valueIndex = String(value.value_index);
            const selectedValues = selectedOptions.get(attributeCode);

            const isSelected = selectedValues && selectedValues.has(valueIndex);
            const itemClass = isSelected ? classes.itemSelected : classes.item;

            return (
                <button
                    className={itemClass}
                    onClick={() =>
                        handleChangeOption(attributeCode, [valueIndex])
                    }
                    key={valueIndex}
                >
                    {value.label}
                </button>
            );
        });
    }, [data, selectedOptions, inStockVariants, options, handleChangeOption]);

    const hasArrow =
        slickSettings.slidesToShow < (data.values || []).length &&
        slickSettings.arrows;

    return (
        <div
            className={`${classes.root} ${
                !hasArrow ? classes.missingArrow : ''
            }`}
        >
            <Slick {...slickSettings}>{items}</Slick>
        </div>
    );
};

export default Options;
