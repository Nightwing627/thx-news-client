export default function ArticleFeedHeadline({ data }) {
    const headData = data.getArticlesByType[0]
    const imgURL = headData.image
    return (
        <div className="flex justify-center w-full  lg:h-[70vh] h-1/2">
            <div
                className="flex items-end w-5/6  bg-center bg-cover hero bg-no-repeat"
                style={{
                    backgroundImage: `url(${imgURL})`
                }}
            >
                {/* <div className="hero-overlay bg-opacity-30"></div> */}
                <div className="p-3 text-neutral-content">
                    <div className="max-w-md p-12 rounded-md bg-neutral bg-opacity-90">
                        <h1 className="mb-5 text-3xl font-bold">
                            {headData.title}
                        </h1>

                        <p className="mb-5">{headData.excerpt}</p>

                        <p className="mb-5">
                            Article by: {headData.author.displayname}
                        </p>
                        {headData.imagecredit ? (
                            <p className="mb-5 text-sm">
                                Image Credit: {headData.imagecredit}
                            </p>
                        ) : (
                            <p className="mb-5 text-sm">
                                Image Credit: {headData.author.displayname}
                            </p>
                        )}

                        <button className="rounded-md btn-md btn-primary">
                            Continue Reading...
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
