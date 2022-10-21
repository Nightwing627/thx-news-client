import { useMutation, useQuery } from "@apollo/client"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/authContext"

import { useParams } from "react-router-dom"
import { EDIT_ARTICLE } from "../../../Graphql/Mutations/EditArticle"
import { GET_ARTICLE_BY_ID } from "../../../Graphql/Queries/GetArticleById"
import TiptapEditor from "../TextEditor/TitapEditor"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"

export default function EditArticle() {
    // ROLE AUTH
    const staffRoles = ["Journalist", "Editor", "Admin", "Superuser"]
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const unauth = () => {
        navigate("/unauthorized")
    }

    if (!staffRoles.includes(user.role)) {
        unauth()
    }

    const { id } = useParams()

    const [articleBody, setArticleBody] = useState("")
    const [articleExcerpt, setArticleExcerpt] = useState("")
    const [articleTitle, setArticleTitle] = useState("")
    const [articleImage, setArticleImage] = useState("")
    const [articleImageCredit, setArticleImageCredit] = useState("")
    const [articleTags, setArticleTags] = useState("No tags")
    const [articleCategory, setArticleCategory] = useState("")
    const [published, setPublished] = useState(false)
    const editBody = useRef()
    const [tipState, setTipState] = useState()

    const { loading, error, data } = useQuery(GET_ARTICLE_BY_ID, {
        variables: { id }
    })

    const [editArticle] = useMutation(EDIT_ARTICLE)

    useEffect(() => {
        if (data) {
            const artData = data.getArticleById

            setArticleExcerpt(artData.excerpt)
            setArticleTitle(artData.title)
            setArticleImage(artData.image)
            setArticleImageCredit(artData.imagecredit)
            setArticleCategory(artData.category)
            setPublished(artData.published)
            editBody.current = artData.body

            if (artData.tags === " ") {
                setArticleTags("Tags")
            } else {
                setArticleTags(artData.tags.join(", "))
            }
        }
    }, [data])

    useEffect(() => {
        setTipState(
            <TiptapEditor
                setArticleBody={setArticleBody}
                editBody={editBody.current}
            />
        )
    }, [editBody])
    return (
        <div>
            <h2>Edit Article:</h2>

            {loading ? (
                <h2>Loading, please wait...</h2>
            ) : (
                <div className="h-full ">
                    <h2 className="w-full pt-6 text-center bg-base-200">
                        You are editing "{articleTitle}"
                    </h2>
                    <div className="flex flex-col items-center pt-4 pb-10 space-y-2 bg-base-200">
                        {/* TITLE */}
                        <input
                            type="text"
                            placeholder={articleTitle}
                            className="w-full max-w-lg bg-white placeholder:text-neutral-content input input-bordered"
                            onChange={(event) => {
                                setArticleTitle(event.target.value)
                            }}
                            onFocus={(event) => {
                                event.target.placeholder = ""
                            }}
                            onBlur={(event) => {
                                if (!event.target.value) {
                                    event.target.placeholder = articleTitle
                                } else {
                                    event.target.placeholder =
                                        event.target.value
                                }
                            }}
                        />

                        {/* IMAGE */}
                        <input
                            type="text"
                            placeholder={articleImage}
                            className="w-full max-w-lg bg-white placeholder:text-neutral-content input input-bordered"
                            onChange={(event) => {
                                setArticleTitle(event.target.value)
                            }}
                            onFocus={(event) => {
                                event.target.placeholder = ""
                            }}
                            onBlur={(event) => {
                                if (!event.target.value) {
                                    event.target.placeholder = articleImage
                                } else {
                                    event.target.placeholder =
                                        event.target.value
                                }
                            }}
                        />

                        {/* IMAGE CREDIT */}
                        <input
                            type="text"
                            placeholder={articleImageCredit}
                            className="w-full max-w-lg bg-white placeholder:text-neutral-content input input-bordered"
                            onChange={(event) => {
                                setArticleTitle(event.target.value)
                            }}
                            onFocus={(event) => {
                                event.target.placeholder = ""
                            }}
                            onBlur={(event) => {
                                if (!event.target.value) {
                                    event.target.placeholder =
                                        articleImageCredit
                                } else {
                                    event.target.placeholder =
                                        event.target.value
                                }
                            }}
                        />

                        {/* EXCERPT */}
                        <input
                            type="text"
                            placeholder={articleExcerpt}
                            className="w-full max-w-lg bg-white placeholder:text-neutral-content input input-bordered"
                            onChange={(event) => {
                                setArticleTitle(event.target.value)
                            }}
                            onFocus={(event) => {
                                event.target.placeholder = ""
                            }}
                            onBlur={(event) => {
                                if (!event.target.value) {
                                    event.target.placeholder = articleExcerpt
                                } else {
                                    event.target.placeholder =
                                        event.target.value
                                }
                            }}
                        />

                        {/* TAGS */}

                        <input
                            type="text"
                            placeholder={!articleTags ? "No Tags" : articleTags}
                            className="w-full max-w-lg bg-white placeholder:text-neutral-content input input-bordered"
                            onBlur={(event) => {
                                let tags = event.target.value

                                setArticleTags(tags.split(", "))
                            }}
                        />

                        {/* CATEGORY */}
                        <select
                            className="w-full max-w-lg bg-white select"
                            name="articleTopic"
                            defaultValue={"default"}
                            onChange={(event) => {
                                setArticleTitle(event.target.value)
                            }}
                            onBlur={(event) => {
                                if (!event.target.value) {
                                    event.target.placeholder = articleCategory
                                } else {
                                    event.target.placeholder =
                                        event.target.value
                                }
                            }}
                        >
                            <option value="default" disabled>
                                Category is: {articleCategory}
                            </option>
                            <option value={"Sports"}>Sports</option>
                            <option value={"Politics"}>Politics</option>
                            <option value={"War"}>War</option>
                        </select>
                        {tipState}

                        {staffRoles.includes(user.role) && (
                            <button
                                className="btn btn-success text-neutral"
                                onClick={() => {
                                    editArticle({
                                        variables: {
                                            id: id,
                                            editArticleInput: {
                                                title: articleTitle,
                                                image: articleImage,
                                                imagecredit: articleImageCredit,
                                                excerpt: articleExcerpt,
                                                body: articleBody,
                                                tags: articleTags,
                                                category: articleCategory,
                                                published: published
                                            }
                                        }
                                    })
                                }}
                            >
                                Post
                            </button>
                        )}
                    </div>
                </div>
                // END IF
            )}
        </div>
    )
}
