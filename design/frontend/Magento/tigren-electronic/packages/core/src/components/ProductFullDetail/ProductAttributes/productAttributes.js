import React, { Fragment } from 'react';
import RichContent from '@magento/venia-ui/lib/components/RichContent/richContent';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './productAttributes.module.css';

const ProductAttributes = (props = {}) => {
    const classes = useStyle(defaultClasses, props.classes);
    const { attributes = [] } = props;

    return (
        <div className={classes.root}>
            {attributes.map(attribute => {
                return (
                    <Fragment key={attribute.label}>
                        <span className={classes.name}>{attribute.label}</span>
                        <span className={classes.value}>
                            <RichContent html={attribute.value} />
                        </span>
                    </Fragment>
                );
            })}
        </div>
    );
};

export default ProductAttributes;
