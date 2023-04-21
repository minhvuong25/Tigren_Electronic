import React, { useMemo, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';

import { useSignOut } from '@tigrensolutions/core/src/talons/MyAccount/useSignOut';
import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './signOut.module.css';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useHistory } from 'react-router-dom';

const SignOut = (props = {}) => {
    const classes = useStyle(defaultClasses, props.classes);
    const history = useHistory();

    const talonProps = useSignOut();
    const { handleSignOut, isSigningOut } = talonProps;
    const [{ isSignedIn: isUserSignedIn }] = useUserContext();

    useEffect(() => {
        if (isUserSignedIn && !isSigningOut && handleSignOut) {
            handleSignOut();
        } else {
            history.push('/');
        }
    }, [isSigningOut, handleSignOut]);

    const content = useMemo(() => {
        if (isSigningOut) {
            return fullPageLoadingIndicator;
        }

        return (
            <div className={classes.content}>
                <h1 className={classes.title}>
                    <FormattedMessage
                        id={'signOutSuccess.title'}
                        defaultMessage={'You are signed out'}
                    />
                </h1>
                <p className={classes.description}>
                    <FormattedMessage
                        id={'signOutSuccess.description'}
                        defaultMessage={
                            'You have signed out and will go to our homepage in 5 seconds.'
                        }
                    />
                </p>
            </div>
        );
    }, [isSigningOut]);

    return <div className={classes.root}>{content}</div>;
};

export default SignOut;
