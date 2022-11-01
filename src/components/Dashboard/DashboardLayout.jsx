import { Outlet } from "react-router-dom"
import DashboardSidebar from "./DashboardSidebar"

export default function Dashboardlayout() {
    return (
        <div className="grid grid-cols-dashboard ">
            <DashboardSidebar />
            <Outlet />
        </div>
    )
}