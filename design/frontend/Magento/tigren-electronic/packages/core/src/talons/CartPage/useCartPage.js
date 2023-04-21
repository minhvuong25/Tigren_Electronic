import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import { useCartContext } from '@magento/peregrine/lib/context/cart';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import DEFAULT_OPERATIONS from './cartPage.gql';

/**
 * This talon contains logic for a cart page component.
 * It performs effects and returns prop data for rendering the component.
 *
 * This talon performs the following effects:
 *
 * - Manages the updating state of the cart while cart details data is being fetched
 *
 * @function
 *
 * @param {Object} props
 * @param {CartPageQueries} props.queries GraphQL queries
 *
 * @returns {CartPageTalonProps}
 *
 * @example <caption>Importing into your project</caption>
 * import { useCartPage } from '@magento/peregrine/lib/talons/CartPage/useCartPage';
 */
export const useCartPage = (props = {}) => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {
        getCartDetailsQuery,
        clearCartMutation,
        createCartMutation
    } = operations;

    const [{ cartId }, { createCart, removeCart }] = useCartContext();

    const [isCartUpdating, setIsCartUpdating] = useState(false);
    const [wishlistSuccessProps, setWishlistSuccessProps] = useState(null);
    const [isShow, setIsShow] = useState(false);

    const [clearAllCart, { loading: isCartClearing }] = useMutation(
        clearCartMutation
    );

    const [fetchCartId] = useMutation(createCartMutation);

    const [fetchCartDetails, { called, data, loading }] = useLazyQuery(
        getCartDetailsQuery,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );

    const hasItems = !!(
        data &&
        data.cart.total_quantity &&
        data.cart.items.length > 0
    );
    const shouldShowLoadingIndicator = called && loading && !hasItems;

    const cartItems = useMemo(() => {
        return (data && data.cart.items) || [];
    }, [data]);

    const onAddToWishlistSuccess = useCallback(successToastProps => {
        setWishlistSuccessProps(successToastProps);
    }, []);

    useEffect(() => {
        if (!called && cartId) {
            fetchCartDetails({ variables: { cartId } });
        }

        // Let the cart page know it is updating while we're waiting on network data.
        setIsCartUpdating(loading);
    }, [fetchCartDetails, called, cartId, loading]);
    const handleRemove = useCallback(() => {
        setIsShow(true);
    }, []);

    const handleCancelRemove = useCallback(() => {
        setIsShow(false);
    }, []);

    const handleClearAllCart = useCallback(async () => {
        try {
            setIsShow(false);
            await clearAllCart({
                variables: {
                    cartId
                }
            });
            await removeCart();
            await createCart({
                fetchCartId
            });
        } catch (error) {
            setIsShow(false);
        }
    }, [clearAllCart, cartId, removeCart, createCart]);

    const isCartHasError = useMemo(() => {
        if (cartItems) {
            const isCartHasError = cartItems.find(cartItem => {
                const { product } = cartItem;
                const { stock_status: stockStatus } = product;
                const { has_error } = cartItem;

                return stockStatus === 'OUT_OF_STOCK' || has_error;
            });

            return !!isCartHasError;
        }
    }, [cartItems]);

    return {
        cart: data?.cart,
        cartItems,
        hasItems,
        isCartUpdating,
        fetchCartDetails,
        onAddToWishlistSuccess,
        setIsCartUpdating,
        shouldShowLoadingIndicator,
        wishlistSuccessProps,
        handleRemove,
        handleCancelRemove,
        handleClearAllCart,
        isShow,
        isCartClearing,
        isCartHasError
    };
};

/** JSDoc type definitions */

/**
 * GraphQL formatted string queries used in this talon.
 *
 * @typedef {Object} CartPageQueries
 *
 * @property {GraphQLAST} getCartDetailsQuery Query for getting the cart details.
 *
 * @see [cartPage.gql.js]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/cartPage.gql.js}
 * for queries used in Venia
 */

/**
 * Props data to use when rendering a cart page component.
 *
 * @typedef {Object} CartPageTalonProps
 *
 * @property {Array<Object>} cartItems An array of item objects in the cart.
 * @property {boolean} hasItems True if the cart has items. False otherwise.
 * @property {boolean} isCartUpdating True if the cart is updating. False otherwise.
 * @property {function} setIsCartUpdating Callback function for setting the updating state of the cart page.
 * @property {boolean} shouldShowLoadingIndicator True if the loading indicator should be rendered. False otherwise.
 */
