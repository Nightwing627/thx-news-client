import { useMutation, useQuery } from "@apollo/client"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { EDIT_USER } from "../../Graphql/Mutations/EditUser"
import { GET_USER_PROFILE } from "../../Graphql/Queries/GetUserById"

export default function UserProfile() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [editUser] = useMutation(EDIT_USER)
    const id = user.user_id

    const { error, data, refetch } = useQuery(GET_USER_PROFILE, {
        variables: { id }
    })

    let errorMsg = error

    const [displayname, setDisplayname] = useState()
    const [email, setEmail] = useState()
    const [isLoading, setIsLoading] = useState(true)

    // TEST FOR DATA AND SET LOADING TO FALSE
    useEffect(() => {
        if (data) {
            setIsLoading(false)
            setEmail(data.getUserById.email)
            setDisplayname(data.getUserById.displayname)
        }
    }, [data])

    // HANDLE REFETCHING DATA AFTER FORM SUBMIT
    function handleForm(event) {
        event.preventDefault()

        editUser({
            variables: {
                id: user.user_id,
                editUserInput: {
                    displayname: displayname,
                    email: email
                }
            }
        })

        refetch({
            variables: {
                id: user.user_id
            }
        })

        event.target.reset()
    }

    return (
        <div className="flex flex-col items-center w-full p-5 space-y-4 ">
            <h2>Profile:</h2>

            {/* IF NOT LOGGED IN, SEND TO LOGIN PAGE */}
            {user ? (
                <>
                    <h3 className="">You are logged in as: {user.username}</h3>
                </>
            ) : (
                <>{navigate("/login")}</>
            )}

            {error ? <div className="text-red"> {errorMsg}</div> : <></>}

            <form
                className="max-w-xs p-5 space-y-4 rounded-md bg-base-300 form-control"
                onSubmit={handleForm}
            >
                {/* TEST FOR LOADING STATE */}
                {isLoading ? (
                    <h2 className="text-thxBlue">Loading...</h2>
                ) : (
                    <>
                        <span>
                            <label className="label">
                                <span className="label-text">
                                    Display name:
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder={user.displayname}
                                className="w-full max-w-xs placeholder:text-thxBlue input input-bordered"
                                onChange={(event) => {
                                    setDisplayname(event.target.value)
                                }}
                                onFocus={(event) => {
                                    event.target.placeholder = ""
                                }}
                                onBlur={(event) => {
                                    if (!event.target.value) {
                                        event.target.placeholder = displayname
                                    } else {
                                        event.target.placeholder =
                                            event.target.value
                                    }
                                }}
                            />
                            <label className="label">
                                <span className="label-text-alt text-primary">
                                    The name articles will be credited to.
                                    Should be different from username.
                                </span>
                            </label>
                        </span>

                        <span>
                            <label className="label">
                                <span className="label-text">E-Mail:</span>
                            </label>
                            <input
                                type="text"
                                className="w-full max-w-xs input input-bordered placeholder:text-thxBlue"
                                placeholder={email}
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
                                onFocus={(event) => {
                                    event.target.placeholder = ""
                                }}
                                onBlur={(event) => {
                                    if (!event.target.value) {
                                        event.target.placeholder = email
                                    } else {
                                        event.target.placeholder =
                                            event.target.value
                                    }
                                }}
                            />
                            <label className="label">
                                <span className="label-text-alt text-primary">
                                    Only staff can see your email address.
                                </span>
                            </label>
                        </span>

                        <button
                            className="btn btn-success text-neutral"
                            type="submit"
                        >
                            Save
                        </button>
                    </>
                )}
            </form>
        </div>
    )
}
