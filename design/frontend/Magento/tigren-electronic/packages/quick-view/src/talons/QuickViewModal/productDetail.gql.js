import { gql } from '@apollo/client';

import { CartTriggerFragment } from '@magento/peregrine/lib/talons/Header/cartTriggerFragments.gql';
import { MiniCartFragment } from '@magento/peregrine/lib/talons/MiniCart/miniCartFragments.gql';

// TODO: Will be using this fragment.packages/core/src/talons/RootComponents/Product/productDetailFragment.gql.js
import { ProductDetailsFragment } from '@magento/peregrine/lib/talons/RootComponents/Product/productDetailFragment.gql';

export const GET_PRODUCT_DETAIL_QUERY = gql`
    query productDetailBySku($sku: String) {
        products(filter: { sku: { eq: $sku } }) {
            items {
                id
                uid
                ...ProductDetailsFragment
            }
        }
    }
    ${ProductDetailsFragment}
`;

export const ADD_PRODUCT_TO_CART = gql`
    mutation AddProductToCart($cartId: String!, $product: CartItemInput!) {
        addProductsToCart(cartId: $cartId, cartItems: [$product]) {
            cart {
                id
                ...CartTriggerFragment
                ...MiniCartFragment
            }
            user_errors {
                message
                code
            }
        }
    }
    ${CartTriggerFragment}
    ${MiniCartFragment}
`;

export default {
    getProductDetailQuery: GET_PRODUCT_DETAIL_QUERY,
    addProductToCartMutation: ADD_PRODUCT_TO_CART
};
