import React, { Fragment, Suspense } from 'react';
import { useIntl } from 'react-intl';
import { shape, string } from 'prop-types';

import { useAccountTrigger } from '@tigrensolutions/core/src/talons/Header/useAccountTrigger';
import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './accountTrigger.module.css';
import { useUserContext } from '@magento/peregrine/lib/context/user';

const AccountMenu = React.lazy(() =>
    import('@tigrensolutions/core/src/components/AccountMenu')
);

/**
 * The AccountTrigger component is the call to action in the site header
 * that toggles the AccountMenu dropdown.
 *
 * @param {Object} props
 * @param {Object} props.classes - CSS classes to override element styles.
 */
const AccountTrigger = props => {
    const talonProps = useAccountTrigger();
    const {
        accountMenuIsOpen,
        accountMenuRef,
        accountMenuTriggerRef,
        setAccountMenuIsOpen,
        handleTriggerClick,
        handleClose
    } = talonProps;
    const [{ isSignedIn: isUserSignedIn }] = useUserContext();
    const classes = useStyle(defaultClasses, props.classes);
    const rootClassName = accountMenuIsOpen ? classes.root_open : classes.root;
    const { formatMessage } = useIntl();
    const signInClass = isUserSignedIn
        ? classes.triggerSignIn
        : classes.trigger;
    return (
        <Fragment>
            <div className={rootClassName} ref={accountMenuTriggerRef}>
                <button
                    aria-label={formatMessage({
                        id: 'accountTrigger.ariaLabel',
                        defaultMessage: 'Toggle My Account Menu'
                    })}
                    className={signInClass}
                    onClick={handleTriggerClick}
                >
                    <span className={classes.text}>
                        <span className={classes.icon} />
                        <span>
                            {formatMessage({
                                id: 'accountTrigger.account',
                                defaultMessage: 'Account'
                            })}
                        </span>
                    </span>
                </button>
            </div>
            <Suspense fallback={null}>
                <AccountMenu
                    ref={accountMenuRef}
                    accountMenuIsOpen={accountMenuIsOpen}
                    setAccountMenuIsOpen={setAccountMenuIsOpen}
                    handleClose={handleClose}
                />
            </Suspense>
        </Fragment>
    );
};

export default AccountTrigger;

AccountTrigger.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        trigger: string
    })
};
