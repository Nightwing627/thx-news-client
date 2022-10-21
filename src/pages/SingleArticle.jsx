import parse from "html-react-parser"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

const SingleArticle = () => {
    const { id } = useParams()

    const location = useLocation()
    const { data } = location.state

    const [articleBody, setArticleBody] = useState("")
    const [articleTitle, setArticleTitle] = useState("")
    const [articleImage, setArticleImage] = useState("")
    const [articleImageCredit, setArticleImageCredit] = useState("")
    const [articleCategory, setArticleCategory] = useState("")
    const [loading, setLoading] = useState(true)

    console.log("data :>> ", data)

    useEffect(() => {
        if (data) {
            setArticleBody(data.body)
            setArticleTitle(data.title)
            setArticleImage(data.image)
            setArticleImageCredit(data.imagecredit)
            setArticleCategory(data.category)
            setLoading(false)
        }
    }, [data])

    return (
        <div className="flex flex-col items-center bg-neutral">
            <div className="flex flex-col items-center w-full min-h-screen mt-5 ">
                {
                    loading ? (
                        <h2>Loading, please wait...</h2>
                    ) : (
                        <div className="grid w-3/4 min-h-screen grid-rows-singlArticle gap-y-4">
                            {/* TITLE */}
                            <div className="text-center">
                                <h1>DATA: {data.title}</h1>
                            </div>
                            {/* TITLE END */}

                            {/* HEADER IMAGE */}
                            <div className="w-full mb-6 bg-purple-500">
                                <img
                                    src={data.image}
                                    alt={data.imagecredit}
                                    className="w-full h-full"
                                />
                                <p className="text-sm">
                                    Image by: {data.imagecredit}
                                </p>
                            </div>
                            {/* END HEADER IMAGE */}

                            <div className="space-y-3">{parse(data.body)}</div>
                        </div>
                    )
                    // END IF
                }
            </div>
        </div>
    )
}

export default SingleArticle
