import React from 'react';
import InfiniteScroll from '../components/InfiniteScroll';

const NewsPage = () => {
  return (
    <div className="news-page">
      <h1>Latest News</h1>
      <InfiniteScroll />
    </div>
  );
};

export default NewsPage;