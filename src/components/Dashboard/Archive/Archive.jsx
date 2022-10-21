// TODO
// By default this should show only the articles related to the user.
// A button will allow editors to load ALL articles

import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GET_ALL_ARTICLES } from "../../../Graphql/Queries/AllArticles"

export default function Archive() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const { loading, error, data } = useQuery(GET_ALL_ARTICLES)
    // const { loading, error, data } = useLazyQuery(GET_ALL_ARTICLES)

    useEffect(() => {
        if (data !== undefined) {
            setIsLoading(false)
        }
    }, [data])

    return (
        <div className="flex flex-col items-center p-5 space-y-3">
            <h2 className="text-primary">Archive:</h2>
            <div className="w-2/3 overflow-x-auto">
                <table className="table w-full border-2 bg-base-300 border-base-300">
                    {/* <!-- head --> */}
                    <thead>
                        <tr className="text-primary bold">
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Timestamp</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {/* <!-- row 1 --> */}

                    <tbody>
                        {loading ? (
                            <tr cln="text-primary">
                                <td>Loading...</td>
                            </tr>
                        ) : (
                            <>
                                {data.getArticles.map((artData, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{index}</th>
                                            <td>{artData.title}</td>
                                            <td>
                                                {artData.author.displayname}
                                            </td>
                                            <td>{Date(artData.createdAt)}</td>
                                            <td className="space-x-2">
                                                <Link
                                                    to={`/article/edit/${artData.id}`}
                                                >
                                                    <button className="btn-sm btn-primary">
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button className="btn-sm btn-error">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
