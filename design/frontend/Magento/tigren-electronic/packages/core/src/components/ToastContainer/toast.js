import React from 'react';
import { bool, func, number, object, oneOf, string } from 'prop-types';
import defaultClasses from './toast.module.css';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';

import { X as CloseIcon } from 'react-feather';

const Toast = props => {
    const {
        actionText,
        icon,
        message,
        onAction,
        handleAction,
        handleDismiss,
        type
    } = props;

    const classes = useStyle(defaultClasses, {});

    const iconElement = icon ? <>{icon}</> : null;

    const controls = (
        <button className={classes.dismissButton} onClick={handleDismiss}>
            <Icon src={CloseIcon} attrs={{ width: 14 }} />
        </button>
    );

    const actions = onAction ? (
        <div className={classes.actions}>
            <button className={classes.actionButton} onClick={handleAction}>
                {actionText}
            </button>
        </div>
    ) : null;

    return (
        <div className={classes[`${type}Toast`]}>
            <span className={`icon-sprite ${classes.icon}`}>{iconElement}</span>
            <div className={classes.message}>{message}</div>
            <div className={classes.controls}>{controls}</div>
            {actions}
        </div>
    );
};

Toast.propTypes = {
    actionText: string,
    dismissable: bool,
    icon: object,
    id: number,
    message: string.isRequired,
    onAction: func,
    onDismiss: func,
    handleAction: func,
    handleDismiss: func,
    type: oneOf(['info', 'warning', 'error', 'success']).isRequired
};

export default Toast;
