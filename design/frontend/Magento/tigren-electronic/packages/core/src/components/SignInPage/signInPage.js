import React from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import { useSignInPage } from '@magento/peregrine/lib/talons/SignInPage/useSignInPage';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import SignIn from '@tigrensolutions/core/src/components/SignIn';

import defaultClasses from './signInPage.module.css';
import Breadcrumbs from '../Breadcrumbs';

const SignInPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { signInProps } = useSignInPage(props);
    const { formatMessage } = useIntl();

    return (
        <>
            <StoreTitle>
                {formatMessage({
                    id: 'signInPage.title',
                    defaultMessage: 'Sign In'
                })}
            </StoreTitle>
            <Breadcrumbs
                staticPart={formatMessage({
                    id: 'signInPage.title',
                    defaultMessage: 'Sign In'
                })}
            />
            <div className={classes.root}>
                <div className={classes.contentContainer}>
                    <h1 className={classes.header}>
                        <FormattedMessage
                            id="signInPage.title"
                            defaultMessage="Sign In"
                        />
                    </h1>
                    <SignIn {...signInProps} isSignInPage={true} />
                </div>
            </div>
        </>
    );
};

SignInPage.defaultProps = {
    createAccountPageUrl: '/customer/account/create',
    forgotPasswordPageUrl: '/forgot-password',
    signedInRedirectUrl: '/customer/account'
};

SignInPage.propTypes = {
    classes: shape({
        root: string,
        header: string,
        contentContainer: string
    }),
    createAccountPageUrl: string,
    forgotPasswordPageUrl: string,
    signedInRedirectUrl: string
};

export default SignInPage;
