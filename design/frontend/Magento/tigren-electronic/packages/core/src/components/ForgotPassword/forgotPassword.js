import React from 'react';
import { func, shape, string } from 'prop-types';

import { useForgotPassword } from '@magento/peregrine/lib/talons/ForgotPassword/useForgotPassword';
import { useStyle } from '@magento/venia-ui/lib/classify';
import ForgotPasswordForm from './ForgotPasswordForm';

import forgotPasswordOperations from '@magento/venia-ui/lib/components/ForgotPassword/forgotPassword.gql';

import defaultClasses from './forgotPassword.module.css';

const ForgotPassword = props => {
    const { initialValues, onCancel } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const talonProps = useForgotPassword({
        onCancel,
        ...forgotPasswordOperations
    });

    const { handleCancel, handleFormSubmit, isResettingPassword } = talonProps;

    return (
        <div className={classes.root}>
            <ForgotPasswordForm
                initialValues={initialValues}
                isResettingPassword={isResettingPassword}
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default ForgotPassword;

ForgotPassword.propTypes = {
    classes: shape({
        instructions: string,
        root: string
    }),
    initialValues: shape({
        email: string
    }),
    onCancel: func
};

ForgotPassword.defaultProps = {
    onCancel: () => {}
};
