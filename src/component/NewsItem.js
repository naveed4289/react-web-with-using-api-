import React from 'react';

const NewsItem =(props)=> {
 
    const { title, description, imageUrl, newsUrl,author,date } = props;
    const defaultImageUrl = "https://ichef.bbci.co.uk/news/1024/branded_news/2b40/live/1c95b380-1465-11ef-a5f9-c9e97f2e93cf.jpg";

    return (
      <div>
        <div className="card" >
          <img src={imageUrl || defaultImageUrl} className="card-img-top" alt="News" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='_blank' rel='noopener noreferrer' className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    );
  
}
export default NewsItem;
