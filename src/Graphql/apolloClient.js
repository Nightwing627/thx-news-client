import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"

const URI = process.env.REACT_APP_API_URI
// const URI = "http://localhost:4000"

const httpLink = createHttpLink({
    uri: URI
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        )
    // For production, have this write to an error file instead of console
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            "apollo-require-preflight": false,
            ...headers,
            authorization: localStorage.getItem("token") || ""
        }
    }
})

const client = new ApolloClient({
    errorLink,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default client
