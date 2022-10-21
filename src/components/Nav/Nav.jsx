import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { BsFillPersonFill } from "react-icons/bs"

const Nav = () => {
    const { user, logout } = useContext(AuthContext)
    let navigate = useNavigate()

    const onLogout = () => {
        logout()
        navigate("/")
    }
    return (
        <div className="navbar bg-neutral">
            <div className="navbar-start">
                {/* START MOBLE MENU */}
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex="0"
                        className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link to={"/news"}>News</Link>
                        </li>
                        <li>
                            <Link to={"/education"}>Education</Link>
                        </li>

                        <li>
                            <Link to={"/travel"}>Travel</Link>
                        </li>
                    </ul>
                </div>
                {/* END MOBLE MENU */}

                {/* START LOGO: This applies to all screen sizes */}
                <a className="text-base btn lg:text-xl" href="/">
                    <img
                        src="/imgs/logo-light.jpg"
                        alt="THX logo"
                        className="h-full"
                    />
                </a>
                {/* END LOGO */}
            </div>

            {/* START NON-MOBLE MENU */}
            <div className="hidden navbar-center lg:flex">
                <ul className="p-0 space-x-3 menu menu-horizontal">
                    <li>
                        <Link to={"/news"}>News</Link>
                    </li>
                    <li>
                        <Link to={"/education"}>Education</Link>
                    </li>

                    <li>
                        <Link to={"/travel"}>Travel</Link>
                    </li>
                </ul>
            </div>
            {/* END NON-MOBLE MENU */}

            {/* START USER MENU */}
            <div className="flex items-end navbar-end">
                <div className="dropdown dropdown-end">
                    <button tabIndex="0" className="btn avatar">
                        {user ? (
                            <>
                                <BsFillPersonFill size={"1.5rem"} />
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="mr-3">
                                    Login
                                </Link>
                                <Link to="/register">Register</Link>
                            </>
                        )}
                    </button>

                    {user ? (
                        <>
                            <ul
                                tabIndex="0"
                                className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className="justify-between"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">Settings</Link>
                                </li>
                                <li>
                                    <button className="btn" onClick={onLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {/* END USER MENU */}
        </div>
    )
}

export default Nav
