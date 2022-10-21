import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import HomeFeed from "../components/HomeComponents/HomeFeed"
import Headline from "../components/HomeComponents/Headline"
import { LOAD_ARTICLES } from "../Graphql/Queries/home"

export default function HomePage() {
    const { error, loading, data } = useQuery(LOAD_ARTICLES)
    const [isEnable, setIsEnable] = useState(false)
    
    console.log("DATA >>>>", data)
    if (error) {
        // Write error to log
        console.log("error :", error)
    }
    
    // WORKING
    const filterData = (type) => {
        if (data) {
            const dataX = data.getArticles
            let dataN = dataX.filter((art) => art.article_type === type)
            return dataN
        }
    }

    useEffect(() => {
        if (loading) { 
            setIsEnable(false)
        } else {
            if (data !== undefined && data.getArticles.length > 0) {
                setIsEnable(true)
            } else {
                setIsEnable(false)
            }
        }
    }, [loading])

    return (
        <div className="space-y-10">
            <div className="pt-3">
                {/* Headline */}
                {!isEnable ? <h2>Loading...</h2> : <Headline data={data} />}
            </div>

            <div className="px-5">
                <h2>
                    <u className="decoration-thxBlue">News</u>
                </h2>
                {!isEnable ? (
                    <h2>Loading...</h2>
                ) : (
                    <HomeFeed data={filterData("News")} />
                )}
            </div>

            <div className="px-5">
                <h2>
                    <u className="decoration-thxBlue">Travel</u>
                </h2>
                {!isEnable ? (
                    <h2>Loading...</h2>
                ) : (
                    <HomeFeed data={filterData("Travel")} />
                )}
            </div>

            <div className="px-5">
                <h2>
                    <u className="decoration-thxBlue">Education</u>
                </h2>
                {!isEnable ? (
                    <h2>Loading...</h2>
                ) : (
                    <HomeFeed data={filterData("Education")} />
                )}
            </div>
        </div>
    )
}
