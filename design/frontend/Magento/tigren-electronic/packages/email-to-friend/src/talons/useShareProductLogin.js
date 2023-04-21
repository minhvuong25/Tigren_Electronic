import { useCallback, useEffect } from 'react';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useLocation } from 'react-router-dom';

export const useShareProductLogin = () => {
    // retrieve app state from context
    const [appState, { closeDrawer }] = useAppContext();
    const [{ isSignedIn }] = useUserContext();
    const location = useLocation();
    const { pathname } = location;
    // extract relevant data from app state
    const { drawer } = appState;
    const isOpen = drawer === 'email-popup-login';

    useEffect(() => {
        if (isOpen && isSignedIn) {
            closeDrawer();
        }
    }, [isSignedIn, isOpen]);

    useEffect(() => {
        if (isOpen) {
            closeDrawer();
        }
    }, [pathname]);

    const handleClose = useCallback(() => {
        closeDrawer();
    }, [closeDrawer]);

    return {
        handleClose,
        isOpen,
        isSignedIn
    };
};
