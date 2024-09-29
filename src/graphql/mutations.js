import { gql } from 'apollo-boost';

export const updateUser = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            name
            email
            // Add other fields you need
        }
    }
`;
