import { gql } from "@apollo/client"

export const GET_ALL_ARTICLES = gql`
    query GetArticles {
        getArticles {
            title
            id
            excerpt
            article_type
            createdAt
            author {
                displayname
            }
        }
    }
`
