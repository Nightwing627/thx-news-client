export default function ArticleFeed({ data }) {
    const featuredArticle = data.getArticlesByType[0]
    
    return (
        <div className="grid w-full p-4 border-2 grid-cols-articleFeeds border-base-200 max-h-[700px]">
            {/* FEATURED ARTICLE */}
            <div className="flex gap-8   max-h-[65vh]">
                <img
                    src={featuredArticle.image}
                    alt={featuredArticle.excerpt}
                    className="w-1/2 aspect-square"
                />
                <span className="space-y-2">
                    <h3>{featuredArticle.title}</h3>
                    <p>{featuredArticle.excerpt}</p>
                    <button className="btn btn-primary">
                        Continue Reading...
                    </button>
                </span>
            </div>

            {/* FEATURED ARTICLE END */}

            {/* SIDE FEED */}
            <div className="flex flex-wrap gap-2">
                {data.getArticlesByType.slice(2).map((article) => (
                    <div
                        key={article.id}
                        className="flex flex-col items-center p-4 rounded-md bg-base-200 w-52 h-52"
                    >
                        <img
                            className="w-32 aspect-square"
                            src={article.image}
                            alt={article.excerpt}
                        />
                        <div>
                            <p className="text-sm">{article.excerpt}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* SIDE FEED END */}
        </div>
    )
}
