import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import { useForgotPasswordPage } from '@magento/peregrine/lib/talons/ForgotPasswordPage/useForgotPasswordPage';
import { useStyle } from '@magento/venia-ui/lib/classify';
import ForgotPassword from '@magento/venia-ui/lib/components/ForgotPassword';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import Breadcrumbs from '@tigrensolutions/core/src/components/Breadcrumbs';

import defaultClasses from './forgotPasswordPage.module.css';

const ForgotPasswordPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { forgotPasswordProps } = useForgotPasswordPage(props);
    const { formatMessage } = useIntl();

    const breadcrumbTitle = formatMessage({
        id: 'formatPasswordPage.title',
        defaultMessage: 'Forgot Password'
    });

    return (
        <Fragment>
            <Breadcrumbs staticPart={breadcrumbTitle} />
            <div className={classes.root}>
                <StoreTitle>
                    {formatMessage({
                        id: 'forgotPasswordPage.title',
                        defaultMessage: 'Forgot Your Password?'
                    })}
                </StoreTitle>

                <div className={classes.contentContainer}>
                    <h2 className={classes.title}>
                        <FormattedMessage
                            id="formatPasswordPage.title"
                            defaultMessage="Forgot Password"
                        />
                    </h2>

                    <p className={classes.description}>
                        <FormattedMessage
                            id="formatPasswordPage.description"
                            defaultMessage="Please enter your email to receive a password reset link."
                        />
                    </p>

                    <div className={classes.form}>
                        <ForgotPassword {...forgotPasswordProps} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

ForgotPasswordPage.defaultProps = {
    signedInRedirectUrl: '/customer/account'
};

ForgotPasswordPage.propTypes = {
    classes: shape({
        root: string,
        header: string,
        contentContainer: string
    }),
    signedInRedirectUrl: string,
    signInPageUrl: string
};

export default ForgotPasswordPage;
