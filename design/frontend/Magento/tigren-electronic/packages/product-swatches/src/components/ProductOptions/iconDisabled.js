import React from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './icon.module.css';

const IconDisabled = props => {
    const { isDisabled } = props;
    const classes = useStyle(defaultClasses, props.classes);

    if (!isDisabled) {
        return null;
    }

    return <span className={`icon-sprite ${classes.iconClose}`} />;
};

export default IconDisabled;
