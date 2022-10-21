import { useQuery } from "@apollo/client"
import ArticleFeed from "../ArticleComponents/ArticleFeed"
import ArticleFeedHeadline from "../ArticleComponents/ArticleFeedHeadline"

import { LOAD_ARTICLES } from "../Graphql/Queries/articleByType"

export default function News() {
    const articleType = "News"

    const { error, loading, data } = useQuery(LOAD_ARTICLES, {
        variables: { articleType }
    })

    function headlineContent() {
        return (
            <div className="">
                <div className="pt-3">
                    {/* Headline */}
                    {loading ? (
                        <h2>Loading...</h2>
                    ) : (
                        <ArticleFeedHeadline data={data} />
                    )}
                </div>

                <div className="px-5">
                    <h2>
                        <u className="decoration-thxBlue">News</u>
                    </h2>
                    {loading ? (
                        <h2>Loading...</h2>
                    ) : (
                        <ArticleFeed data={data} />
                    )}
                </div>
            </div>
        )
    }

    return <div>{headlineContent()}</div>
}
