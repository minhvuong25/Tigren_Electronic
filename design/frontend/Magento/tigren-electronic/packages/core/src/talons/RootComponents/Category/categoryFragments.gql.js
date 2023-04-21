import { gql } from '@apollo/client';

export const CategoryFragment = gql`
    fragment CategoryFragment on CategoryTree {
        id
        uid
        meta_title
        image
        meta_keywords
        meta_description
    }
`;

export const ProductsFragment = gql`
    fragment ProductsFragment on Products {
        items {
            id
            uid
            name
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
            sku
            small_image {
                url
            }
            url_rewrites {
                url
            }
            stock_status
            type_id
            url_key
        }
        page_info {
            total_pages
            current_page
        }
        total_count
    }
`;
