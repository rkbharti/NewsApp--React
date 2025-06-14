import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function MyComponent() {
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);
  

  const fetchMoreData = () => {
    if (items.length >= 100) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 20 })));
    }, 500);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {items.map((_, index) => (
        <div key={index} style={{ padding: 20, border: '1px solid #ccc' }}>
          Item #{index + 1}
        </div>
      ))}
    </InfiniteScroll>
  );
}

export default MyComponent;