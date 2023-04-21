import { useCallback, useState } from 'react';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import DEFAULT_OPERATIONS from './signOut.gql';
import { useAppContext } from '@tigrensolutions/core/src/context/app';

export const useSignOut = (props = {}) => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);

    const [isSigningOut, setIsSigningOut] = useState(false);

    const history = useHistory();
    const [, { signOut }] = useUserContext();
    const [, { setFullPageLoading }] = useAppContext();
    const [revokeToken] = useMutation(operations.signOutMutation);

    const handleSignOut = useCallback(async () => {
        // Delete cart/user data from the redux store.
        setFullPageLoading(true);
        await signOut({ revokeToken });
        setIsSigningOut(true);

        history.go(0);
    }, [revokeToken]);

    return {
        handleSignOut,
        isSigningOut
    };
};
