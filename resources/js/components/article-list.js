import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';


const ArticleList = props => {

    const [data, setData] = useState([]);

    useEffect(() => {

        if(props.ScrappedData.length == 1){
            document.getElementById('articles').style.display = 'block';
        }
        if (props.ScrappedData.length > 0) {
            const scrappedData = props.ScrappedData[props.ScrappedData.length - 1];
            var temp = data.slice();
            temp.push(
                <div className="card my-2" key={scrappedData['id']}>
                    <div className="card-header d-flex">
                        <span className="text-success font-weight-bold text-capitalize">
                            <img src={scrappedData['creator_img']}
                                 className="img-fluid rounded-circle mr-2 " alt="Responsive image" width='42'/>
                            {scrappedData['creator']}
                        </span>
                        <span className="text-muted d-flex align-items-center ml-auto">{scrappedData['details']}</span>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title ">{scrappedData['title']}</h2>
                        <h5 className="card-subtitle my-2 text-muted">{scrappedData['subtitle']}</h5>

                        <img src={scrappedData['article_image']} className="img-fluid my-3 rounded-lg"
                             alt="Responsive image"/>

                        <p>{scrappedData['short_description']}</p>
                        <a href={'/article/' + scrappedData['title']} className="btn btn-light ml-0">Read more...</a>

                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <span className="text-success">Claps {scrappedData['claps']}</span>
                        <span className="text-success">{scrappedData['responses_count']}</span>
                    </div>
                </div>
            );

            setData(temp);
        }

    }, [props.ScrappedData.length]);

    return (
        <div className="shadow-sm p-3 mb-5 bg-white rounded mt-4" style={{display: 'none'}} id="articles">
            <h3 className="mb-3">Searched Articles By `{props.tag}`</h3>
            {data}
        </div>
    );
}
export default ArticleList;
