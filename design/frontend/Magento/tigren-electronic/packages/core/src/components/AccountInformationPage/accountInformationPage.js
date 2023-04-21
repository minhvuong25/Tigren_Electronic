import React, { Fragment, useEffect } from 'react';
import combine from '@magento/venia-ui/lib/util/combineValidators';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import {
    hasLengthAtLeast,
    hasLengthAtMost,
    isRequired,
    validateConfirmPassword,
    validateEmail,
    validatePassword,
    validatePhoneNumber
} from '@tigrensolutions/base/src/util/formValidators';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';

import { useToasts } from '@magento/peregrine';
import { useAccountInformationPage } from '@tigrensolutions/core/src/talons/AccountInformationPage/useAccountInformationPage';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import Button from '@magento/venia-ui/lib/components/Button';
import Field from '@magento/venia-ui/lib/components/Field';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import { Form } from 'informed';
import Checkbox from '@tigrensolutions/core/src/components/Checkbox';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Password from '@tigrensolutions/core/src/components/Password';
import AccountInformationPageOperations from './accountInformationPage.gql';
import DateSelect from '../DateSelect';
import Select from '@magento/venia-ui/lib/components/Select';

import defaultClasses from './accountInformationPage.module.css';
import AccountInformationShimmer from './accountInformation.shimmer';

const AccountInformationPage = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const talonProps = useAccountInformationPage({
        ...AccountInformationPageOperations
    });
    const {
        initialValues,
        shouldShowNewPassword,
        handleChangePassword,
        handleChangeEmail,
        handleSubmit,
        isDisabled,
        isChangeEmail,
        formErrors,
        setFormApi
    } = talonProps;

    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();
    const history = useHistory();

    const errorMessage = deriveErrorMessage(formErrors);

    useEffect(() => {
        if (errorMessage !== '') {
            addToast({
                type: 'error',
                message: errorMessage,
                timeout: 4000
            });
        }
    }, [errorMessage]);

    const genderOptions = [
        {
            value: '',
            label: formatMessage({
                id: 'global.gender',
                defaultMessage: 'Gender'
            })
        },
        {
            value: 1,
            label: formatMessage({
                id: 'global.male',
                defaultMessage: 'Male'
            })
        },
        {
            value: 2,
            label: formatMessage({
                id: 'global.Female',
                defaultMessage: 'Female'
            })
        }
    ];

    let pageContent = null;
    if (!initialValues) {
        return <AccountInformationShimmer />;
    } else {
        const { customer } = initialValues;

        pageContent = (
            <Fragment>
                <Form
                    className={classes.formEditAccount}
                    onSubmit={handleSubmit}
                    getApi={setFormApi}
                    initialValues={{
                        ...customer
                    }}
                >
                    <div className={classes.profileInfo}>
                        <div className={classes.formFields}>
                            <Field
                                label={formatMessage({
                                    id: 'global.firstName',
                                    defaultMessage: 'First Name'
                                })}
                            >
                                <TextInput
                                    key={customer.firstname}
                                    initialValue={customer.firstname}
                                    field="firstname"
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
                                    key={customer.lastname}
                                    initialValue={customer.lastname}
                                    field="lastname"
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
                                    validate={combine([
                                        isRequired,
                                        validateEmail
                                    ])}
                                    validateOnBlur
                                    mask={value => value && value.trim()}
                                    maskOnBlur={true}
                                    initialValue={customer.email}
                                    placeholder={formatMessage({
                                        id: 'global.email',
                                        defaultMessage:
                                            'Please enter your email'
                                    })}
                                    onBlur={handleChangeEmail}
                                />
                            </Field>
                            <Field
                                label={formatMessage({
                                    id: 'global.telephone',
                                    defaultMessage: 'Phone Number'
                                })}
                            >
                                <TextInput
                                    field="phone_number"
                                    autoComplete="telephone"
                                    validate={combine([
                                        isRequired,
                                        validatePhoneNumber
                                    ])}
                                    validateOnBlur
                                    initialValue={customer.phone_number}
                                    mask={value => value && value.trim()}
                                    maskOnBlur={true}
                                    maxLength={10}
                                    isMobile={true}
                                    placeholder={formatMessage({
                                        id: 'global.telephonePh',
                                        defaultMessage:
                                            'Please enter your phone number'
                                    })}
                                />
                            </Field>

                            <Field
                                label={formatMessage({
                                    id: 'global.gender',
                                    defaultMessage: 'Gender'
                                })}
                            >
                                <Select
                                    field="gender"
                                    items={genderOptions}
                                    initialValue={customer.gender}
                                    disabled={false}
                                    validate={isRequired}
                                />
                            </Field>

                            <DateSelect defaultDate={customer.date_of_birth} />

                            {isChangeEmail ? (
                                <Password
                                    autoComplete="password"
                                    fieldName="password"
                                    isToggleButtonHidden={true}
                                    label={formatMessage({
                                        id: 'global.password',
                                        defaultMessage: 'Password'
                                    })}
                                    validate={combine([
                                        isRequired,
                                        [hasLengthAtLeast, 8],
                                        validatePassword
                                    ])}
                                    validateOnBlur
                                    mask={value => value && value.trim()}
                                    maskOnBlur={true}
                                />
                            ) : null}
                        </div>

                        <div className={classes.selection}>
                            <div className={classes.item}>
                                <Checkbox
                                    field="is_subscribed"
                                    label={formatMessage({
                                        id: 'global.subscribeNewsletter',
                                        defaultMessage:
                                            'Subscribe to email newsletter'
                                    })}
                                    initialValue={customer.is_subscribed}
                                />
                            </div>

                            <div className={classes.item}>
                                <Checkbox
                                    field="change_password"
                                    label={formatMessage({
                                        id: 'global.changePassword',
                                        defaultMessage: 'Change Password'
                                    })}
                                    onClick={handleChangePassword}
                                />
                            </div>
                        </div>

                        {shouldShowNewPassword && (
                            <div className={classes.changePassword}>
                                <Field
                                    label={formatMessage({
                                        id: 'global.currentPassword',
                                        defaultMessage: 'Current Password'
                                    })}
                                >
                                    <TextInput
                                        field="currentPassword"
                                        type="password"
                                        validate={combine([
                                            isRequired,
                                            validatePassword
                                        ])}
                                        validateOnBlur
                                    />
                                </Field>

                                <Fragment>
                                    <Password
                                        autoComplete="new-password"
                                        fieldName="newPassword"
                                        label={formatMessage({
                                            id: 'global.newPassword',
                                            defaultMessage: 'New Password'
                                        })}
                                        validate={combine([
                                            isRequired,
                                            [hasLengthAtLeast, 8],
                                            [hasLengthAtMost, 25],
                                            validatePassword
                                        ])}
                                        validateOnChange
                                        mask={value => value && value.trim()}
                                        maskOnBlur={true}
                                    />
                                    <Field
                                        label={formatMessage({
                                            id: 'global.confirmPassword',
                                            defaultMessage: 'Confirm Password'
                                        })}
                                    >
                                        <TextInput
                                            field="confirm"
                                            type="password"
                                            validate={combine([
                                                isRequired,
                                                validatePassword,
                                                validateConfirmPassword
                                            ])}
                                            validateOnBlur
                                            validateOnChange
                                        />
                                    </Field>
                                </Fragment>
                            </div>
                        )}
                        <div className={classes.actions}>
                            <Button
                                type="submit"
                                priority="high"
                                disabled={isDisabled}
                                classes={{
                                    root_highPriority: classes.buttonSave
                                }}
                            >
                                {formatMessage({
                                    id: 'global.save',
                                    defaultMessage: 'Save'
                                })}
                            </Button>
                            <Button
                                priority="low"
                                classes={{
                                    root_lowPriority: classes.goBack
                                }}
                                onClick={() => history.goBack()}
                            >
                                {formatMessage({
                                    id: 'accountInformation.back',
                                    defaultMessage: 'Go Back'
                                })}
                            </Button>
                        </div>
                    </div>
                </Form>
            </Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <StoreTitle>
                {formatMessage({
                    id: 'accountInformationPage.titleAccount',
                    defaultMessage: 'Account Information'
                })}
            </StoreTitle>
            <h2 className={classes.boxTitle}>
                <span>
                    {formatMessage({
                        id: 'accountInformationPage.editAccount',
                        defaultMessage: 'Edit Account Information'
                    })}
                </span>
            </h2>
            {pageContent}
        </div>
    );
};

export default AccountInformationPage;
