import { Link } from "react-router-dom"

export default function HomeFeed(data) {
    const featuredArticle = data.data[0]
    
    return (
        <div className="grid w-full p-4 border-2 grid-cols-articleFeeds border-base-200">
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
                    <Link
                        to={`/article/${featuredArticle.id}`}
                        state={{ data: featuredArticle }}
                    >
                        <button className="rounded-md btn-md btn-primary">
                            Continue Reading...
                        </button>
                    </Link>
                </span>
            </div>

            {/* FEATURED ARTICLE END */}

            {/* SIDE FEED */}
            <div className="flex flex-wrap gap-2">
                {data.data.slice(2).map((article) => (
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
                            <Link
                                to={`/article/${article.id}`}
                                state={{ data: article }}
                            >
                                <p className="text-sm hover:text-thxBlue">
                                    {article.excerpt} Lorem ipsum dolor sit amet
                                    consectetur adipisicing elit. Minima, sint?
                                </p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {/* SIDE FEED END */}
        </div>
    )
}
