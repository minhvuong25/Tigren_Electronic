import { gql } from '@apollo/client';

export const GET_UP_SELL_PRODUCTS = gql`
    query getRelatedProducts($sku: String!) {
        products(filter: { sku: { eq: $sku } }) {
            items {
                uid
                id
                __typename
                upsell_products {
                    uid
                    id
                    sku
                    stock_status
                    name
                    small_image {
                        url
                    }
                    url_key
                    url_suffix
                    url_rewrites {
                        url
                    }
                    type_id
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
                                amount_off
                                percent_off
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
                    special_price
                }
            }
        }
    }
`;

export default {
    getUpSellProductsQuery: GET_UP_SELL_PRODUCTS
};
