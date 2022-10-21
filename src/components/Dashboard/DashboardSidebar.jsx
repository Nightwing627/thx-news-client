import { ImProfile } from "react-icons/im"
import { MdOutlineArticle } from "react-icons/md"
import { RiArchiveDrawerLine } from "react-icons/ri"
import { FiUsers } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import { BiStar } from "react-icons/bi"

const DashboardSidebar = () => {
    const { user } = useContext(AuthContext)
    // const userRoles = ["User", "Subscriber"]
    const staffRoles = ["Journalist", "Editor", "Admin", "Superuser"]
    const adminRoles = ["Admin", "Superuser"]
    return (
        <div className="flex flex-col items-center w-28 min-h-screen pt-6 bg-base-300 relative">
            <div className="fixed w-28 h-full ">
                <nav>
                    <div className="flex flex-col min-h-screen space-y-5">
                        {/* BUTTONS FOR EVERYONE */}
                        <button>
                            <Link
                                to="profile"
                                className="flex flex-col items-center"
                            >
                                <ImProfile className="text-2xl text-neutral-content" />
                                <span className="text-xs">Profile</span>
                            </Link>
                        </button>

                        <button>
                            <Link
                                to="favorites"
                                className="flex flex-col items-center"
                            >
                                <BiStar className="text-2xl text-neutral-content" />
                                <span className="text-sm">Favorities</span>
                            </Link>
                        </button>

                        {/* END BUTTONS FOR EVERYONE */}

                        {/* CONDITINALLY RENDER BUTTONS FOR EVERYONE EXCEPT USERS & SUBSCRIBERS */}
                        {staffRoles.includes(user.role) && (
                            <>
                                <button>
                                    <Link
                                        to="createnewsarticle"
                                        className="flex flex-col items-center"
                                    >
                                        <MdOutlineArticle className="text-2xl text-neutral-content" />
                                        <span className="text-sm">
                                            Create News
                                        </span>
                                    </Link>
                                </button>

                                <button>
                                    <Link
                                        to="createeduarticle"
                                        className="flex flex-col items-center"
                                    >
                                        <MdOutlineArticle className="text-2xl text-neutral-content" />
                                        <span className="text-sm">
                                            Create Edu
                                        </span>
                                    </Link>
                                </button>

                                <button>
                                    <Link
                                        to="createtravelarticle"
                                        className="flex flex-col items-center"
                                    >
                                        <MdOutlineArticle className="text-2xl text-neutral-content" />
                                        <span className="text-sm">
                                            Create Travel
                                        </span>
                                    </Link>
                                </button>

                                <button>
                                    <Link
                                        to="archive"
                                        className="flex flex-col items-center"
                                    >
                                        <RiArchiveDrawerLine className="text-2xl text-neutral-content" />
                                        <span className="text-sm">Archive</span>
                                    </Link>
                                </button>
                            </>
                        )}

                        {/* END CONDITINALLY RENDER BUTTONS FOR EVERYONE EXCEPT USERS & SUBSCRIBERS */}

                        {/* END CONDITINALLY RENDER USER LIST FOR ADMIN UP */}
                        {adminRoles.includes(user.role) && (
                            <>
                                <button>
                                    <Link
                                        to="users"
                                        className="flex flex-col items-center"
                                    >
                                        <FiUsers className="text-2xl text-neutral-content" />
                                        <span className="text-sm">Users</span>
                                    </Link>
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default DashboardSidebar
