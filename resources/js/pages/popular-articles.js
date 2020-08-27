import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import FetchPopularArticles from '../http/fetch-popular-articles';


class PopularArticles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
        this.setData = this.setData.bind(this);
    }

    componentDidMount() {
        document.title = 'Popular Articles - Medium Scrapper';
        FetchPopularArticles(this.setData);
    }

    setData(data) {
        this.setState({data: data});
    }


    render() {

        if (this.state.data.length != 0) {
            const stateData = this.state.data;

            var popular_articles = [];

            stateData.forEach((article, index) => {
                popular_articles.push(
                    <div className="card my-2" key={index}>
                        <div className="card-header d-flex">
                                    <span className="font-weight-bold text-capitalize" style={{color: '#28AAFB'}}>
                                        <img src={article['creator_img']}
                                             className="img-fluid rounded-circle mr-2 " alt="Responsive image" width='42'/>
                                        {article['creator']}
                                    </span>
                            <span className="text-muted d-flex align-items-center ml-auto">{article['details']}</span>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title ">{article['title']}</h2>
                            <h5 className="card-subtitle my-2 text-muted">{article['subtitle']}</h5>

                            <img src={article['article_image']} className="img-fluid my-3 rounded-lg"
                                 alt="Responsive image"/>

                            <p>{article['short_description']}</p>
                            <a href={'/article/' + article['title']} className="btn btn-light ml-0">Read
                                more...</a>

                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <span style={{color: '#28AAFB'}}>Claps {article['claps']}</span>
                            <span style={{color: '#28AAFB'}}>Total Scrapping Time: {article["scrapping_time"]}s</span>
                            <span style={{color: '#28AAFB'}}>{article['responses_count']}</span>
                        </div>
                    </div>
                );
            });

            return (
                <>
                    <div className="container shadow-lg p-3 my-5 bg-white rounded mt-4">
                        <h3 className="text-center mb-4">Popular Articles</h3>
                        {popular_articles}
                    </div>
                </>
            )
        }else{
            return(
                <div className="container shadow-lg p-3 my-5 bg-white rounded mt-4">
                    <h3 className="text-center mb-4">Loading Popular Articles Please wait...</h3>
                </div>
            )
        }
    }
}

export default PopularArticles;

