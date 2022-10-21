import { useContext, useState } from "react"
import { AuthContext } from "../context/authContext"
import { useForm } from "../utils/hooks"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "@apollo/client"
import { Link, useNavigate } from "react-router-dom"

const LOGIN_USER = gql`
    mutation login($loginInput: LoginInput) {
        loginUser(loginInput: $loginInput) {
            username
            password
            token
        }
    }
`

function Login(props) {
    let navigate = useNavigate()
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState([])

    function loginUserCallback() {
        loginUser()
    }

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: ""
    })

    const [loginUser] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData } }) {
            context.login(userData)
            navigate("/")
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
        },
        variables: { loginInput: values }
    })

    return (
        <div className="flex items-center justify-center h-screen bg-primary">
            <div className="flex flex-row w-full h-full lg:w-2/3 lg:h-2/3">
                <img src="/imgs/login.jpg" alt="news" className="w-1/2" />
                <div className="flex flex-col items-center justify-center w-2/3 bg-neutral">
                    <div>
                        <h2 className="mb-5 text-bold">Sign in to THX News</h2>

                        <div className="mb-5 space-y-6 form-control">
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Username:
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="w-full max-w-xs input input-bordered"
                                    label="username"
                                    name="username"
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Password:
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Type here"
                                    className="w-full max-w-xs input input-bordered"
                                    label="password"
                                    name="password"
                                    onChange={onChange}
                                />
                            </div>

                            <button
                                className="w-1/2 btn btn-primary"
                                variant="contained"
                                color="primary"
                                onClick={onSubmit}
                            >
                                Login
                            </button>
                        </div>
                        {errors.map((error, i) => {
                            return <p key={i}>{error.message}</p>
                        })}
                        <div className="text-sm">
                            Don't have an account yet?{" "}
                            <Link
                                to="/register"
                                className="text-thxBlue hover:text-primary"
                            >
                                Click here to register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
