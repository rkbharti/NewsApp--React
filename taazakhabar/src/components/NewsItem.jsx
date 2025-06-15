const NewsItem = ({ 
  title = "", 
  description = "", 
  imageUrl, 
  newsUrl, 
  author, 
  date, 
  source 
}) => {
  const defaultImage = "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg";
  
  return (
    <div className="my-3">
      <div className="card h-100">
        {/* Source badge */}
        <div className="position-absolute top-0 end-0 p-2">
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        
        {/* News image */}
        <img 
          src={imageUrl || defaultImage} 
          className="card-img-top" 
          alt={title || "News image"} 
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
        
        {/* Card content */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text flex-grow-1">{description}</p>
          <div>
            <p className="card-text text-muted small">
              By {author || "Unknown"} • {new Date(date).toLocaleDateString()}
            </p>
            <a 
              href={newsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;