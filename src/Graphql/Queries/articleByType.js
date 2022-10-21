import { gql } from "@apollo/client"

export const LOAD_ARTICLES = gql`
    query GetArticles($articleType: String) {
        getArticlesByType(article_type: $articleType) {
            id
            title
            body
            excerpt
            imagecredit
            image
            tags
            article_type
            category
            age_group
            createdAt
            author {
                displayname
            }
        }
    }
`
