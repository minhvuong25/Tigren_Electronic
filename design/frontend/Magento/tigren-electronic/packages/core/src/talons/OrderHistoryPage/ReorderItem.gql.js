import { gql } from '@apollo/client';

export const REORDER_ITEM = gql`
    mutation reorderOrderItems($orderNumber: String!) {
        reorderItems(orderNumber: $orderNumber) {
            cart {
                id
                items {
                    uid
                    product {
                        uid
                        sku
                    }
                    quantity
                    prices {
                        price {
                            value
                        }
                    }
                }
            }
            userInputErrors {
                code
                message
                path
            }
        }
    }
`;
