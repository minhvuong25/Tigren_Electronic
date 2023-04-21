import { useLazyQuery } from '@apollo/client';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import DEFAULT_OPERATIONS from './crossSellProducts.gql';
import { useEffect } from 'react';

const useCrossSellProducts = (props = {}) => {
    const { getCrossSellProductsQuery } = DEFAULT_OPERATIONS;

    const [
        fetchCrossSellProducts,
        { called, data, error, loading }
    ] = useLazyQuery(getCrossSellProductsQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const [{ cartId }] = useCartContext();
    useEffect(() => {
        if (cartId) {
            fetchCrossSellProducts({
                variables: {
                    cartId
                }
            });
        }
    }, [cartId, fetchCrossSellProducts]);

    const cart = data && data.cart ? data.cart : {};
    const crossSellProducts = cart ? cart.crosssell_products : [];

    return {
        called,
        crossSellProducts,
        loading,
        error
    };
};
export default useCrossSellProducts;
