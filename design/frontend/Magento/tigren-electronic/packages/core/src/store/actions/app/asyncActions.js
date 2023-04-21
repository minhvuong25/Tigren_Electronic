import actions from './actions';

export const getDataDirectories = (payload = {}) => {
    const { fetchDataDirectories } = payload;

    return async function thunk(...args) {
        const [dispatch] = args;
        try {
            const { data } = await fetchDataDirectories();
            dispatch(actions.setDataDirectories(data));
        } catch (error) {
            dispatch(actions.setDataDirectories(null));
            throw new Error(error);
        }
    };
};

export const setFullPageLoading = isFullPageLoading => async dispatch => {
    dispatch(actions.setFullPageLoading(isFullPageLoading));
};
