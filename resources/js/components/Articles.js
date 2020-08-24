import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';


const Articles = props => {

    const [data, setData] = useState([]);

    useEffect(() => {

        if (props.ScrappedData.length > 0) {
            const scrappedData = props.ScrappedData[props.ScrappedData.length - 1];
            var temp = data.slice();
            temp.push(
                <div className="card mb-4" key={scrappedData['id']}>
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
                        <a href={'/article/' + scrappedData['id']} className="btn btn-light ml-0">Read more...</a>

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
        <div id="articles">
            {/*<div className="card mb-4">*/}
            {/*    <div className="card-header d-flex justify-content-between">*/}
            {/*        <span className="text-success font-weight-bold text-capitalize">*/}
            {/*            <img src="https://cdn-images-1.medium.com/fit/c/36/36/1*N4okk7Rui7qZzsbBz36aVQ.png"*/}
            {/*                 className="img-fluid rounded-circle mr-2 " alt="Responsive image"/>*/}
            {/*            Ugonna Thelma*/}
            {/*        </span>*/}
            {/*        <span className="text-muted">Aug 15, 9 min read</span>*/}
            {/*    </div>*/}
            {/*    <div className="card-body">*/}
            {/*        <h2 className="card-title mb-3">7 Must-Use Developer Tools for Increased Efficiency</h2>*/}
            {/*        <img src="https://cdn-images-1.medium.com/0*mzC4hsoKEfLzQ6pB" className="img-fluid mb-3 rounded-lg"*/}
            {/*             alt="Responsive image"/>*/}
            {/*        <h5 className="card-subtitle my-2 text-muted">A list of very helpful tools I personally use*/}
            {/*            and…</h5>*/}

            {/*        <p>If you are familiar with Object-Oriented Programming, then you’ve probably heard about the…</p>*/}
            {/*        <a href="#" className="btn btn-light ml-0">Read more...</a>*/}

            {/*    </div>*/}
            {/*    <div className="card-footer d-flex justify-content-between">*/}
            {/*        <span className="text-success">Claps 1.3K</span>*/}
            {/*        <span className="text-success">1 Response</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {data}
        </div>
    );
}
export default Articles;
