import { gql } from "@apollo/client"

export const GET_ARTICLE_BY_ID = gql`
    query GetArticleById($id: ID!) {
        getArticleById(ID: $id) {
            title
            body
            excerpt
            imagecredit
            image
            tags
            category
            age_group
            published
        }
    }
`
