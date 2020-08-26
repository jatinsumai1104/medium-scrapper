import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';

import {useLocation} from 'react-router-dom'


const Navbar = (props) => {

    const [currentPath, setCurrentPath] = useState('home');

    let location = useLocation();
    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location.pathname]);
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#e3f2fd'}}>
            <div className="container">
                <a className="navbar-brand" href="#">Medium Scrapper</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className={currentPath == '/' ?'nav-item active':''} >
                            <a className="nav-link" href="/">Home {currentPath == "/" ? <span className="sr-only">(current)</span>:''}</a>
                        </li>
                        <li className={currentPath == '/history' ?'nav-item active':''} >
                            <a className="nav-link" href="/history">History</a>
                        </li>
                        <li className="nav-item {currentPath == '/' ?'active:''}">
                            <a className="nav-link" href="/">Most Popular Articles</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
