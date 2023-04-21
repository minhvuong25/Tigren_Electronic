import { gql } from '@apollo/client';

export const WishlistItemFragment = gql`
    fragment WishlistItemFragment on WishlistItemInterface {
        id
        product {
            uid
            small_image {
                url
            }
            image {
                label
                url
            }
            name
            url_key
            url_rewrites {
                url
            }
            price_range {
                minimum_price {
                    minimum_final_price_excl_tax {
                        currency
                        value
                    }
                    regular_price {
                        currency
                        value
                    }
                    final_price {
                        currency
                        value
                    }
                    discount {
                        percent_off
                        amount_off
                    }
                }
                maximum_price {
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
            sku
            stock_status
            ... on ConfigurableProduct {
                configurable_options {
                    attribute_code
                    attribute_id
                    attribute_id_v2
                    uid
                    label
                    values {
                        uid
                        default_label
                        label
                        store_label
                        use_default_value
                        value_index
                        swatch_data {
                            ... on ImageSwatchData {
                                thumbnail
                            }
                            value
                        }
                    }
                }
            }
        }
        ... on ConfigurableWishlistItem {
            configurable_options {
                id
                option_label
                value_id
                value_label
            }
        }
    }
`;
