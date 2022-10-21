import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import client from "./Graphql/apolloClient"
import App from "./App"
import { ApolloProvider } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/authContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <AuthProvider>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </BrowserRouter>
        </ApolloProvider>
    </AuthProvider>
)
