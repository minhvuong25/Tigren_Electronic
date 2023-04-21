import { gql } from '@apollo/client';
import { CartTriggerFragment } from '@magento/peregrine/lib/talons/Header/cartTriggerFragments.gql';
import { MiniCartFragment } from '@magento/peregrine/lib/talons/MiniCart/miniCartFragments.gql';

export const ADD_VIRTUAL_MUTATION = gql`
    mutation addVirtualProductsToCart(
        $cartId: String!
        $quantity: Float!
        $sku: String!
        $customizableOptions: [CustomizableOptionInput]
    ) {
        addVirtualProductsToCart(
            input: {
                cart_id: $cartId
                cart_items: [
                    {
                        data: { quantity: $quantity, sku: $sku }
                        customizable_options: $customizableOptions
                    }
                ]
            }
        ) @connection(key: "addVirtualProductsToCart") {
            cart {
                id
                # Update the cart trigger when adding an item.
                ...CartTriggerFragment
                # Update the mini cart when adding an item.
                ...MiniCartFragment
            }
        }
    }
    ${CartTriggerFragment}
    ${MiniCartFragment}
`;
export default {
    addVirtualProductToCartMutation: ADD_VIRTUAL_MUTATION
};
