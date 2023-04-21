import React, { useMemo } from 'react';
import { shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useWindowSize } from '@magento/peregrine';

import defaultClasses from './colors.module.css';
import Slick from 'react-slick';
import { generateUrl } from '@magento/peregrine/lib/util/imageUtils';

const SWATCH_WIDTH = 48;

const slickSettings = {
    infinite: false,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: true
};

const getColorStyles = (color = '#fff', isThumbnail) => {
    const defaultBorderColor =
        color === '#ffffff' || isThumbnail ? '#dcdce0' : color;
    const selectedBorderColor = '#000';

    return {
        defaultBorderColor,
        selectedBorderColor,
        color
    };
};

const Color = props => {
    const {
        data,
        selectedOptions,
        handleChangeOption,
        inStockVariants,
        options
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

        return (values || []).map((value, index) => {
            const thumbnail = value?.swatch_data?.thumbnail;
            let bgColor = '';

            if (thumbnail) {
                const imagePath = generateUrl(thumbnail, 'image-swatch')(
                    SWATCH_WIDTH
                );

                bgColor = `url("${imagePath}")`;
            } else {
                bgColor =
                    (value.swatch_data && value.swatch_data.value) || '#fff';
            }

            const { defaultBorderColor, selectedBorderColor } = getColorStyles(
                bgColor,
                thumbnail
            );

            const valueIndex = String(value.value_index);
            const selectedValues = selectedOptions.get(attributeCode);

            const isSelected = selectedValues && selectedValues.has(valueIndex);
            const itemClass = isSelected ? classes.itemSelected : classes.item;

            return (
                <div key={index}>
                    <button
                        className={itemClass}
                        style={{
                            '--color': bgColor,
                            '--border_color': defaultBorderColor,
                            '--selected_border_color': selectedBorderColor
                        }}
                        onClick={() =>
                            handleChangeOption(attributeCode, [valueIndex])
                        }
                        key={valueIndex}
                    />
                </div>
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

Color.propTypes = {
    classes: shape({ root: string })
};
Color.defaultProps = {};
export default Color;
