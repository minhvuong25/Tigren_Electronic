import { useQuery } from '@apollo/client';
import DEFAULT_OPERATIONS from './upSellProducts.gql';

const useUpSellProducts = ({ sku }) => {
    const { getUpSellProductsQuery } = DEFAULT_OPERATIONS;

    const { called, data, loading, error } = useQuery(getUpSellProductsQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: {
            sku: sku
        }
    });

    const product = data && data.products ? data.products?.items[0] : [];
    const upSellProducts = product ? product.upsell_products : [];

    return {
        called,
        upSellProducts,
        loading,
        error
    };
};

export default useUpSellProducts;
