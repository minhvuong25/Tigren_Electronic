import { gql } from '@apollo/client';

export const GET_ORDER_DETAILS_QUERY = gql`
    query getOrderDetails($orderNumber: String!) {
        order(order_number: $orderNumber) {
            email
            hasEmailAvailable
            order_number
            created_at
            shipping_address {
                firstname
                lastname
                region
                region_id
                country_code
                country_name
                street
                telephone
                fax
                postcode
                city
                vat_id
            }
            billing_address {
                firstname
                lastname
                region
                region_id
                country_code
                country_name
                street
                telephone
                fax
                postcode
                city
                vat_id
            }
            shipping_method
            shipments {
                id
                tracking {
                    number
                }
            }
            payment_methods {
                name
                additional_data {
                    name
                    value
                }
            }
            items {
                id
                product_name
                product_sku
                product_url_key
                product_type
                product_image
                status
                product_sale_price {
                    currency
                    value
                }
                discounts {
                    amount {
                        currency
                        value
                    }
                    label
                }
                selected_options {
                    value
                    label
                }
                quantity_ordered
            }
            total {
                subtotal {
                    currency
                    value
                }
                discounts {
                    amount {
                        currency
                        value
                    }
                    label
                }
                total_tax {
                    currency
                    value
                }
                taxes {
                    amount {
                        currency
                        value
                    }
                    title
                    rate
                }
                grand_total {
                    currency
                    value
                }
                base_grand_total {
                    currency
                    value
                }
                total_shipping {
                    currency
                    value
                }
                shipping_handling {
                    amount_including_tax {
                        value
                        currency
                    }
                }
            }
        }
    }
`;

export default {
    getOrderDetailsQuery: GET_ORDER_DETAILS_QUERY
};
