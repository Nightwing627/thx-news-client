import { useContext } from "react"
import { AuthContext } from "../context/authContext"

const UseAuth = () => {
    return useContext(AuthContext)
}

export default UseAuth
