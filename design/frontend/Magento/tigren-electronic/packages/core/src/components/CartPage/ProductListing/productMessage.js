/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

import React, { useMemo } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './productMessage.module.css';

const MESSAGE_CODE_TYPE = {
    ITEM_INCREMENTS: 'warning',
    notice: 'notice',
    UNDEFINED: 'notice'
};

const getClassesMessage = (props = {}) => {
    const { code, classes } = props;
    let resultClasses;
    const type = MESSAGE_CODE_TYPE[code];

    switch (type) {
        case 'notice': {
            resultClasses = classes.notice;
            break;
        }
        case 'warning': {
            resultClasses = classes.warning;
            break;
        }
        default: {
            resultClasses = classes.error;
        }
    }

    return resultClasses;
};

const ProductMessage = props => {
    const { item } = props;
    const classes = useStyle(props.classes, defaultClasses);

    const content = useMemo(() => {
        const messages = item?.messages || [];

        if (messages.length > 0) {
            return messages.map(message => {
                const classMessage = getClassesMessage({
                    code: message.code,
                    classes
                });

                return (
                    <span className={`${classes.message} ${classMessage}`}>
                        {message.message}
                    </span>
                );
            });
        }

        return null;
    }, [item]);

    return <div className={classes.root}>{content}</div>;
};

export default ProductMessage;
