import { gql } from '@apollo/client';

export const GET_DATA_QUESTION = gql`
    query questions {
        question {
            items {
                entity_id
                title
                customer_name
                content
                created_at
                updated_at
            }
        }
    }
`;
export const DATA_SEARCH_EDIT = gql`
    query questionSearchEdit {
        question_search(id: Int) {
            items {
                title
                customer_name
                content
                created_at
                updated_at
            }
        }
    }
`;

export const CREATE_QUESTION_MUTATION = gql`
    mutation createQuestion(
        $title: String!
        $content: String!
        $customer_name: String!
    ) {
        questionCreate(
            title: $title
            content: $content
            customer_name: $customer_name
        ) {
            success_message
        }
    }
`;

export const DELETE_QUESTION = gql`
    query questionDeleteNotifi {
        question_delete(id: Int) {
            success_message
        }
    }
`;
export default {
    notifidelete: DELETE_QUESTION,
    getdatasearch: DATA_SEARCH_EDIT,
    getQuestion: GET_DATA_QUESTION,
    questionMutation: CREATE_QUESTION_MUTATION
};
