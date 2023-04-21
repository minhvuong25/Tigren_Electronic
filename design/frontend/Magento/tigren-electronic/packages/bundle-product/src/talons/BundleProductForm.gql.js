import { gql } from '@apollo/client';

const ADD_BUNDLE_PRODUCT_TO_CART = gql`
    mutation addBundleProductsToCart(
        $cartId: String!
        $quantity: Float!
        $sku: String!
        $bundleOptions: [BundleOptionInput]!
        $customizeOptions: [CustomizableOptionInput!]
    ) {
        addBundleProductsToCart(
            input: {
                cart_id: $cartId
                cart_items: [
                    {
                        data: { quantity: $quantity, sku: $sku }
                        bundle_options: $bundleOptions
                        customizable_options: $customizeOptions
                    }
                ]
            }
        ) {
            cart {
                id
                items {
                    id
                    uid
                    product {
                        uid
                        name
                        sku
                    }
                    quantity
                }
            }
        }
    }
`;

export default {
    addBundleProductsToCartMutation: ADD_BUNDLE_PRODUCT_TO_CART
};
