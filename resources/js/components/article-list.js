import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';


const ArticleList = props => {

    const [data, setData] = useState([]);

    useEffect(() => {
        var temp = [];
        props.status.forEach((status, index) => {
            switch (status) {
                case 'crawled':
                    const scrappedData = props.ScrappedData[index];
                    if (scrappedData['title'] != null ) {
                        if(index == 0){
                            document.getElementById('load10More').style.display = "block";
                        }
                        temp.push(
                            <div className="card my-2" key={index}>
                                <div className="card-header d-flex">
                                    <span className="font-weight-bold text-capitalize" style={{color: '#28AAFB'}}>
                                        <img src={scrappedData['creator_img']}
                                             className="img-fluid rounded-circle mr-2 " alt={scrappedData['creator']} width='42'/>
                                        {scrappedData['creator']}
                                    </span>
                                    <span className="text-muted d-flex align-items-center ml-auto">{scrappedData['details']}</span>
                                </div>
                                <div className="card-body">
                                    <h2 className="card-title ">{scrappedData['title']}</h2>
                                    <h5 className="card-subtitle my-2 text-muted">{scrappedData['subtitle']}</h5>

                                    <img src={scrappedData['article_image']} className="img-fluid my-3 rounded-lg"
                                         alt="Article Image"/>

                                    <p>{scrappedData['short_description']}</p>
                                    <a href={'/article/' + scrappedData['title']} className="btn btn-light ml-0">Read
                                        more...</a>

                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <span  style={{color: '#28AAFB'}}>Claps {scrappedData['claps']}</span>
                                    <span  style={{color: '#28AAFB'}}>Total Scrapping Time: {scrappedData["scrapping_time"]}s</span>
                                    <span  style={{color: '#28AAFB'}}>{scrappedData['responses_count']}</span>
                                </div>
                            </div>
                        );
                    }
                    break;
                case 'crawling':
                    temp.push(
                        <div key={index} className="card my-2">
                            <div className="card-header d-flex">
                                <div className="profile-pic load-animate"></div>
                                <div className="block block--very-short load-animate mt-2 ml-3"></div>
                                <div className="block block--very-short load-animate mt-2 d-flex ml-auto "></div>
                            </div>
                            <div className="card-body">

                                <div className="content-title load-animate mt-2"></div>

                                <div className="content-subtitle load-animate mt-2 "></div>

                                <div className="content-image load-animate"></div>

                                <div className="content-title load-animate mt-2" style={{width: '15%'}}></div>

                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <div className="block block--very-short load-animate"></div>
                                <div className="block block--very-short load-animate"></div>
                            </div>
                        </div>
                    );
                    break;
                case 'pending':
                    temp.push(
                        <div className="card my-2" key={index}>
                            <div className="card-header d-flex justify-content-around">
                                <span>Pending</span>
                            </div>
                            <div className="card-body" style={{height: '300px'}}>
                                <div className="spinner-grow text-dark" role="status"
                                     style={{marginLeft: '50%', marginTop: '100px'}}>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>

                        </div>
                    );
                    break;
            }
        });
        setData(temp);

    }, [props.status]);

    return (
        <div className="shadow-sm p-3 mb-5 bg-white rounded mt-4" style={{display: 'none'}} id="articles">
            <h3 className="mb-3">{props.tag != '' ? 'Searched Articles By `' + props.tag + '`' : 'Scrapping Articles, Please Wait...'}</h3>
            {data}
        </div>
    );
}
export default ArticleList;
