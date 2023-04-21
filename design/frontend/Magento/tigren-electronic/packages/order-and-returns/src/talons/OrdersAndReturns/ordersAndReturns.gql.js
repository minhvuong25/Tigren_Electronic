import { gql } from '@apollo/client';

const SUBMIT_GUEST_VIEW_QUERY = gql`
    query salesGuestView(
        $oar_order_id: String!
        $oar_type: String!
        $oar_email: String
        $oar_zip: String
    ) {
        trackingOrder(
            order_number: $oar_order_id
            tracking: {
                oar_type: $oar_type
                oar_email: $oar_email
                oar_zip: $oar_zip
            }
        ) {
            id
            order_date
            status
            number
            increment_id
            order_number
            created_at
            grand_total
            order_date
            carrier
            items {
                id
                product_name
                product_sku
                product_url_key
                product_type
                status
                discounts {
                    amount {
                        value
                        currency
                    }
                    label
                }
                product_sale_price {
                    value
                    currency
                }
                selected_options {
                    label
                    value
                }
                entered_options {
                    label
                    value
                }
                quantity_ordered
                quantity_shipped
                quantity_refunded
                quantity_invoiced
                quantity_canceled
                quantity_returned
            }
            total {
                subtotal {
                    value
                    currency
                }
                discounts {
                    amount {
                        value
                        currency
                    }
                }
                total_tax {
                    value
                    currency
                }
                shipping_handling {
                    total_amount {
                        value
                        currency
                    }
                }
                total_shipping {
                    value
                    currency
                }
                grand_total {
                    value
                    currency
                }
            }
            invoices {
                id
                number
                total {
                    subtotal {
                        value
                        currency
                    }
                    discounts {
                        amount {
                            value
                            currency
                        }
                    }
                    shipping_handling {
                        total_amount {
                            value
                            currency
                        }
                    }
                    grand_total {
                        value
                        currency
                    }
                }
            }
            shipping_address {
                firstname
                lastname
                region
                country_code
                street
                company
                telephone
                postcode
                city
            }
            billing_address {
                firstname
                lastname
                region
                country_code
                street
                company
                telephone
                postcode
                city
            }
            payment_methods {
                name
                type
            }
            shipments {
                id
                number
                tracking {
                    title
                    carrier
                    number
                }
                items {
                    id
                    order_item {
                        id
                        product_name
                        product_sku
                        product_url_key
                        product_type
                        status
                        discounts {
                            amount {
                                value
                                currency
                            }
                            label
                        }
                        product_sale_price {
                            value
                            currency
                        }
                        selected_options {
                            label
                            value
                        }
                        entered_options {
                            label
                            value
                        }
                        quantity_ordered
                        quantity_shipped
                        quantity_refunded
                        quantity_invoiced
                        quantity_canceled
                        quantity_returned
                    }
                    quantity_shipped
                    product_name
                    product_sku
                }
            }
            shipping_method
        }
    }
`;

const GET_PRODUCT_THUMBNAILS_BY_URL_KEY = gql`
    query GetProductThumbnailsByURLKey($urlKeys: [String!]!) {
        products(filter: { url_key: { in: $urlKeys } }) {
            items {
                id
                uid
                sku
                thumbnail {
                    label
                    url
                }
                url_key
                url_suffix
            }
        }
    }
`;

export default {
    submitGuestViewQuery: SUBMIT_GUEST_VIEW_QUERY,
    getProductThumbnailsByUrlKey: GET_PRODUCT_THUMBNAILS_BY_URL_KEY
};
