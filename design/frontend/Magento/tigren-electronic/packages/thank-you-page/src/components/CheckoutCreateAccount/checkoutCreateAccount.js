import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { func, shape, string } from 'prop-types';
import { useToasts, Util } from '@magento/peregrine';
import { useCreateAccount } from '@magento/peregrine/lib/talons/CreateAccount/useCreateAccount';

import combine from '@magento/venia-ui/lib/util/combineValidators';
import { useStyle } from '@magento/venia-ui/lib/classify';
import {
    hasLengthAtLeast,
    isRequired,
    validatePassword
} from '@magento/venia-ui/lib/util/formValidators';
import { validateEmail } from '@tigrensolutions/base/src/util/formValidators';

import Button from '@magento/venia-ui/lib/components/Button';
import Checkbox from '@magento/venia-ui/lib/components/Checkbox';
import Field from '@magento/venia-ui/lib/components/Field';
import FormError from '@magento/venia-ui/lib/components/FormError';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Password from '@magento/venia-ui/lib/components/Password';

import defaultClasses from './checkoutCreateAccount.module.css';

const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const CheckoutCreateAccount = props => {
    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, props.classes);

    const [, { addToast }] = useToasts();

    const onSubmit = useCallback(() => {
        // TODO: Redirect to account/order page when implemented.
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });

        addToast({
            type: 'info',
            message: formatMessage({
                id: 'checkoutPage.accountSuccessfullyCreated',
                defaultMessage: 'Account successfully created.'
            }),
            timeout: 5000
        });
    }, [addToast, formatMessage]);

    const talonProps = useCreateAccount({
        initialValues: {
            email: props.email,
            firstName: props.firstname,
            lastName: props.lastname
        },
        orderNumber: props.orderNumber,
        onSubmit
    });

    const { errors, handleSubmit, isDisabled, initialValues } = talonProps;

    const handleOnClickCreateAccount = useCallback(() => {
        storage.setItem('isCreateAccountAfterCheckout', true);
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <h3 className={classes.heading}>
                    <FormattedMessage
                        id={'checkoutPage.quickCheckout'}
                        defaultMessage={'Quick Checkout When You Return'}
                    />
                </h3>
                <p>
                    <FormattedMessage
                        id={'checkoutPage.setAPasswordAndSave'}
                        defaultMessage={
                            'Set a password and save your information for next time in one easy step!'
                        }
                    />
                </p>
            </div>
            <FormError errors={Array.from(errors.values())} />
            <Form
                className={classes.form}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Field
                    label={formatMessage({
                        id: 'global.firstName',
                        defaultMessage: 'First Name'
                    })}
                >
                    <TextInput
                        field="customer.firstname"
                        autoComplete="given-name"
                        validate={isRequired}
                        validateOnBlur
                    />
                </Field>
                <Field
                    label={formatMessage({
                        id: 'global.lastName',
                        defaultMessage: 'Last Name'
                    })}
                >
                    <TextInput
                        field="customer.lastname"
                        autoComplete="family-name"
                        validate={isRequired}
                        validateOnBlur
                    />
                </Field>
                <Field
                    label={formatMessage({
                        id: 'global.email',
                        defaultMessage: 'Email'
                    })}
                >
                    <TextInput
                        field="customer.email"
                        autoComplete="email"
                        validate={combine([validateEmail, isRequired])}
                        validateOnBlur
                    />
                </Field>
                <Password
                    label={formatMessage({
                        id: 'global.password',
                        defaultMessage: 'Password'
                    })}
                    fieldName="password"
                    autoComplete="new-password"
                    validate={combine([
                        isRequired,
                        [hasLengthAtLeast, 8],
                        validatePassword
                    ])}
                    validateOnBlur
                    mask={value => value && value.trim()}
                    maskOnBlur={true}
                />
                <div className={classes.subscribe}>
                    <Checkbox
                        field="subscribe"
                        label={formatMessage({
                            id: 'checkoutPage.subscribe',
                            defaultMessage: 'Sign Up for Newsletter'
                        })}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        disabled={isDisabled}
                        type="submit"
                        priority="warning"
                        onClick={handleOnClickCreateAccount}
                    >
                        <FormattedMessage
                            id={'checkoutPage.createAccount'}
                            defaultMessage={'Create Account'}
                        />
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CheckoutCreateAccount;

CheckoutCreateAccount.propTypes = {
    classes: shape({
        actions: string,
        create_account_button: string,
        form: string,
        root: string,
        subscribe: string
    }),
    initialValues: shape({
        email: string,
        firstName: string,
        lastName: string
    }),
    onSubmit: func
};
