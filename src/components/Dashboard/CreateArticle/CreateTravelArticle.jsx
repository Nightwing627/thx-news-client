import { useContext, useState } from "react"
import { AuthContext } from "../../../context/authContext"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "@apollo/client"
import TiptapEditor from "../TextEditor/TitapEditor"
import { useNavigate } from "react-router-dom"

const CREATE_NEWS_ARTICLE = gql`
    mutation CreateTravelArticle($travelArticleInput: TravelArticleInput) {
        createTravelArticle(travelArticleInput: $travelArticleInput) {
            title
            body
            excerpt
            image
            imagecredit
            tags
            article_type
            category
            published
        }
    }
`

function CreateTravelArticle(props) {
    const [articleBody, setArticleBody] = useState("")
    const [articleExcerpt, setArticleExcerpt] = useState("")
    const [articleTitle, setArticleTitle] = useState("")
    const [articleImage, setArticleImage] = useState("")
    const [articleImageCredit, setArticleImageCredit] = useState("")
    const [articleTags, setArticleTags] = useState([])
    const [articleCategory, setArticleCategory] = useState("")
    const published = false
    const article_type = "Travel"
    const { user } = useContext(AuthContext)
    const author = user.user_id

    // ROLE AUTH
    const staffRoles = ["Journalist", "Editor", "Admin", "Superuser"]
    const navigate = useNavigate()

    const unauth = () => {
        navigate("/unauthorized")
    }

    if (!staffRoles.includes(user.role)) {
        unauth()
    }

    /*
    NOTES:
    article_type will be a hidden field based on the page you're on,
    this will change to a dropdown when all articles are created from 1 page.

    Published will only be available to Editor role and up

    Author field will be hidden and will be the id of the logged in user from context
Published will also be a hidden field
    */

    const [createArticle] = useMutation(CREATE_NEWS_ARTICLE)

    return (
        <div className="h-full ">
            <h2 className="w-full pt-6 text-center bg-base-200">
                Create Travel Article
            </h2>
            <div className="flex flex-col items-center pt-4 pb-10 space-y-2 bg-base-200">
                {/* TITLE */}
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full max-w-lg bg-white input input-bordered"
                    onChange={(event) => {
                        setArticleTitle(event.target.value)
                    }}
                />

                {/* IMAGE */}
                <input
                    type="text"
                    placeholder="Main Image"
                    className="w-full max-w-lg bg-white input input-bordered"
                    onChange={(event) => {
                        setArticleImage(event.target.value)
                    }}
                />

                {/* IMAGE CREDIT */}
                <input
                    type="text"
                    placeholder="Main Image Credit"
                    className="w-full max-w-lg bg-white input input-bordered"
                    onChange={(event) => {
                        setArticleImageCredit(event.target.value)
                    }}
                />

                {/* EXCERPT */}
                <input
                    type="text"
                    placeholder="Excerpt"
                    className="w-full max-w-lg bg-white input input-bordered"
                    onChange={(event) => {
                        setArticleExcerpt(event.target.value)
                    }}
                />

                {/* TAGS */}
                <input
                    type="text"
                    placeholder="Tags: coming soon, another tag, this is a tag"
                    className="w-full max-w-lg bg-white input input-bordered"
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
                        setArticleCategory(event.target.value)
                    }}
                >
                    <option value="default" disabled>
                        Choose Category:
                    </option>
                    <option value={"Sports"}>Sports</option>
                    <option value={"Politics"}>Politics</option>
                    <option value={"War"}>War</option>
                </select>
                <TiptapEditor setArticleBody={setArticleBody} />

                {staffRoles.includes(user.role) && (
                    <button
                        className="btn btn-success text-neutral"
                        onClick={() => {
                            createArticle({
                                variables: {
                                    travelArticleInput: {
                                        title: articleTitle,
                                        image: articleImage,
                                        imagecredit: articleImageCredit,
                                        excerpt: articleExcerpt,
                                        body: articleBody,
                                        tags: articleTags,
                                        article_type: article_type,
                                        category: articleCategory,
                                        published: published,
                                        author: author
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
    )
}

export default CreateTravelArticle
