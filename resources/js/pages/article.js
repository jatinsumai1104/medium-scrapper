import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {useParams, withRouter} from 'react-router-dom';

import fetchArticle from '../http/fetch-article';

var parse = require('html-react-parser');


class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
        this.setData = this.setData.bind(this);
    }

    componentDidMount() {
        fetchArticle(this.props.match.params.title, this.setData);
    }

    setData(data) {
        this.setState({data: data});
    }


    render() {


        if (this.state.data.length != 0) {
            const data = this.state.data;

            var tags = [];

            data.tags.forEach((tag) => {
                tags.push(<a href={"/tag/" + tag.name.split(' ').join('-').toLowerCase()} className="btn m-2"
                             style={{backgroundColor: '#e3f2fd'}}
                             key={tag.id}>{tag.name}</a>);
            })


            var responses = [];

            data.responses.forEach((response, index) => {
                responses.push(
                    <div key={response.id}>
                        <div className="media my-3">
                            <img className="d-flex mr-3 rounded-circle"
                                 src={response['responded_image']}
                                 alt=""
                                 width="50"/>
                            <div className="media-body">
                                <h5 className="mt-0">{response['responded_by']}</h5>
                                {response['response']}
                                <div className="mt-2 d-flex justify-content-between">
                                    <span className="text-muted">Claps {response['claps']}</span>
                                </div>
                            </div>

                        </div>
                        <hr key={index}/>
                    </div>
                );
            })


            return (
                <div className="container">

                    <div className="row">
                        <div className="col-lg-12">
                            {/*Title*/}
                            <h1 className="mt-4">{data.title}</h1>

                            <div className="lead d-flex flex-wrap">

                                {/*Subtitle*/}
                                <h5 className="text-muted mr-auto mt-3">{data.subtitle}</h5>

                            </div>

                            <hr/>

                            <div className="lead d-flex flex-wrap">

                                {/*Author*/}
                                <span className="mr-auto">
                                    <img src={data['creator_img']}
                                         className="img-fluid rounded-circle mr-2 " alt="Responsive image" width='42'/>
                                         <a href="#" className="text-decoration-none"> {data['creator']}</a>
                                </span>

                                {/*Date/Time*/}
                                <span>{data['details']}</span>
                            </div>


                            <hr/>

                            <div className="container">
                                {/*Post Content*/}
                                {parse(data['body'])}
                            </div>

                            {/*{parse(data['body'])}*/}

                            <hr/>

                            {/*Tags*/}
                            {tags}

                            <hr/>

                            <div className="card my-4">
                                {/*<h5 className="card-header">Comments</h5>*/}
                                <div className="card-header" style={{backgroundColor: '#e3f2fd'}} id="comments-heading">
                                    <h2 className="mb-0">
                                        <a className="btn btn-block text-left collapsed"
                                           style={{backgroundColor: '#e3f2fd'}} type="button"
                                           data-toggle="collapse" data-target="#comments" aria-expanded="false"
                                           aria-controls="comments">
                                            Comments
                                        </a>
                                    </h2>
                                </div>
                                <div id="comments" className="collapse" aria-labelledby="comments-heading">
                                    <div className="card-body">
                                        {responses}
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>

                </div>

            );
        } else {
            return (
                <div className="container">
                    <h1 className="mt-4 text-center">Fetching Data</h1>
                </div>
            );
        }

    }
}

export default withRouter(Article);

