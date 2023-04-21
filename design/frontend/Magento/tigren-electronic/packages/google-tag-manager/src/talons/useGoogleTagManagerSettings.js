import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import DEFAULT_OPERATIONS from './googleTagManager.gql';
import { useQuery } from '@apollo/client';

export const useGoogleTagManagerSettings = (props = {}) => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { getStoreConfigQuery } = operations;

    const { data, error } = useQuery(getStoreConfigQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const { storeConfig } = data || {};

    return {
        ...storeConfig,
        error
    };
};
