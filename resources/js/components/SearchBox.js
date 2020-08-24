import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';


class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchArticles = this.searchArticles.bind(this);
    }

    // const [value, setValue] = useState('');


    searchArticles(event){
        event.preventDefault();
        if(this.state.value != ""){
            for(var i = 0; i < 10; i++){
                console.log("Fetching: " + i);

                fetch("http://127.0.0.1:8000/api/scrapper", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'tag': this.state.value,
                        'index': i
                    }),
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.props.setScrappedData(result, i);
                        },
                        (error) => {
                            console.log('Error');
                            console.log(error);
                        }
                    )
            }
        }
    }


    handleChange(event) {
        this.setState({value: event.target.value});
    }
    render(){
        return (
            <form onSubmit={this.searchArticles}>
                <h3>Search Article By Tag</h3>
                <input className="form-control mb-4 mt-4" id="tableSearch" type="text"
                       placeholder="Type some tag to search article" value={this.state.value} onChange={this.handleChange}/>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Search</button>
            </form>
        );
    }
}
export default SearchBox;
