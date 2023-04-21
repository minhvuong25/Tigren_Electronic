import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Mail } from 'react-feather';

import { useShareProductButton } from '../../talons/useShareProductButton';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './shareProductButton.module.css';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';
import { useUserContext } from '@magento/peregrine/lib/context/user';

const ShareProductButton = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const [{ isSignedIn }] = useUserContext();
    const {
        handleOpenPopup,
        handleLoginPopup,
        isGuestSend,
        isCustomer,
        loading
    } = useShareProductButton({});

    if (loading) {
        return (
            <div className={classes.shareFriend}>
                <Shimmer width="100px" height="21px" />
            </div>
        )
    }

    if (!isCustomer && !isGuestSend) {
        return null;
    }

    if (!isGuestSend && !isSignedIn) {
        return (
            <button
                className={classes.shareFriend}
                onClick={handleLoginPopup}
                type="button"
                data-name="email-popup-login"
            >
                <Icon size={16} src={Mail} />
                <FormattedMessage id="global.email" defaultMessage="Email" />
            </button>
        );
    }

    return (
        <button
            className={classes.shareFriend}
            onClick={handleOpenPopup}
            type="button"
            data-name="email-to-friend"
        >
            <Icon size={16} src={Mail} />
            <FormattedMessage id="global.email" defaultMessage="Email" />
        </button>
    );
};

export default ShareProductButton;
