import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import SearchBox from '../components/search-box';
import ArticleList from '../components/article-list';

import {withRouter} from "react-router-dom";

import useHttp from '../hooks/http';


class Articles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: '',
        };
        this.setScrappedData = this.setScrappedData.bind(this);
        this.load10More = this.load10More.bind(this);
    }

    componentDidMount() {

        if(this.props.match.params.tag){
            // console.log(this.props.match.params.value);
            // const event = new Event("change", { bubbles: false });
            // const input = document.getElementById('articleSearch');
            //
            // input.value = this.props.match.params.tag;
            //
            // input.dispatchEvent(event);
            // document.getElementById('article-search-btn').click();
            document.getElementById('article-search-component').style.display = 'none';
            useHttp('http://127.0.0.1:8000/api/articles', this.props.match.params.tag, this.state.data.length, this.setScrappedData);
        }
        // this.setState({value, this.props.match.params.value});
    }

    setScrappedData(scrappedData, index, value) {
        var temp = this.state.data.slice();
        temp.push(scrappedData);
        this.setState({value: value, data: temp});
    }

    load10More(){
        // document.getElementById('article-search-btn').click();
        useHttp('http://127.0.0.1:8000/api/articles', this.state.value, this.state.data.length, this.setScrappedData);
    }


    render() {

        var load10More = [];
        if(this.state.data.length > 0){
            load10More = (<div>
                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.load10More}>Load 10 more blogs</button>
            </div>);
        }

        return (
            <div className="container">
                <div>
                    <SearchBox setScrappedData={this.setScrappedData} article_count={this.state.data.length}/>
                </div>
                <div>
                    <ArticleList ScrappedData={this.state.data} tag={this.state.value}/>
                </div>
                {load10More}
            </div>
        );
    }
}

export default withRouter(Articles);
