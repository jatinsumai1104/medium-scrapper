import React from "react";
import {Link, Route, Switch} from "react-router-dom";

import Articles from "../pages/articles";
import Article from "../pages/article";
import History from "../pages/history";
import PopularArticles from "../pages/popular-articles";
import Navbar from "../components/navbar";

const Root = () => {
    return (
        <>
            <Navbar/>
            <Switch>
                <Route exact path="/" >
                    <Articles/>
                </Route>
                <Route exact path="/article/:title">
                    <Article/>
                </Route>
                <Route exact path="/tag/:tag">
                    <Articles/>
                </Route>
                <Route exact path="/history">
                    <History/>
                </Route>
                <Route exact path="/popular-articles">
                    <PopularArticles/>
                </Route>
            </Switch>
        </>
    );
};

export default Root;
