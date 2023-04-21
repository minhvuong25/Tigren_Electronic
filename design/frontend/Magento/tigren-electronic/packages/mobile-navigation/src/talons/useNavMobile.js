import { useCallback, useEffect, useState } from 'react';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';

export const useNavMobile = props => {
    const { isMobile } = props;
    const history = useHistory();
    const location = useLocation();

    const [{ isSignedIn }] = useUserContext();
    const [, { toggleDrawer, closeDrawer }] = useAppContext();
    const [selectedNav, setSelectedNav] = useState(null);

    const {
        elementRef: searchRef,
        expanded: isSearchOpen,
        setExpanded: setIsSearchOpen,
        triggerRef: searchTriggerRef
    } = useDropdown();

    const handleLocationChange = () => {
        const { pathname, search } = location;
        switch (pathname) {
            case '/cart':
                setSelectedNav('cart');
                break;
            case '/categories':
                setSelectedNav('category');
                break;
            case '/':
                if (search?.includes('search_query')) {
                    setSelectedNav('search');
                } else {
                    setSelectedNav('home');
                }
                break;
            default: {
                if (pathname.includes('customer')) {
                    setSelectedNav('customer');
                } else if (pathname.includes('search')) {
                    setSelectedNav('search');
                } else {
                    setSelectedNav('home');
                }
            }
        }
    };

    useEffect(() => {
        if (isMobile) {
            document.documentElement.setAttribute(
                'data-show-nav-mobile',
                'true'
            );
        } else {
            closeDrawer('nav');
            document.documentElement.removeAttribute('data-show-nav-mobile');
        }
    }, []);

    useEffect(() => {
        handleLocationChange();
    }, []);

    useEffect(() => {
        handleLocationChange();
        closeDrawer('nav');
    }, [location, isSearchOpen]);

    useEffect(() => {
        if (isSearchOpen) {
            setIsSearchOpen(false);
        }
    }, [location]);

    const handleSearchTriggerClick = useCallback(() => {
        // Toggle the Search input form.
        setSelectedNav('search');
        setIsSearchOpen(isOpen => !isOpen);
    }, [setIsSearchOpen]);

    const openLogin = useCallback(() => {
        history.push('/sign-in');
        setSelectedNav('customer');
    }, [toggleDrawer, history]);

    const goToMyAccount = useCallback(() => {
        history.push('/account-information');
        setSelectedNav('customer');
    }, [history]);

    const goToHomePage = useCallback(() => {
        history.push('/');
        setSelectedNav('home');
    }, [history]);

    const goToCartPage = useCallback(() => {
        history.push('/cart');
        setSelectedNav('cart');
    }, [history]);

    const openMenu = useCallback(() => {
        toggleDrawer('nav');
        setSelectedNav('category');
    }, [history, toggleDrawer, location.pathname]);

    return {
        isSignedIn,
        selectedNav,
        goToHomePage,
        openMenu,
        openLogin,
        goToMyAccount,
        goToCartPage,
        handleSearchTriggerClick,
        isSearchOpen,
        searchRef,
        searchTriggerRef
    };
};
