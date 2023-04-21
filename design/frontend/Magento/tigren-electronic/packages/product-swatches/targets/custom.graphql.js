exports.configurableProductVariantFields = `
        ... on ConfigurableProduct {
            stock_status
            variants {
                attributes {
                    uid
                    code
                    value_index
                }
                product {
                    uid
                    small_image {
                        url
                    }
                    stock_status
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
                    }
                }
            }
            configurable_options {
                attribute_code
                attribute_id
                uid
                frontend_input
                used_in_product_listing
                label
                values {
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
`;
