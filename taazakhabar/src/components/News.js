import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState(null);
    
    // Sample data for development/fallback
    const sampleArticles = [
        {
            title: "Important News Update",
            description: "This is sample news data shown when the API fails or in development mode.",
            url: "#",
            urlToImage: "https://via.placeholder.com/300",
            publishedAt: new Date().toISOString(),
            source: { name: "Sample News By TaazaKhabar" }
        },
        // Add more sample articles as needed
    ];

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getApiUrl = (pageNum) => {
        // Use demo key in development if no API key is provided
        if (process.env.NODE_ENV === 'development' && !props.apiKey) {
            return `https://newsapi.org/v2/top-headlines?country=us&category=sports&pageSize=${props.pageSize}&page=${pageNum}&apiKey=demo`;
        }
        return `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNum}&pageSize=${props.pageSize}`;
    };

    const updateNews = async () => {
        try {
            props.setProgress(10);
            const url = getApiUrl(page);
            setLoading(true);
            const response = await fetch(url);
            props.setProgress(30);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const parsedData = await response.json();
            props.setProgress(50);

            if (!parsedData?.articles || !Array.isArray(parsedData.articles)) {
                throw new Error('Invalid API response format');
            }

            props.setProgress(70);
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults || 0);
            props.setProgress(100);
        } catch (err) {
            console.error('News fetch error:', err);
            setError(err.message);
            setArticles(sampleArticles); // Fallback to sample data
            setTotalResults(sampleArticles.length);
        } finally {
            setLoading(false);
            props.setProgress(100);
        }
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - TaazaKhabar`;
        updateNews();
        // eslint-disable-next-line
    }, []);

    const fetchMoreData = async () => {
        try {
            const nextPage = page + 1;
            const url = getApiUrl(nextPage);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const parsedData = await response.json();

            if (!parsedData?.articles) {
                throw new Error('Invalid API response format');
            }

            setPage(nextPage);
            setArticles(prevArticles => [...prevArticles, ...parsedData.articles]);
            setTotalResults(parsedData.totalResults || 0);
        } catch (err) {
            console.error('Fetch more error:', err);
            setError(err.message);
        }
    };

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
                TaazaKhabar - Top {capitalizeFirstLetter(props.category)} Headlines
            </h1>
            
            {error && (
                <div className="alert alert-warning text-center">
                    <strong>Note:</strong> {error}. Showing {articles === sampleArticles ? 'sample' : 'limited'} news.
                </div>
            )}
            
            {loading && <Spinner />}
            
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
            > 
                <div className="container">
                    <div className="row">
                        {articles.map((element, index) => (
                            <div className="col-md-4" key={`${element.url}-${index}`}>
                                <NewsItem 
                                    title={element.title || "No title available"} 
                                    description={element.description || "No description available"} 
                                    imageUrl={element.urlToImage || "https://via.placeholder.com/300"} 
                                    newsUrl={element.url || "#"} 
                                    author={element.author || "Unknown"} 
                                    date={element.publishedAt || new Date().toISOString()} 
                                    source={element.source?.name || "Unknown source"} 
                                />
                            </div>
                        ))}
                    </div>
                </div> 
            </InfiniteScroll>
        </>
    );
};

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string,
    setProgress: PropTypes.func.isRequired,
};

export default News;