import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import "./tiptap.css"
import { BiUnlink } from "react-icons/bi"
import { BsFileImageFill, BsParagraph, BsBlockquoteLeft } from "react-icons/bs"
import { MdHorizontalRule } from "react-icons/md"
import {
    AiOutlineBold,
    AiOutlineItalic,
    AiOutlineUnderline,
    AiOutlineStrikethrough,
    AiFillCode,
    AiOutlineLink,
    AiOutlineClear,
    AiOutlineUnorderedList,
    AiOutlineOrderedList,
    AiOutlineUndo,
    AiOutlineRedo
} from "react-icons/ai"

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null
    }

    const addImage = () => {
        const url = window.prompt("URL")

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href
        const url = window.prompt("URL", previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run()

            return
        }

        // update link
        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run()
    }

    return (
        <div className="flex flex-wrap gap-2 p-2 border-b-2 bg-base-100 border-grey-500">
            {/* BOLD */}
            <span className="tooltip" data-tip="Bold">
                <button
                    data-tip="hello"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={
                        editor.isActive("bold")
                            ? "is-active btn btn-success"
                            : " btn btn-primary"
                    }
                >
                    <AiOutlineBold className="text-lg" />
                </button>
            </span>

            {/* Italic */}
            <span className="tooltip" data-tip="Italic">
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={
                        editor.isActive("italic")
                            ? "is-active btn btn-success"
                            : " btn btn-primary"
                    }
                >
                    <AiOutlineItalic className="text-lg" />
                </button>
            </span>

            {/* Underline */}
            <span className="tooltip" data-tip="Underline">
                <button
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    className={
                        editor.isActive("underline")
                            ? "is-active btn btn-success"
                            : " btn btn-primary"
                    }
                >
                    <AiOutlineUnderline className="text-lg" />
                </button>
            </span>

            {/* Strike */}
            <span className="tooltip" data-tip="Strike">
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={
                        editor.isActive("strike")
                            ? "is-active btn btn-success"
                            : " btn btn-primary"
                    }
                >
                    <AiOutlineStrikethrough className="text-lg" />
                </button>
            </span>

            {/* Code */}
            <span className="tooltip" data-tip="Code">
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={
                        editor.isActive("code")
                            ? "is-active btn btn-success"
                            : " btn btn-primary"
                    }
                >
                    <AiFillCode className="text-lg" />
                </button>
            </span>

            {/* Set Link */}

            <span className="tooltip" data-tip="Link">
                <button
                    onClick={setLink}
                    className="btn btn-primary active:btn-success"
                >
                    <AiOutlineLink className="text-lg" />
                </button>
            </span>

            {/* Unset Link */}
            <span className="tooltip" data-tip="Link">
                <button
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    className="btn btn-primary active:btn-success"
                >
                    <BiUnlink className="text-lg" />
                </button>
            </span>

            {/* Remove Format */}
            <span className="tooltip" data-tip="Remove Format">
                <button
                    onClick={() => editor.chain().focus().clearNodes().run()}
                    className="btn btn-primary active:btn-success"
                >
                    <AiOutlineClear className="text-lg" />
                </button>
            </span>

            {/* Paragraph */}
            <span className="tooltip" data-tip="Paragraph">
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={
                        editor.isActive("paragraph")
                            ? "is-active btn btn-success"
                            : " btn btn-primary"
                    }
                >
                    <BsParagraph />
                </button>
            </span>

            {/* Add Image */}
            <span className="tooltip" data-tip="Add Image">
                <button onClick={addImage} className="btn btn-primary">
                    <BsFileImageFill className="text-lg" />
                </button>
            </span>

            {/* H1 */}
            <span className="tooltip" data-tip="Heading 1">
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 1 })
                            ? "is-active btn btn-success text-lg"
                            : " btn btn-primary text-lg"
                    }
                >
                    H1
                </button>
            </span>

            {/* H2 */}
            <span className="tooltip" data-tip="Heading 2">
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 2 })
                            ? "is-active btn btn-success text-lg"
                            : " btn btn-primary text-lg"
                    }
                >
                    H2
                </button>
            </span>

            {/* H3 */}
            <span className="tooltip" data-tip="Heading 3">
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 3 })
                            ? "is-active btn btn-success text-lg"
                            : " btn btn-primary text-lg"
                    }
                >
                    H3
                </button>
            </span>

            {/* H4 */}
            <span className="tooltip" data-tip="Heading 4">
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 4 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 4 })
                            ? "is-active btn btn-success text-lg"
                            : " btn btn-primary text-lg"
                    }
                >
                    H4
                </button>
            </span>

            {/* Unordered List */}
            <span className="tooltip" data-tip="List">
                <button
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={
                        editor.isActive("bulletList")
                            ? "is-active btn btn-success"
                            : " btn btn-primary"
                    }
                >
                    <AiOutlineUnorderedList className="text-lg" />
                </button>
            </span>

            {/* Ordered List */}
            <span className="tooltip" data-tip="Numbered List">
                <button
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                        editor.isActive("orderedList")
                            ? "is-active btn btn-success"
                            : " btn btn-primary"
                    }
                >
                    <AiOutlineOrderedList className="text-lg" />
                </button>
            </span>

            {/* Block Quote */}
            <span className="tooltip" data-tip="Block Quote">
                <button
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    className={
                        editor.isActive("blockquote")
                            ? "is-active btn btn-success"
                            : " btn btn-primary"
                    }
                >
                    <BsBlockquoteLeft className="text-lg" />
                </button>
            </span>

            {/* Rule */}
            <span className="tooltip" data-tip="Horizontal Rule">
                <button
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                    className="btn btn-primary active:btn-success"
                >
                    <MdHorizontalRule className="text-lg" />
                </button>
            </span>

            {/* Undo */}
            <span className="tooltip" data-tip="Undo">
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    className="btn btn-primary active:btn-success"
                >
                    <AiOutlineUndo className="text-lg" />
                </button>
            </span>

            {/* Redo */}
            <span className="tooltip" data-tip="Redo">
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    className="btn btn-primary active:btn-success"
                >
                    <AiOutlineRedo className="text-lg" />
                </button>
            </span>
        </div>
    )
}

// Functions

const TipTap = ({ setArticleBody, editBody }) => {
    const editor = useEditor({
        extensions: [StarterKit, Underline, Image, Link],
        content: editBody,
        onUpdate: ({ editor, editBody }) => {
            const body = editor.getHTML()
            setArticleBody(body)
        }
    })

    return (
        <div className="min-h-[30rem] w-2/3 border-2 border-gray-600 bg-neutral">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className=" min-h-[30rem]" />
        </div>
    )
}

export default TipTap
