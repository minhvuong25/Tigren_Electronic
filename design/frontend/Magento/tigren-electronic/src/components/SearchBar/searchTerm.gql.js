import { gql } from '@apollo/client';

export const GET_POPULAR_SEARCH_TERMS = gql`
    query getPopularSearchTerms {
        popularSearchTerms {
            items {
                query_text
                ratio
            }
        }
    }
`;
