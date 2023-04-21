import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { bool, func, shape, string } from 'prop-types';

import { useAuthBar } from '@tigrensolutions/core/src/talons/AuthBar/useAuthBar';

import { useStyle } from '@magento/venia-ui/lib/classify';
import AccountChip from '@magento/venia-ui/lib/components/AccountChip';
import defaultClasses from './authBar.module.css';

const AuthBar = props => {
    const {
        handleShowMyAccount,
        handleSignIn,
        isDisabled,
        isUserSignedIn,
        handleCreateAccount
    } = useAuthBar(props);
    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, props.classes);

    const fallBackText = formatMessage({
        id: 'authBar.fallbackText',
        defaultMessage: 'Account'
    });

    const buttonElement = isUserSignedIn ? (
        // Show My Account button.
        <button
            className={classes.buttonSignIn}
            disabled={isDisabled}
            onClick={handleShowMyAccount}
        >
            <span className={classes.contents}>
                <AccountChip fallbackText={fallBackText} />
            </span>
        </button>
    ) : (
        // Sign In button.
        <>
            <button
                className={classes.button}
                disabled={isDisabled}
                onClick={handleSignIn}
            >
                <span className={classes.contents}>
                    <span className={classes.signIn}>
                        <FormattedMessage
                            id={'global.signIn'}
                            defaultMessage={'Sign In'}
                        />
                    </span>
                </span>
            </button>
            <button
                className={classes.button}
                disabled={isDisabled}
                onClick={handleCreateAccount}
            >
                <span className={classes.contents}>
                    <span className={classes.signIn}>
                        <FormattedMessage
                            id={'global.register'}
                            defaultMessage={'Register'}
                        />
                    </span>
                </span>
            </button>
        </>
    );

    return <div className={classes.root}>{buttonElement}</div>;
};

export default AuthBar;

AuthBar.propTypes = {
    classes: shape({
        root: string,
        button: string,
        contents: string,
        icon: string,
        signIn: string
    }),
    disabled: bool,
    showMyAccount: func.isRequired,
    showSignIn: func.isRequired
};
