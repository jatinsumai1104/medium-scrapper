import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {useParams, withRouter} from 'react-router-dom';


var parse = require('html-react-parser');


class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.fetchData(this.props.match.params.title);
    }

    fetchData(title) {
        fetch("http://127.0.0.1:8000/api/article/" + title, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({data: result});
                    console.log(result);
                },
                (error) => {
                    console.log('Error');
                    console.log(error);
                }
            )
    }


    render() {


        if (this.state.data.length != 0) {
            const data = this.state.data;

            var tags = [];

            data.tags.forEach((tag) => {
                tags.push(<a href={"/tag/"+tag.name.split(' ').join('-').toLowerCase()} className="btn ml-2" style={{backgroundColor: '#e3f2fd'}}
                             key={tag.id}>{tag.name}</a>);
            })


            var responses = [];

            data.responses.forEach((response, index) => {
                responses.push(
                    <div className="media my-3" key={response.id}>
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
                );
                responses.push(<hr key={index}/>);
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
                                     className="img-fluid rounded-circle mr-2 " alt="Responsive image" width='42'/> <a
                                    href="#"> {data['creator']}</a>
                            </span>

                                {/*Date/Time*/}
                                <span>{data['details']}</span>
                            </div>


                            <hr/>

                            {/*Preview Image*/}
                            <img className="img-fluid rounded" src={data['article_image']} alt=""/>

                            <hr/>

                            {/*Post Content*/}
                            Body

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
                                        {/*Single Comment*/}
                                        {/*<div className="media my-3">*/}
                                        {/*    <img className="d-flex mr-3 rounded-circle"*/}
                                        {/*         src="http://placehold.it/50x50"*/}
                                        {/*         alt=""/>*/}
                                        {/*    <div className="media-body">*/}
                                        {/*        <h5 className="mt-0">Commenter Name</h5>*/}
                                        {/*        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus*/}
                                        {/*        scelerisque ante sollicitudin. Cras purus odio, vestibulum in*/}
                                        {/*        vulputate at, tempus viverra turpis. Fusce condimentum nunc ac*/}
                                        {/*        nisi vulputate fringilla. Donec lacinia congue felis in*/}
                                        {/*        faucibus.*/}
                                        {/*        <div className="mt-2 d-flex justify-content-between">*/}
                                        {/*            <span className="text-muted">Claps 10K</span>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}

                                        {/*</div>*/}
                                        {/*<hr/>*/}
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

