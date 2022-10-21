import { gql } from "@apollo/client"

export const GET_USER_PROFILE = gql`
    query GetUserById($id: ID!) {
        getUserById(ID: $id) {
            username
            displayname
            email
            articles {
                title
            }
        }
    }
`
