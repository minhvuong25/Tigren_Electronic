import { useCallback } from 'react';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useHistory } from 'react-router-dom';

/**
 * Returns props necessary to render an AuthBar component.
 *
 * @param {object} props
 * @param {boolean} props.disabled - whether sign in button should be disabled
 * @param {function} props.showMyAccount - callback that displays my account view
 * @param {function} props.showSignIn - callback that displays sign in view
 * @return {{
 *   handleShowMyAccount: function,
 *   handleSignIn: function,
 *   isDisabled: boolean
 *   isUserSignedIn: boolean
 * }}
 */
export const useAuthBar = props => {
    const { disabled, showSignIn, showCreateAccount, closeDrawer } = props;
    const [{ isSignedIn: isUserSignedIn }] = useUserContext();

    const history = useHistory();

    const handleSignIn = useCallback(() => {
        showSignIn();
    }, [showSignIn]);

    const handleShowMyAccount = useCallback(() => {
        history.push('/customer/account');
        closeDrawer();
    }, [closeDrawer, history]);

    const handleCreateAccount = useCallback(() => {
        showCreateAccount();
    }, [showCreateAccount]);

    return {
        handleShowMyAccount,
        handleSignIn,
        isDisabled: disabled,
        isUserSignedIn,
        handleCreateAccount
    };
};
