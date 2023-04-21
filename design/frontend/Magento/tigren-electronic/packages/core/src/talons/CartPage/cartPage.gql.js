import { gql } from '@apollo/client';
import { CartPageFragment } from '@magento/peregrine/lib/talons/CartPage/cartPageFragments.gql';

const GET_CART_DETAILS = gql`
    query GetCartDetails($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            messages {
                code: type
                message: text
            }
            ...CartPageFragment
        }
    }
    ${CartPageFragment}
`;
const CLEAR_CART = gql`
    mutation clearCart($cartId: String!) {
        clearCart(cartId: $cartId)
    }
`;

const CREATE_CART_MUTATION = gql`
    mutation createCart {
        cartId: createEmptyCart
    }
`;

export default {
    getCartDetailsQuery: GET_CART_DETAILS,
    clearCartMutation: CLEAR_CART,
    createCartMutation: CREATE_CART_MUTATION
};
