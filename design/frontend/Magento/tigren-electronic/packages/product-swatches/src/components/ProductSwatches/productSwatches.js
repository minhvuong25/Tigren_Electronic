import React, { useMemo } from 'react';
import { shape, string } from 'prop-types';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Colors from './Colors';
import Options from './Options';
import GetOptionType from '../getOptionType';

import defaultClasses from './productSwatches.module.css';

const ProductSwatches = (props = {}) => {
    const classes = useStyle(defaultClasses, props.classes);

    const {
        isInCategoryPage,
        selectedOptions,
        inStockVariants,
        handleChangeOption,
        product
    } = props;

    const options = useMemo(() => {
        if (isProductConfigurable(product) && product.configurable_options) {
            const options =
                product?.configurable_options?.filter(
                    configurable_option =>
                        !!configurable_option?.used_in_product_listing
                ) || [];

            return options.map(option => {
                const optionProps = {
                    data: option,
                    options,
                    inStockVariants,
                    selectedOptions: selectedOptions,
                    handleChangeOption: handleChangeOption,
                    isInCategoryPage: isInCategoryPage,
                    key: option.attribute_code
                };

                if (GetOptionType(option) === 'swatch') {
                    return <Colors {...optionProps} />;
                } else {
                    return <Options {...optionProps} />;
                }
            });
        } else {
            return null;
        }
    }, [product, handleChangeOption, selectedOptions, inStockVariants]);

    const rootClass = `${isInCategoryPage ? classes.categoryStyle : ''} ${
        classes.root
    }`;

    return <div className={rootClass}>{options}</div>;
};

ProductSwatches.propTypes = {
    classes: shape({ root: string })
};
ProductSwatches.defaultProps = {};
export default ProductSwatches;
