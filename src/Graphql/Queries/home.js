import { gql } from "@apollo/client"

export const LOAD_ARTICLES = gql`
    query GetArticles {
        getArticles {
            id
            title
            body
            excerpt
            image
            imagecredit
            article_type
            author {
                displayname
            }
        }
    }
`
