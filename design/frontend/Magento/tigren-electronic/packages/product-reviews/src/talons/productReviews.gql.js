import { gql } from '@apollo/client';

export const GET_STORE_CONFIG_DATA = gql`
    query getStoreConfigData {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        storeConfig {
            store_code
            product_reviews_enabled
            allow_guests_to_write_product_reviews
        }
    }
`;

export const GET_PRODUCT_REVIEWS_QUERY = gql`
    query getProductReviewsProductPage(
        $urlKey: String!
        $pageSize: Int!
        $currentPage: Int!
    ) {
        products(filter: { url_key: { eq: $urlKey } }) {
            items {
                id
                uid
                reviews(pageSize: $pageSize, currentPage: $currentPage) {
                    items {
                        summary
                        text
                        nickname
                        created_at
                        average_rating
                        ratings_breakdown {
                            name
                            value
                        }
                    }
                    page_info {
                        total_pages
                        current_page
                    }
                }
            }
        }
    }
`;

export const PRODUCT_REVIEW_RATINGS_META_DATA = gql`
    query productReviewRatingsMetadata {
        productReviewRatingsMetadata {
            items {
                id
                name
                values {
                    value_id
                    value
                }
            }
        }
    }
`;

export const ADD_PRODUCT_REVIEWS = gql`
    mutation addProductReviews(
        $sku: String!
        $nickname: String!
        $summary: String!
        $text: String!
        $ratings: [ProductReviewRatingInput!]!
    ) {
        createProductReview(
            input: {
                sku: $sku
                nickname: $nickname
                summary: $summary
                text: $text
                ratings: $ratings
            }
        ) {
            review {
                summary
                text
                nickname
                created_at
                average_rating
                ratings_breakdown {
                    name
                    value
                }
            }
        }
    }
`;

export default {
    getReviewStoreConfigData: GET_STORE_CONFIG_DATA,
    addProductReviews: ADD_PRODUCT_REVIEWS,
    getProductReviewsProductPage: GET_PRODUCT_REVIEWS_QUERY,
    productReviewRatingsMetadata: PRODUCT_REVIEW_RATINGS_META_DATA
};
