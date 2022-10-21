import { useContext } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { AuthContext } from "../context/authContext"

const RequireAuth = () => {
    const location = useLocation()
    const { user } = useContext(AuthContext)
    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth
