import { useContext } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { AuthContext } from "../../../context/authContext"

export default function StaffOnlyAuth() {
    const staffRoles = ["Journalist", "Editor", "Admin", "Superuser"]
    const location = useLocation()
    const { user } = useContext(AuthContext)
    return staffRoles.includes(user.role) ? (
        <Outlet />
    ) : (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
}
