import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import fetchArticles from '../http/fetch-articles';


class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',

        };
        this.handleChange = this.handleChange.bind(this);
        this.searchArticles = this.searchArticles.bind(this);
    }

    searchArticles(event) {
        event.preventDefault();
        if(this.state.value != ''){
            document.getElementById('articles').style.display = 'block';
            fetchArticles(this.state.value, this.props.article_count, true, this.props.setScrappedData);
        }
    }

    handleChange(event) {
        if(event)
        this.props.restoreState();
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className="shadow-sm p-3 mb-5 bg-white rounded mt-4" id="article-search-component">
                <form onSubmit={this.searchArticles}>
                    <h3>Search Article By Tag</h3>
                    <input className="form-control mb-4 mt-4" id="articleSearch" type="text"
                           placeholder="Type some tag to search article" value={this.state.value}
                           onChange={this.handleChange}/>
                    <button type="submit" className="btn btn-primary btn-lg btn-block" id="article-search-btn">Search
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchBox;
