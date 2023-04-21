import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { func, shape, string } from 'prop-types';
import { Form } from 'informed';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Button from '@tigrensolutions/core/src/components/Button';
import Field from '@magento/venia-ui/lib/components/Field';
import TextInput from '@magento/venia-ui/lib/components/TextInput';

import combine from '@magento/venia-ui/lib/util/combineValidators';
import { validateEmail } from '@tigrensolutions/base/src/util/formValidators';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';

import defaultClasses from './forgotPasswordForm.module.css';

const ForgotPasswordForm = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { initialValues, isResettingPassword, onSubmit } = props;

    const { formatMessage } = useIntl();

    return (
        <Form
            className={classes.root}
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <Field
                label={formatMessage({
                    id: 'forgotPasswordForm.emailAddressText',
                    defaultMessage: 'Email address'
                })}
            >
                <TextInput
                    autoComplete="email"
                    field="email"
                    validate={combine([isRequired, validateEmail])}
                    validateOnBlur
                />
            </Field>
            <div className={classes.buttonContainer}>
                <Button
                    className={classes.submitButton}
                    disabled={isResettingPassword}
                    type="submit"
                    priority="high"
                >
                    <FormattedMessage
                        id={'forgotPasswordForm.submitButtonText'}
                        defaultMessage={'Submit'}
                    />
                </Button>
            </div>
        </Form>
    );
};

ForgotPasswordForm.propTypes = {
    classes: shape({
        form: string,
        buttonContainer: string
    }),
    initialValues: shape({
        email: string
    }),
    onCancel: func.isRequired,
    onSubmit: func.isRequired
};

ForgotPasswordForm.defaultProps = {
    initialValues: {}
};

export default ForgotPasswordForm;
