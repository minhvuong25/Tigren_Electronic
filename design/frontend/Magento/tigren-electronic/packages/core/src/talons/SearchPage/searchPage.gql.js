import { gql } from '@apollo/client';

export const GET_PAGE_SIZE = gql`
    query getPageSize {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        storeConfig {
            store_code
            grid_per_page
        }
    }
`;

export const GET_PRODUCT_FILTERS_BY_SEARCH = gql`
    query getProductFiltersBySearch($search: String!) {
        products(search: $search) {
            aggregations {
                label
                count
                attribute_code
                options {
                    label
                    value
                }
                position
            }
        }
    }
`;

export const PRODUCT_SEARCH = gql`
    query ProductSearch(
        $currentPage: Int = 1
        $inputText: String!
        $pageSize: Int = 6
        $filters: ProductAttributeFilterInput!
        $sort: ProductAttributeSortInput
    ) {
        products(
            currentPage: $currentPage
            pageSize: $pageSize
            search: $inputText
            filter: $filters
            sort: $sort
        ) {
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
                stock_status
                __typename
                url_key
                url_rewrites {
                    url
                }
                type_id
            }
            page_info {
                total_pages
            }
            total_count
        }
    }
`;

export const GET_FILTER_INPUTS = gql`
    query GetFilterInputsForSearch {
        __type(name: "ProductAttributeFilterInput") {
            inputFields {
                name
                type {
                    name
                }
            }
        }
    }
`;

export const GET_SEARCH_AVAILABLE_SORT_METHODS = gql`
    query getSearchAvailableSortMethods($search: String!) {
        products(search: $search) {
            sort_fields {
                options {
                    label
                    value
                }
            }
        }
    }
`;

export default {
    getFilterInputsQuery: GET_FILTER_INPUTS,
    getPageSize: GET_PAGE_SIZE,
    getProductFiltersBySearchQuery: GET_PRODUCT_FILTERS_BY_SEARCH,
    getSearchAvailableSortMethods: GET_SEARCH_AVAILABLE_SORT_METHODS,
    productSearchQuery: PRODUCT_SEARCH
};
