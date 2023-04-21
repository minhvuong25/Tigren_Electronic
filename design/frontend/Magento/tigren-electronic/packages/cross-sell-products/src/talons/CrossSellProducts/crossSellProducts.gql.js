import { gql } from '@apollo/client';

export const GET_CROSS_SELL_PRODUCTS = gql`
    query getCrossSellProducts($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            crosssell_products {
                uid
                id
                name
                sku
                stock_status
                url_key
                url_rewrites {
                    url
                }
                type_id
                small_image {
                    url
                    label
                }
                price_range {
                    maximum_price {
                        maximum_final_price_excl_tax {
                            currency
                            value
                        }
                        final_price {
                            currency
                            value
                        }
                        regular_price {
                            currency
                            value
                        }
                        discount {
                            percent_off
                            amount_off
                        }
                    }
                    minimum_price {
                        minimum_final_price_excl_tax {
                            currency
                            value
                        }
                        final_price {
                            currency
                            value
                        }
                        regular_price {
                            currency
                            value
                        }
                        discount {
                            amount_off
                            percent_off
                        }
                    }
                }
            }
        }
    }
`;

export default {
    getCrossSellProductsQuery: GET_CROSS_SELL_PRODUCTS
};
