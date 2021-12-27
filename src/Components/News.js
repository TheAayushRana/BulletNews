import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(20)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d1fc4deb6a644ca79fbeb5464d920917&page=${page}&pagesize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(40)
        let parsedData = await data.json()
        props.setProgress(60)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - BulletNews`;
        updateNews();
        // eslint-disable-next-line
    }, [])

    // Dark Mode Buttons
    // const handlePrevClick = async () => {
    //     console.log("Prev");
    //     setPage(page - 1);
    //     updateNews();
    // }
    // const handleNextClick = async () => {
    //     console.log("Next");
    //     setPage(page + 1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d1fc4deb6a644ca79fbeb5464d920917&page=${page + 1}&pagesize=${props.pageSize}`;
        setPage(page + 1)
        // setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };

    return (
        <>
            <h1 className="text-center" style={{
                margin: "80px 0px 15px 0px"
            }}> BulletNews- Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length} //This is important field to render the next data
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container'>
                    <div className='row'>
                        {articles.map((element) => { //Map is like a loop
                            return <div className='col-md-4' key={element.url}>
                                <Newsitem title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""}
                                    imgUrl={element.urlToImage} url={element.url}
                                    publishedAt={element.publishedAt} author={element.author}
                                    source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className='d-flex justify-content-between mt-3'>
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div> */}
        </>
    )
}
News.defaultProps = {
    country: "in",
    pageSize: 5,
    category: 'sports'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News