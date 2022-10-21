import { useContext, useState } from "react"
import { AuthContext } from "../../../context/authContext"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "@apollo/client"
import TiptapEditor from "../TextEditor/TitapEditor"
import { useNavigate } from "react-router-dom"

const CREATE_NEWS_ARTICLE = gql`
    mutation CreateEduArticle($eduArticleInput: EduArticleInput) {
        createEduArticle(eduArticleInput: $eduArticleInput) {
            title
            body
            excerpt
            image
            imagecredit
            tags
            age_group
            article_type
            category
            published
        }
    }
`

function CreateEduArticle(props) {
    const [articleBody, setArticleBody] = useState("")
    const [articleExcerpt, setArticleExcerpt] = useState("")
    const [articleTitle, setArticleTitle] = useState("")
    const [articleImage, setArticleImage] = useState("")
    const [articleAgeGroup, setArticleAgeGroup] = useState("")
    const [articleImageCredit, setArticleImageCredit] = useState("")
    const [articleTags, setArticleTags] = useState([])
    const [articleCategory, setArticleCategory] = useState("")
    const published = false
    const article_type = "Education"
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
                Create Edu Article
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
                    <option value={"Jobs"}>Jobs</option>
                    <option value={"Medicine"}>Medicine</option>
                    <option value={"Programming"}>Programming</option>
                </select>

                {/* AGE GROUP */}
                <select
                    className="w-full max-w-lg bg-white select"
                    name="articleAgeGroup"
                    defaultValue={"default"}
                    onChange={(event) => {
                        setArticleAgeGroup(event.target.value)
                    }}
                >
                    <option value="default" disabled>
                        Choose Age Group:
                    </option>
                    <option value={"12-18"}>12-18</option>
                    <option value={"19-45"}>19-45</option>
                    <option value={"46-80"}>46-80+</option>
                </select>

                {/* BODY EDITOR */}
                <TiptapEditor setArticleBody={setArticleBody} />

                {/* AUTH CHECK */}
                {staffRoles.includes(user.role) && (
                    <button
                        className="btn btn-success text-neutral"
                        onClick={() => {
                            createArticle({
                                variables: {
                                    eduArticleInput: {
                                        title: articleTitle,
                                        image: articleImage,
                                        imagecredit: articleImageCredit,
                                        excerpt: articleExcerpt,
                                        body: articleBody,
                                        age_group: articleAgeGroup,
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

export default CreateEduArticle
