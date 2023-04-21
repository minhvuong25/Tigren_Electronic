import { gql } from '@apollo/client';

export const GET_CUSTOMER_REVIEWS = gql`
    query getCustomerReviews($pageSize: Int!, $currentPage: Int!) {
        customer {
            reviews(pageSize: $pageSize, currentPage: $currentPage) {
                items {
                    product {
                        uid
                        sku
                        name
                    }
                    review_id
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
`;

export const GET_DETAIL_REVIEW = gql`
    query($idReview: String!) {
        getReviewDetail(review_id: $idReview) {
            review_id
            created_at
            entity_id
            product {
                uid
                id
                name
                rating_summary
                review_count
                url_key
                small_image {
                    url
                    label
                }
            }
            detail_id
            title
            detail
            customer_id
            guest_email
            average_rating
            nickname
        }
    }
`;

export default {
    getCustomerReviews: GET_CUSTOMER_REVIEWS,
    getDetailReview: GET_DETAIL_REVIEW
};
