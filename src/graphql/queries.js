import { gql } from 'apollo-boost';

export const getUser = gql`
    query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            name
            email
            // Add other fields you need
        }
    }
`;
