import React from 'react';
import { object } from 'prop-types';

import { mergeClasses } from '@magento/venia-ui/lib/classify';

import Icon from '@magento/venia-ui/lib/components/Icon';
import { Grid as gridIcon, List as listIcon } from 'react-feather';

import defaultClasses from './productListMode.module.css';

const iconAttrs = {
    width: 22
};

const ProductListMode = props => {
    const { productListMode, setProductListMode } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const handleChangeMode = () => {
        if (productListMode) {
            if (productListMode === 'list') {
                setProductListMode('grid');
            } else {
                setProductListMode('list');
            }
        } else {
            setProductListMode('list');
        }
    };

    return (
        <div className={classes.displayMode}>
            <button
                onClick={handleChangeMode}
                className={classes.gridModeClass}
                disabled={!productListMode || productListMode === 'grid'}
            >
                <Icon src={gridIcon} attrs={iconAttrs} />
            </button>
            <button
                onClick={handleChangeMode}
                className={classes.listModeClass}
                disabled={!productListMode || productListMode === 'list'}
            >
                <Icon src={listIcon} attrs={iconAttrs} />
            </button>
        </div>
    );
};

ProductListMode.propTypes = {
    history: object,
    location: object
};

export default ProductListMode;
