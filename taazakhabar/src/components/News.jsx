import { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ 
  country = 'in', 
  pageSize = 8, 
  category = 'general', 
  apiKey, 
  setProgress 
}) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState(null);
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updateNews = async () => {
        try {
            setProgress(10);
            const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
            setLoading(true);
            setError(null);
            
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch news');
            
            const parsedData = await response.json();
            setProgress(70);
            
            if (!parsedData.articles) throw new Error('No articles found');
            
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
            setProgress(100);
        } catch (err) {
            setError(err.message);
            setProgress(100);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(category)} - TaazaKhabar`;
        updateNews();
    }, [category, country]);

    const fetchMoreData = async () => {
        try {
            const nextPage = page + 1;
            const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch more news');
            
            const parsedData = await response.json();
            setPage(nextPage);
            setArticles(prev => [...prev, ...parsedData.articles]);
            setTotalResults(parsedData.totalResults);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
                TaazaKhabar - Top {capitalizeFirstLetter(category)} Headlines
            </h1>
            
            {error && (
                <div className="alert alert-danger text-center">
                    {error} - Showing cached articles
                </div>
            )}
            
            {loading && <Spinner />}
            
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner/>}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((article) => (
                            <div className="col-md-4 mb-4" key={article.url}>
                                <NewsItem 
                                    title={article.title || ""}
                                    description={article.description || ""}
                                    imageUrl={article.urlToImage}
                                    newsUrl={article.url}
                                    author={article.author}
                                    date={article.publishedAt}
                                    source={article.source?.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
};

export default News;