import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { func, shape, string, bool } from 'prop-types';
import { useCreateAccount } from '@tigrensolutions/core/src/talons/CreateAccount/useCreateAccount';
import { Link } from 'react-router-dom';

import { useStyle } from '@magento/venia-ui/lib/classify';
import combine from '@magento/venia-ui/lib/util/combineValidators';
import {
    hasLengthAtLeast,
    isRequired,
    validatePassword
} from '@magento/venia-ui/lib/util/formValidators';
import {
    validateConfirmPasswordCreate,
    validateEmail,
    validatePhoneNumber
} from '@tigrensolutions/base/src/util/formValidators';
import Button from '@magento/venia-ui/lib/components/Button';
import Field from '@magento/venia-ui/lib/components/Field';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import Select from '@magento/venia-ui/lib/components/Select';

import Checkbox from '@tigrensolutions/core/src/components/Checkbox';
import Password from '@tigrensolutions/core/src/components/Password/password.js';
import DateSelect from '@tigrensolutions/core/src/components/DateSelect';

import defaultClasses from './createAccount.module.css';

const CreateAccount = props => {
    const { isSignUp } = props;
    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useCreateAccount({
        initialValues: props.initialValues,
        onSubmit: props.onSubmit,
        onCancel: props.onCancel
    });

    const {
        handleCancel,
        handleSubmit,
        isDisabled,
        initialValues,
        handleChange,
        isTermCheck
    } = talonProps;

    const genderOption = [
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

    const cancelButton = props.isCancelButtonHidden ? null : (
        <Button
            className={classes.cancelButton}
            disabled={isDisabled}
            type="button"
            priority="low"
            onClick={handleCancel}
        >
            <FormattedMessage
                id={'createAccount.cancelText'}
                defaultMessage={'Cancel'}
            />
        </Button>
    );

    const submitButton = (
        <Button
            className={classes.submitButton}
            disabled={isDisabled || !isTermCheck}
            type="submit"
            priority="high"
        >
            <FormattedMessage
                id={'createAccount.createAccountText'}
                defaultMessage={'Create an Account'}
            />
        </Button>
    );

    return (
        <>
            <Form
                className={classes.root}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {!isSignUp && (
                    <h2 className={classes.title}>
                        <FormattedMessage
                            id={'createAccount.createAccountText'}
                            defaultMessage={'Create an Account'}
                        />
                    </h2>
                )}
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
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                        placeholder={formatMessage({
                            id: 'global.firstNamePh',
                            defaultMessage: 'Please enter the first name'
                        })}
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
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                        placeholder={formatMessage({
                            id: 'global.lastNamePh',
                            defaultMessage: 'Please enter your last name'
                        })}
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
                        validate={combine([isRequired, validatePhoneNumber])}
                        validateOnBlur
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                        maxLength={10}
                        isMobile={true}
                        placeholder={formatMessage({
                            id: 'global.telephonePh',
                            defaultMessage: 'Please enter your phone number'
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
                        id={classes.country_id}
                        field="gender"
                        items={genderOption}
                        disabled={false}
                        validate={isRequired}
                    />
                </Field>
                <DateSelect />
                <Field
                    label={formatMessage({
                        id: 'global.email',
                        defaultMessage: 'Email'
                    })}
                >
                    <TextInput
                        field="customer.email"
                        autoComplete="email"
                        validate={combine([isRequired, validateEmail])}
                        validateOnBlur
                        mask={value => value && value.trim()}
                        maskOnBlur={true}
                        placeholder={formatMessage({
                            id: 'global.emailPh',
                            defaultMessage: 'Please enter your email'
                        })}
                    />
                </Field>

                <Password
                    autoComplete="new-password"
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
                    strengthBar={true}
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
                        placeholder={formatMessage({
                            id: 'global.confirmPassword',
                            defaultMessage: 'Confirm Password'
                        })}
                        validate={combine([
                            isRequired,
                            [hasLengthAtLeast, 8],
                            validateConfirmPasswordCreate
                        ])}
                    />
                </Field>
                <div className={classes.subscribeTerm}>
                    <Checkbox
                        field="subscribe_term"
                        id="subscribe_term"
                        label={formatMessage(
                            {
                                id: 'createAccount.term',
                                defaultMessage:
                                    'I have read and agree <a>Privacy Policy</a> and <a1>Terms of Use</a1>'
                            },
                            {
                                a: str => (
                                    <Link to={'/privacy_policy'}>{str}</Link>
                                ),
                                a1: str => (
                                    <Link to={'/term_of_use'}>{str}</Link>
                                )
                            }
                        )}
                        validate={isRequired}
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div className={classes.subscribe}>
                    <Checkbox
                        field="subscribe"
                        id="subscribe"
                        label={formatMessage({
                            id: 'createAccount.subscribeText',
                            defaultMessage: 'Subscribe to news and updates'
                        })}
                    />
                </div>
                <div className={classes.actions}>
                    {cancelButton}
                    {submitButton}
                </div>
            </Form>
            <div className={classes.rootBottom}>
                <FormattedMessage
                    id={'signIn.signInAccountTitle'}
                    defaultMessage={'Already a member?'}
                />
                <LinkButton
                    priority="normal"
                    type="button"
                    onClick={handleCancel}
                    classes={{
                        root: classes.signInAccount
                    }}
                >
                    <FormattedMessage
                        id={'signInPage.title'}
                        defaultMessage={'Sign In'}
                    />
                </LinkButton>
            </div>
        </>
    );
};

CreateAccount.propTypes = {
    classes: shape({
        actions: string,
        lead: string,
        root: string,
        subscribe: string
    }),
    initialValues: shape({
        email: string,
        firstName: string,
        lastName: string
    }),
    isCancelButtonHidden: bool,
    onSubmit: func,
    onCancel: func
};

CreateAccount.defaultProps = {
    onCancel: () => {},
    isCancelButtonHidden: true
};

export default CreateAccount;
