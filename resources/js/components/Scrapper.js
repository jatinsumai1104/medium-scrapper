import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import SearchBox from './SearchBox';
import Articles from './Articles';


class Scrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.setScrappedData = this.setScrappedData.bind(this);
    }

    // const [data, setData] = useState([]);

    setScrappedData(scrappedData, index) {
        var temp = this.state.data.slice();
        temp.push(scrappedData);
        this.setState({data: temp});
    }

    render() {
        return (
            <div className="container">
                <div className="shadow-sm p-3 mb-5 bg-white rounded mt-4">
                    <SearchBox setScrappedData={this.setScrappedData}/>
                </div>
                <div className="shadow-sm p-3 mb-5 bg-white rounded">
                    <Articles ScrappedData={this.state.data}/>
                </div>
            </div>
        );
    }
}

export default Scrapper;

if (document.getElementById('scrapper')) {
    ReactDOM.render(<Scrapper/>, document.getElementById('scrapper'));
}
