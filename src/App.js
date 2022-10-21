import { Route, Routes } from "react-router-dom"
import Nav from "./components/Nav/Nav"

import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Register from "./pages/Register"

import UserProfile from "./components/Dashboard/UserProfile"

import Users from "./components/Dashboard/Users"

import CreateNewsArticle from "./components/Dashboard/CreateArticle/CreateNewsArticle"
import RequireAuth from "./components/RequireAuth"
import Dashboardlayout from "./components/Dashboard/DashboardLayout"
import NotFound from "./pages/NotFound"
import Unauthorized from "./pages/Unauthorized"
import StaffOnlyAuth from "./components/Dashboard/DashAuth/StaffOnlyAuth"
import CreateEduArticle from "./components/Dashboard/CreateArticle/CreateEduArticle"
import CreateTravelArticle from "./components/Dashboard/CreateArticle/CreateTravelArticle"
import News from "./pages/News"
import Travel from "./pages/Travel"
import Education from "./pages/Education"
import Archive from "./components/Dashboard/Archive/Archive"
import EditArticle from "./components/Dashboard/Archive/EditArticle"
import SingleArticle from "./pages/SingleArticle"

// require("dotenv").config()

function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/news" element={<News />} />
                <Route path="/travel" element={<Travel />} />
                <Route path="/education" element={<Education />} />

                <Route element={<RequireAuth />}>
                    <Route path="/dashboard" element={<Dashboardlayout />}>
                        <Route index element={<UserProfile />} />
                        <Route path="profile" element={<UserProfile />} />
                        <Route element={<StaffOnlyAuth />}>
                            <Route
                                path="createnewsarticle"
                                element={<CreateNewsArticle />}
                            />
                            <Route
                                path="createeduarticle"
                                element={<CreateEduArticle />}
                            />
                            <Route
                                path="createtravelarticle"
                                element={<CreateTravelArticle />}
                            />
                            <Route path="users" element={<Users />} />
                            <Route path="archive" element={<Archive />} />
                        </Route>
                    </Route>
                    <Route path="article">
                        <Route path="edit/:id" element={<EditArticle />} />
                    </Route>
                </Route>
                <Route path="article/:id" element={<SingleArticle />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default App
