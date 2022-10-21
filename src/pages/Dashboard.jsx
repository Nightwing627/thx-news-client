import { Outlet } from "react-router-dom"
import DashboardSidebar from "../components/Dashboard/DashboardSidebar"

function Dashboard() {
    return (
        <div className="grid grid-cols-dashboard ">
            <DashboardSidebar />
            <Outlet />
        </div>
    )
}

export default Dashboard
