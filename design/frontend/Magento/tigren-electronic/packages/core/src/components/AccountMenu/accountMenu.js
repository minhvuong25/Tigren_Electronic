import React from 'react';
import { shape, string } from 'prop-types';
import { useAccountMenu } from '@magento/peregrine/lib/talons/Header/useAccountMenu';

import { useStyle } from '@magento/venia-ui/lib/classify';
import CreateAccount from '@magento/venia-ui/lib/components/CreateAccount';
import SignIn from '@tigrensolutions/core/src/components/SignIn/signIn';
import AccountMenuItems from '@magento/venia-ui/lib/components/AccountMenu/accountMenuItems';
import ForgotPassword from '@magento/venia-ui/lib/components/ForgotPassword';
import defaultClasses from './accountMenu.module.css';
import { useIntl } from 'react-intl';

const AccountMenu = React.forwardRef((props, ref) => {
    const { accountMenuIsOpen, setAccountMenuIsOpen, handleClose } = props;
    const { formatMessage } = useIntl();
    const talonProps = useAccountMenu({
        accountMenuIsOpen,
        setAccountMenuIsOpen
    });
    const {
        view,
        username,
        handleAccountCreation,
        handleSignOut,
        handleForgotPassword,
        handleCancel,
        handleCreateAccount,
        updateUsername
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const rootClass = accountMenuIsOpen ? classes.root_open : classes.root;
    const contentsClass = accountMenuIsOpen
        ? classes.contents_open
        : classes.contents;

    let dropdownContents = null;

    switch (view) {
        case 'ACCOUNT': {
            dropdownContents = <AccountMenuItems onSignOut={handleSignOut} />;

            break;
        }
        case 'FORGOT_PASSWORD': {
            dropdownContents = (
                <ForgotPassword
                    initialValues={{ email: username }}
                    onCancel={handleCancel}
                />
            );

            break;
        }
        case 'CREATE_ACCOUNT': {
            dropdownContents = (
                <CreateAccount
                    classes={{ root: classes.createAccount }}
                    initialValues={{ email: username }}
                    isCancelButtonHidden={false}
                    onSubmit={handleAccountCreation}
                    onCancel={handleCancel}
                />
            );

            break;
        }
        case 'SIGNIN':
        default: {
            dropdownContents = (
                <SignIn
                    classes={{
                        modal_active: classes.loading
                    }}
                    setDefaultUsername={updateUsername}
                    showCreateAccount={handleCreateAccount}
                    showForgotPassword={handleForgotPassword}
                />
            );

            break;
        }
    }

    return (
        <aside className={rootClass}>
            <div ref={ref} className={contentsClass}>
                <button
                    aria-label={formatMessage({
                        id: 'accountTrigger.ariaLabel',
                        defaultMessage: 'Toggle My Account Menu'
                    })}
                    className={classes.close}
                    onClick={handleClose}
                >
                    <span className={classes.text}>
                        <span>
                            {formatMessage({
                                id: 'accountTrigger.account',
                                defaultMessage: 'Account'
                            })}
                        </span>
                    </span>
                </button>
                {accountMenuIsOpen ? dropdownContents : null}
            </div>
        </aside>
    );
});

export default AccountMenu;

AccountMenu.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        link: string,
        contents_open: string,
        contents: string
    })
};
