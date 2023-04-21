import React, { Fragment, useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { AlertCircle } from 'react-feather';
import { useGuestFormForCartVirtual } from '@tigrensolutions/virtual-product/src/talons/GuestFormForCartVirtual/useGuestFormForCartVirtual';
import { useToasts } from '@magento/peregrine';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import Button from '@magento/venia-ui/lib/components/Button';
import Field, { Message } from '@magento/venia-ui/lib/components/Field';

import TextInput from '@magento/venia-ui/lib/components/TextInput';

import Icon from '@magento/venia-ui/lib/components/Icon';
import defaultClasses from '@magento/venia-ui/lib/components/CheckoutPage/ShippingInformation/AddressForm/guestForm.module.css';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { CHECKOUT_STEP } from '@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage';

const AlertCircleIcon = <Icon src={AlertCircle} attrs={{ width: 20 }} />;

const GuestFormForCartVirtual = props => {
    const {
        afterSubmit,
        classes: propClasses,
        onSave,
        onCancel,
        onSuccess,
        shippingData,
        toggleSignInContent,
        setGuestSignInUsername
    } = props;
    const formApiRef = useRef();
    const getFormApi = api => {
        formApiRef.current = api;
    };

    const talonProps = useGuestFormForCartVirtual({
        onSave,
        afterSubmit,
        onCancel,
        onSuccess,
        shippingData,
        toggleSignInContent,
        setGuestSignInUsername,
        formApiRef
    });
    const {
        handleCancel,
        handleSubmit,
        initialValues,
        isSaving,
        isUpdate,
        handleValidateEmail,
        showSignInToast,
        handleToastAction,
        handleBlurForm
    } = talonProps;

    const [{ isSignedIn }] = useUserContext();

    const [, { addToast }] = useToasts();

    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, propClasses);
    if (isSignedIn) {
        onSave(CHECKOUT_STEP.PAYMENT);
    }
    const guestEmailMessage = !isUpdate ? (
        <Message>
            <FormattedMessage
                id={'guestForm.emailMessage'}
                defaultMessage={
                    'Set a password at the end of guest checkout to create an account in one easy step.'
                }
            />
        </Message>
    ) : null;

    const cancelButton = isUpdate ? (
        <Button disabled={isSaving} onClick={handleCancel} priority="low">
            <FormattedMessage
                id={'global.cancelButton'}
                defaultMessage={'Cancel'}
            />
        </Button>
    ) : null;

    useEffect(() => {
        if (showSignInToast) {
            addToast({
                type: 'info',
                icon: AlertCircleIcon,
                message: formatMessage({
                    id: 'checkoutPage.suggestSignInMessage',
                    defaultMessage:
                        'The email you provided is associated with an existing Venia account. Would you like to sign into this account?'
                }),
                timeout: false,
                dismissable: true,
                hasDismissAction: true,
                dismissActionText: formatMessage({
                    id: 'checkoutPage.suggestSignInDeclineMessage',
                    defaultMessage: 'No, thanks'
                }),
                actionText: formatMessage({
                    id: 'checkoutPage.suggestSignInConfirmMessage',
                    defaultMessage: 'Yes, sign in'
                }),
                onAction: removeToast =>
                    handleToastAction(
                        removeToast,
                        formApiRef.current.getValue('email')
                    )
            });
        }
    }, [addToast, formatMessage, showSignInToast, handleToastAction]);

    return (
        <Fragment>
            <Form
                onBlur={value => {
                    handleBlurForm(value);
                }}
                className={classes.root}
                data-cy="GuestForm-root"
                initialValues={initialValues}
                onSubmit={handleSubmit}
                getApi={getFormApi}
            >
                {!isSignedIn && (
                    <div className={classes.email}>
                        <Field
                            id="email"
                            label={formatMessage({
                                id: 'global.email',
                                defaultMessage: 'Email'
                            })}
                        >
                            <TextInput
                                autoComplete="off"
                                field="email"
                                id="email"
                                data-cy="GuestForm-email"
                                validate={isRequired}
                                onBlur={() =>
                                    handleValidateEmail(
                                        formApiRef.current.getValue('email')
                                    )
                                }
                                onPaste={e => {
                                    const text = e.clipboardData.getData(
                                        'text/plain'
                                    );
                                    handleValidateEmail(text);
                                }}
                            />
                            {guestEmailMessage}
                        </Field>
                    </div>
                )}
                <div className={classes.buttons}>{cancelButton}</div>
            </Form>
        </Fragment>
    );
};

export default GuestFormForCartVirtual;
