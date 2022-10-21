import { gql } from "@apollo/client"

export const EDIT_ARTICLE = gql`
    mutation EditArticle($id: ID!, $editArticleInput: EditArticleInput) {
        editArticle(ID: $id, editArticleInput: $editArticleInput)
    }
`
