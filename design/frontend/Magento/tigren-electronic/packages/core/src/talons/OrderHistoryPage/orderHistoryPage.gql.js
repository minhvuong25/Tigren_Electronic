import { gql } from '@apollo/client';

const CustomerOrdersFragment = gql`
    fragment CustomerOrdersFragment on CustomerOrders {
        page_info {
            current_page
            total_pages
        }
        items {
            state
            id
            invoices {
                id
            }
            number
            order_date
            status
            shipping_address {
                firstname
                lastname
            }
            shipments {
                id
                tracking {
                    number
                }
            }
            total {
                grand_total {
                    currency
                    value
                }
            }
        }
        page_info {
            current_page
            total_pages
        }
        total_count
    }
`;

const CustomerOrdersDetailFragment = gql`
    fragment CustomerOrdersFragment on CustomerOrders {
        items {
            billing_address {
                city
                country_code
                country_name
                firstname
                lastname
                postcode
                region
                region_id
                street
                telephone
                fax
                postcode
                vat_id
            }
            state
            id
            invoices {
                id
            }
            items {
                id
                product_name
                product_sale_price {
                    currency
                    value
                }
                product_sku
                product_url_key
                selected_options {
                    label
                    value
                }
                quantity_ordered
            }
            number
            order_date
            payment_methods {
                name
                type
                additional_data {
                    name
                    value
                }
            }
            shipments {
                id
                tracking {
                    number
                }
            }
            shipping_address {
                city
                country_code
                country_name
                firstname
                lastname
                postcode
                region
                region_id
                street
                telephone
                fax
                postcode
                vat_id
            }
            shipping_method
            status
            total {
                discounts {
                    amount {
                        currency
                        value
                    }
                }
                grand_total {
                    currency
                    value
                }
                subtotal {
                    currency
                    value
                }
                total_shipping {
                    currency
                    value
                }
                total_tax {
                    currency
                    value
                }
            }
        }
    }
`;

export const GET_CUSTOMER_ORDERS = gql`
    query GetCustomerOrders(
        $filter: CustomerOrdersFilterInput
        $pageSize: Int!
        $currentPage: Int!
    ) {
        customer {
            id
            orders(
                filter: $filter
                pageSize: $pageSize
                currentPage: $currentPage
            ) {
                ...CustomerOrdersFragment
            }
        }
    }
    ${CustomerOrdersFragment}
`;

export const GET_CUSTOMER_ORDERS_DETAIL = gql`
    query GetCustomerOrdersDetail($filter: CustomerOrdersFilterInput!) {
        customer {
            id
            orders(filter: $filter) {
                ...CustomerOrdersFragment
            }
        }
    }
    ${CustomerOrdersDetailFragment}
`;

export default {
    getCustomerOrdersQuery: GET_CUSTOMER_ORDERS,
    getCustomerOrdersDetailQuery: GET_CUSTOMER_ORDERS_DETAIL
};
