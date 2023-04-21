import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';
import { removeCart } from '@magento/peregrine/lib/store/actions/cart';

import actions from './actions';

const storage = new BrowserPersistence();

export const signOut = (payload = {}) =>
    async function thunk(dispatch) {
        const { logOut } = payload;

        if (logOut) {
            // Send mutation to revoke token.
            try {
                await logOut();
            } catch (error) {
                console.error('Error Revoking Token', error);
            }
        }

        // Remove token from local storage and Redux.
        await dispatch(clearToken());
        await dispatch(actions.reset());

        // Now that we're signed out, forget the old (customer) cart.
        // We don't need to create a new cart here because we're going to refresh
        // the page immediately after.
        await dispatch(removeCart());
    };

export const getUserDetails = ({ fetchUserDetails }) =>
    async function thunk(...args) {
        const [dispatch, getState] = args;
        const { user } = getState();

        if (user.isSignedIn) {
            dispatch(actions.getDetails.request());

            try {
                const { data } = await fetchUserDetails({
                    fetchPolicy: 'no-cache'
                });

                dispatch(actions.getDetails.receive(data.customer));
            } catch (error) {
                dispatch(actions.getDetails.receive(error));
            }
        }
    };

export const setToken = token =>
    async function thunk(...args) {
        const [dispatch] = args;

        // Store token in local storage.
        // TODO: Get correct token expire time from API
        storage.setItem('signin_token', token, 3600);
        storage.removeItem('recent_viewed');

        // Persist in store
        dispatch(actions.setToken(token));
    };

export const clearToken = () =>
    async function thunk(...args) {
        const [dispatch] = args;

        // Clear token from local storage
        storage.removeItem('signin_token');

        // Remove from store
        dispatch(actions.clearToken());
    };

export const clearRecentViewed = () =>
    async function thunk(...args) {
        const [dispatch] = args;

        // Clear recent viewed data from local storage
        storage.removeItem('recent_viewed');

        // Remove from store
        dispatch(actions.clearRecentViewed());
    };

export const updateAddress = ({ address, values, mutationGraph }) => {
    return async function thunk(...args) {
        const [dispatch] = args;
        dispatch(actions.updateAddress.request(values));

        try {
            if (values.region) {
                delete values.region.__typename;
            }

            const variables = {
                input: values
            };

            if (address.id) variables.id = address.id;

            await mutationGraph({
                variables: variables
            });

            dispatch(actions.updateAddress.receive());
        } catch (error) {
            dispatch(actions.updateAddress.receive(error));
        }
    };
};

export const editAccount = part => async dispatch => {
    dispatch(actions.editAccount(part));
};

export const viewOrder = order => async dispatch => {
    dispatch(actions.viewOrder(order));
};

export const deleteAddress = ({ id, deleteCustomerAddress }) => {
    return async function thunk(...args) {
        const [dispatch] = args;
        dispatch(actions.deleteAddress.request(id));

        try {
            await deleteCustomerAddress({
                variables: { id: id }
            });

            dispatch(actions.deleteAddress.receive());
        } catch (error) {
            dispatch(actions.deleteAddress.receive(error));
        }
    };
};
