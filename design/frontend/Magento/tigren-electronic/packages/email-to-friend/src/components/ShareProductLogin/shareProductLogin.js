import React from 'react';
import { shape, string } from 'prop-types';
import { X as CloseIcon } from 'react-feather';

import { useShareProductLogin } from '../../talons/useShareProductLogin';
import SignIn from '@magento/venia-ui/lib/components/SignIn';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './shareProductLogin.module.css';
import { FormattedMessage } from 'react-intl';

const ShareProductLogin = props => {
    const { handleClose, isOpen } = useShareProductLogin();

    const classes = useStyle(defaultClasses, props.classes);
    const rootClassName = isOpen ? classes.root_open : classes.root;

    return (
        <aside className={rootClassName}>
            <div className={classes.contents}>
                <div className={classes.content}>
                    <button className={classes.close} onClick={handleClose}>
                        <Icon src={CloseIcon} />
                    </button>
                    <h2 className={classes.header}>
                        <FormattedMessage
                            id="signInPage.title"
                            defaultMessage="Sign In"
                        />
                    </h2>
                    <SignIn isSignInPage={true} />
                </div>
            </div>
        </aside>
    );
};

export default ShareProductLogin;

ShareProductLogin.propTypes = {
    classes: shape({
        root: string,
        root_open: string
    })
};
