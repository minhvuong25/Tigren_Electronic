exports.bundleProduct = `
        base_price
        base_price_excl_tax
    ... on BundleProduct {
        dynamic_price
        items {
            option_id
            title
            uid
            required
            type
            position
            options {
                qty
                final_price_excl_tax
                final_price
                price
                uid
                is_default
                quantity
                label
                id
                product {
                    uid
                    price_range {
                        minimum_price {
                            minimum_final_price_excl_tax {
                                currency
                                value
                            }
                            final_price {
                                currency
                                value
                            }
                        }
                    }
                }
            }
        }
    }
`;

exports.bundleCartItems = `
    ... on BundleCartItem {
            bundle_options {
                uid
                label
                values {
                    price
                    quantity
                    uid
                    label
                }
            }
        }
`;

exports.bundleOrderItems = `
... on BundleOrderItem {
                bundle_options {
                    uid
                    label
                    values {
                        uid
                        product_name
                        price {
                            value
                            currency
                        }
                        quantity
                        product_sku
                    }
                }
            }
`;

exports.bundleCustomizeOptions = `
            ... on BundleCartItem {
                simple_customizable: customizable_options {
                    label
                    values {
                        label
                        value
                    }
                }
            }`;
