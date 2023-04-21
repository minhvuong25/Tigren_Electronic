import { useQuery } from '@apollo/client';
import DEFAULT_OPERATIONS from './relatedProducts.gql';

const useRelatedProducts = ({ sku }) => {
    const { getRelatedProductsQuery } = DEFAULT_OPERATIONS;

    const { called, data, loading, error } = useQuery(getRelatedProductsQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: {
            sku: sku
        }
    });

    const product = data && data.products ? data.products?.items[0] : [];
    const relatedProducts = product ? product.related_products : [];

    return {
        called,
        relatedProducts,
        loading,
        error
    };
};

export default useRelatedProducts;
