import { gql } from '@apollo/client';

export const ProductOptionsFragments = gql`
    fragment ProductOptionsFragments on ProductInterface {
        ... on ConfigurableProduct {
            configurable_options {
                frontend_input
                attribute_code
                attribute_id
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
            variants {
                attributes {
                    code
                    value_index
                }
                product {
                    uid
                    product_tier_prices {
                        item_id
                        qty
                        price
                        percentage
                    }
                    media_gallery_entries {
                        id
                        uid
                        disabled
                        file
                        label
                        position
                    }
                    sku
                    stock_status
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
                            fixed_product_taxes {
                                amount {
                                    currency
                                    value
                                }
                                label
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
                            fixed_product_taxes {
                                amount {
                                    currency
                                    value
                                }
                                label
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
                    price {
                        regularPrice {
                            amount {
                                currency
                                value
                            }
                        }
                    }
                }
            }
        }
        ... on CustomizableProductInterface {
            options {
                title
                required
                sort_order
                option_id
                ... on CustomizableDropDownOption {
                    value {
                        final_price
                        option_type_id
                        price
                        price_type
                        sku
                        title
                        sort_order
                    }
                }
                ... on CustomizableFieldOption {
                    field: value {
                        price
                        price_type
                        sku
                    }
                }
                ... on CustomizableRadioOption {
                    value {
                        final_price
                        option_type_id
                        price
                        price_type
                        sku
                        title
                        sort_order
                    }
                }
                ... on CustomizableCheckboxOption {
                    value {
                        final_price
                        option_type_id
                        price
                        price_type
                        sku
                        title
                        sort_order
                    }
                }
                ... on CustomizableMultipleOption {
                    value {
                        final_price
                        option_type_id
                        price
                        price_type
                        sku
                        title
                        sort_order
                    }
                }
            }
        }
    }
`;
