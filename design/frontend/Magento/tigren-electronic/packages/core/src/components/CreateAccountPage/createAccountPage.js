import React from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import { useCreateAccountPage } from '@magento/peregrine/lib/talons/CreateAccountPage/useCreateAccountPage';
import { useStyle } from '@magento/venia-ui/lib/classify';
import CreateAccount from '@tigrensolutions/core/src/components/CreateAccount';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';

import defaultClasses from './createAccountPage.module.css';
import Breadcrumbs from '../Breadcrumbs';

const CreateAccountPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { createAccountProps } = useCreateAccountPage(props);
    const { formatMessage } = useIntl();

    return (
        <>
            <StoreTitle>
                {formatMessage({
                    id: 'createAccountPage.title',
                    defaultMessage: 'Create an Account'
                })}
            </StoreTitle>
            <Breadcrumbs
                staticPart={formatMessage({
                    id: 'createAccountPage.title',
                    defaultMessage: 'Create an Account'
                })}
            />
            <div className={classes.root}>
                <div className={classes.contentContainer}>
                    <h1 className={classes.header}>
                        <FormattedMessage
                            id="createAccountPage.header"
                            defaultMessage="Create an Account"
                        />
                    </h1>
                    <CreateAccount
                        {...createAccountProps}
                        isCancelButtonHidden={true}
                        isSignUp={true}
                    />
                </div>
            </div>
        </>
    );
};

CreateAccountPage.defaultProps = {
    signedInRedirectUrl: '/customer/account',
    signInPageUrl: '/customer/account/login'
};

CreateAccountPage.propTypes = {
    classes: shape({
        root: string,
        header: string,
        contentContainer: string
    }),
    signedInRedirectUrl: string,
    signInPageUrl: string
};

export default CreateAccountPage;
