import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {useParams, withRouter} from 'react-router-dom';

import getHistory from '../http/get-history';

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [],
        }
        this.setHistory = this.setHistory.bind(this);
    }

    componentDidMount() {
        getHistory(this.setHistory);
    }

    setHistory(data) {
        this.setState({history: data});
    }

    render() {

        if (this.state.history.length != 0) {
            const stateHistory = this.state.history;

            var history = [];

            stateHistory.forEach((histories) => {
                // console.log(histories.name);
                history.push(
                    <a href={histories['name']} className="text-decoration-none box-hover-shadow" key={histories['name'] + ":" + histories['created_at']}>
                        <div className="card my-2 shadow-sm" >
                            <div className="card-header d-flex">
                                <span className="text-success font-weight-bold text-capitalize">
                                    {histories['name']}
                                </span>
                                <span className="text-muted d-flex align-items-center ml-auto">{histories['created_at'].split('.')[0].replace('T', ', ')}</span>
                            </div>
                        </div>
                    </a>
                );
            });

            // this.setState({history: history});


            return (
                <>
                    <div className="container shadow-lg p-3 my-5 bg-white rounded mt-4">
                        <h3 className="text-center mb-4">Search History</h3>
                        {history}
                    </div>
                </>
            )
        }else{
            return(
                <div className="container shadow-lg p-3 my-5 bg-white rounded mt-4">
                    <h3 className="text-center mb-4">Search History</h3>
                    <div className="card my-2 shadow-sm">
                        <div className="card-header d-flex">
                                <span className="text-success font-weight-bold text-capitalize">
                                    No Search History Yet
                                </span>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default withRouter(History);

