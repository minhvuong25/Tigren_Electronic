import React from 'react';
import { bool, func, object, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import defaultClasses from './removeCart.module.css';

const RemoveCart = props => {
    const { isOpen, onCancel, onConfirm, title } = props;

    const classes = useStyle(defaultClasses, props.classes);

    return (
        <Dialog
            confirmTranslationId={'global.deleteItem'}
            confirmText="Delete Item"
            isOpen={isOpen}
            onCancel={onCancel}
            onConfirm={onConfirm}
            classes={{
                root: classes.root,
                dialog: classes.dialog,
                buttons: classes.buttons,
                header: classes.header,
                contents: classes.contents
            }}
        >
            <div className={classes.text}>{title}</div>
        </Dialog>
    );
};

export default RemoveCart;

RemoveCart.propTypes = {
    classes: shape({
        root: string
    }),
    formErrors: object,
    isEditMode: bool,
    isOpen: bool,
    onCancel: func,
    onConfirm: func
};
