import { gql } from '@apollo/client';

export const ProductListingFragment = gql`
    fragment ProductListingFragment on Cart {
        id
        items {
            has_error
            messages {
                code: type
                message: text
            }
            uid
            product {
                uid
                name
                sku
                url_rewrites {
                    url
                }
                url_key
                url_suffix
                thumbnail {
                    url
                }
                small_image {
                    url
                }
                price {
                    regularPrice {
                        amount {
                            currency
                            value
                        }
                    }
                }
                price_range {
                    maximum_price {
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
                stock_status
                ... on ConfigurableProduct {
                    variants {
                        __typename
                        attributes {
                            uid
                        }
                        product {
                            uid
                            __typename
                            small_image {
                                url
                            }
                            price {
                                regularPrice {
                                    amount {
                                        currency
                                        value
                                    }
                                }
                            }
                            price_range {
                                maximum_price {
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
            }

            prices {
                price_including_tax {
                    currency
                    value
                }
                price {
                    currency
                    value
                }
            }
            quantity
            ... on ConfigurableCartItem {
                configurable_options {
                    id
                    configurable_product_option_uid
                    configurable_product_option_value_uid
                    option_label
                    value_label
                }
            }
        }
    }
`;
