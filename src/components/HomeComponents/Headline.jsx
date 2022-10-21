import { Link } from "react-router-dom"

const Headline = ({ data }) => {
    console.log('HEADLINE COMPONENT')
    const headData = data.getArticles[0]

    let imgUrl = headData.image

    const slug = data.getArticles[0].id
    return (
        <div className="flex justify-center w-full  lg:h-[70vh] h-1/2">
            <div
                className="flex items-end w-5/6 h-auto bg-center bg-cover hero"
                style={{
                    backgroundImage: `url(${imgUrl})`
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

                        <Link
                            to={`/article/${slug}`}
                            state={{ data: data.getArticles[0] }}
                        >
                            <button className="rounded-md btn-md btn-primary">
                                Continue Reading...
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Headline
