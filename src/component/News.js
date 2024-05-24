import React, { useEffect,useState,useCallback  } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'

const News =(props)=> {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    // document.title=`${this.capitalizeFirstLetter(props.category)}`;

  const capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
      

    
    const updateNews = useCallback(async () => {
        const { country, category } = props;
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apikey=89241570f1194cfebcb4779f28a0027e&page=${page}&pageSize=20`;

        setLoading(true);

        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    }, [page, props]);
    useEffect(() => {
        updateNews();
      
    }, [updateNews])
    
   
   const handlePreviousClick = async () => {
       
        setPage(page-1);
        updateNews();
    }
   const handleNextClick = async () => {
    
            setPage(page+1);
            updateNews();
    }
    
        return (
            <div className="container my-3">
                <h2 style={{marginTop:'90px'}}>Top Headings - {capitalizeFirstLetter(props.category)} Today</h2>
                {loading && <Loading />}
                <div className="row my-3 ">
                    {!loading && articles.map((element) => {
                        return <div className="col-md-4 my-3" key={element.url} >
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ""}
                                description={element.description ? element.description.slice(0, 80) : ""}
                                imageUrl={element.urlToImage}
                                newsUrl={element.url}
                                author={element.author}
                                date={element.publishedAt} />
                        </div>
                    })}
                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr;Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / 20)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &larr;</button>
                </div>

            </div>
        )
    
}
News.defaultProps={
    country:'us',
    category:'general'
  }
News.propTypes={
    country:PropTypes.string,
    category:PropTypes.string,
  }
  export default News;