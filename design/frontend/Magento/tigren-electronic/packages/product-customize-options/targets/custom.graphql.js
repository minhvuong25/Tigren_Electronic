exports.CustomizableProductInterface = `
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
`;
