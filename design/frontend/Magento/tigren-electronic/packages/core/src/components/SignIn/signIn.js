import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { func, shape, string } from 'prop-types';
import { Form } from 'informed';
import { useHistory } from 'react-router-dom';

import { useSignIn } from '@tigrensolutions/core/src/talons/SignIn/useSignIn';

import { useStyle } from '@magento/venia-ui/lib/classify';
import {
    hasLengthAtLeast,
    isRequired,
    validatePassword
} from '@magento/venia-ui/lib/util/formValidators';
import combine from '@magento/venia-ui/lib/util/combineValidators';
import { validateEmail } from '@tigrensolutions/base/src/util/formValidators';
import Button from '@magento/venia-ui/lib/components/Button';
import Field from '@magento/venia-ui/lib/components/Field';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import defaultClasses from './signIn.module.css';
import { GET_CART_DETAILS_QUERY } from '@magento/venia-ui/lib/components/SignIn/signIn.gql';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import Password from '@tigrensolutions/core/src/components/Password/password.js';

const SignIn = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const history = useHistory();

    const {
        setDefaultUsername,
        showCreateAccount,
        showForgotPassword,
        isSignInPage,
        closeDrawer
    } = props;

    const { formatMessage } = useIntl();
    const talonProps = useSignIn({
        getCartDetailsQuery: GET_CART_DETAILS_QUERY,
        setDefaultUsername,
        showCreateAccount,
        showForgotPassword
    });

    const {
        // handleCreateAccount,
        // handleForgotPassword,
        handleSubmit,
        isBusy,
        setFormApi
    } = talonProps;

    const handleForgot = useCallback(() => {
        history.push('/forgot-password');
        closeDrawer();
    }, [history, closeDrawer]);

    const handleCreate = useCallback(() => {
        history.push('/customer/account/create');
        closeDrawer();
    }, [history, closeDrawer]);

    const forgotPasswordClasses = {
        root: classes.forgotPasswordButton
    };

    return (
        <>
            <div className={classes.root}>
                {!isSignInPage && (
                    <span className={classes.title}>
                        <FormattedMessage
                            id={'signInPage.title'}
                            defaultMessage={'Sign In'}
                        />
                    </span>
                )}
                <Form
                    getApi={setFormApi}
                    className={classes.form}
                    onSubmit={handleSubmit}
                >
                    <Field
                        label={formatMessage({
                            id: 'global.email',
                            defaultMessage: 'Email'
                        })}
                    >
                        <TextInput
                            autoComplete="email"
                            field="email"
                            validate={combine([isRequired, validateEmail])}
                            validateOnBlur
                            mask={value => value && value.trim()}
                            maskOnBlur={true}
                        />
                    </Field>

                    <div className={classes.password}>
                        <Password
                            fieldName="password"
                            label={formatMessage({
                                id: 'global.password',
                                defaultMessage: 'Password'
                            })}
                            validate={combine([
                                isRequired,
                                [hasLengthAtLeast, 8],
                                validatePassword
                            ])}
                            autoComplete="current-password"
                            validateOnBlur
                            isToggleButtonHidden={true}
                        />
                        <div className={classes.forgotPasswordButtonContainer}>
                            <LinkButton
                                classes={forgotPasswordClasses}
                                type="button"
                                onClick={handleForgot}
                            >
                                <FormattedMessage
                                    id={'resetPassword.pageTitleText'}
                                    defaultMessage={'Reset Password'}
                                />
                            </LinkButton>
                        </div>
                    </div>
                    <div className={classes.buttonsContainer}>
                        <Button priority="high" type="submit" disabled={isBusy}>
                            <FormattedMessage
                                id={'signIn.signInText'}
                                defaultMessage={'Sign In'}
                            />
                        </Button>
                    </div>
                </Form>
            </div>
            <div className={classes.rootBottom}>
                <FormattedMessage
                    id={'signIn.createAccountTitle'}
                    defaultMessage={"You don't have an account yet?"}
                />
                <LinkButton
                    priority="normal"
                    type="button"
                    onClick={handleCreate}
                    classes={{
                        root: classes.createAccount
                    }}
                >
                    <FormattedMessage
                        id={'signIn.createAccountText'}
                        defaultMessage={'Create an Account'}
                    />
                </LinkButton>
            </div>
        </>
    );
};

export default SignIn;
SignIn.propTypes = {
    classes: shape({
        buttonsContainer: string,
        form: string,
        forgotPasswordButton: string,
        forgotPasswordButtonContainer: string,
        root: string,
        title: string
    }),
    setDefaultUsername: func,
    showCreateAccount: func,
    showForgotPassword: func
};
SignIn.defaultProps = {
    setDefaultUsername: () => {},
    showCreateAccount: () => {},
    showForgotPassword: () => {},
    closeDrawer: () => {}
};
