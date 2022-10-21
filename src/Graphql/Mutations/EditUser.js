import { gql } from "@apollo/client"

export const EDIT_USER = gql`
    mutation EditUser($id: ID!, $editUserInput: EditUserInput) {
        editUser(ID: $id, editUserInput: $editUserInput) {
            displayname
            email
        }
    }
`
