import { useState } from "react"
import { useForm } from "../utils/hooks"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "@apollo/client"
import { Link, useNavigate } from "react-router-dom"

const REGISTER_USER = gql`
    mutation Mutation($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput) {
            email
            username
            token
        }
    }
`

const Register = (props) => {
    let navigate = useNavigate()
    const [errors, setErrors] = useState([])

    function registerUserCallback(params) {
        registerUser()
    }

    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: "",
        displayname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [registerUser] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData } }) {
            navigate("/login")
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
        },
        variables: { registerInput: values }
    })
    return (
        <div className="flex items-center justify-center h-screen bg-primary">
            <div className="flex flex-row w-full h-full lg:w-2/3 lg:h-auto">
                <img src="/imgs/register.jpg" alt="news" className="w-1/2" />
                <div className="flex flex-col items-center justify-center w-2/3 p-8 bg-neutral">
                    <div>
                        <h2 className="mb-5 text-bold">
                            Signup to to THX News
                        </h2>

                        <div className="mb-5 space-y-6 form-control">
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Username*:
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="w-full max-w-xs input input-bordered"
                                    label="username"
                                    name="username"
                                    required
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Display Name:
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="w-full max-w-xs input input-bordered"
                                    label="displayname"
                                    name="displayname"
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">Email*:</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Type here"
                                    className="w-full max-w-xs input input-bordered"
                                    label="email"
                                    name="email"
                                    required
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Password*:
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Type here"
                                    className="w-full max-w-xs input input-bordered"
                                    label="password"
                                    name="password"
                                    required
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Confirm Password*:
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Type here"
                                    className="w-full max-w-xs input input-bordered"
                                    label="confirmPassword"
                                    name="confirmPassword"
                                    required
                                    onChange={onChange}
                                />
                            </div>

                            <button
                                className="w-1/2 btn btn-primary"
                                variant="contained"
                                color="primary"
                                onClick={onSubmit}
                            >
                                Register
                            </button>
                        </div>
                        {errors.map((error, i) => {
                            return <p key={i}>{error.message}</p>
                        })}
                        <div className="text-sm">
                            Already have an account?
                            <Link
                                to="/login"
                                className="text-thxBlue hover:text-primary"
                            >
                                Click here to login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
