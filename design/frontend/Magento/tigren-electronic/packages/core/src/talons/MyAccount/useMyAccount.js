import { useCallback, useEffect, useState } from 'react';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { useHistory, useLocation } from 'react-router-dom';

import { useUserContext } from '@tigrensolutions/core/src/context/user';

import { GET_CUSTOMER } from './myAccount.gql';

export const useMyAccount = props => {
    const { tabsDetails } = props;
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [relatedTabIndex, setRelatedTabIndex] = useState();

    const [{ currentUser, isSignedIn }, { getUserDetails }] = useUserContext();
    const history = useHistory();
    const location = useLocation();
    const { pathname } = location;

    const fetchUserDetails = useAwaitQuery(GET_CUSTOMER);

    // Auto change tab when click back
    useEffect(() => {
        const tabIndex = tabsDetails.findIndex(
            ({ path, related_path }) =>
                pathname === path ||
                pathname === path + '/' ||
                pathname.includes(related_path)
        );

        if (tabIndex !== -1) {
            setSelectedTabIndex(tabIndex);
        }
    }, [pathname, setSelectedTabIndex]);

    useEffect(() => {
        const tabRelatedIndex = tabsDetails.findIndex(tab =>
            pathname.includes(tab.related_path)
        );

        if (tabRelatedIndex !== -1) {
            return setRelatedTabIndex(tabRelatedIndex);
        } else {
            return setRelatedTabIndex(null);
        }
    }, [pathname, setRelatedTabIndex]);

    useEffect(() => {
        const redirectFrom =
            location && location.state && location.state.redirectFrom;
        const isAfterCreateAccount = redirectFrom === 'createAccountPage';

        if (!isSignedIn && !isAfterCreateAccount) {
            history.push('/');
            return;
        }
        getUserDetails({ fetchUserDetails });
    }, []);

    useEffect(() => {}, []);

    const handleChangeTab = useCallback(
        tab => {
            setSelectedTabIndex(tab);
        },
        [setSelectedTabIndex]
    );

    return {
        selectedTabIndex,
        relatedTabIndex,
        isSignedIn,
        currentUser,
        handleChangeTab
    };
};
