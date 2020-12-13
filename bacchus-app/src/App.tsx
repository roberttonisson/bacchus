import React from "react";
import Header from "./components/shared/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/views/Home";
import PastAuctions from "./components/views/PastAuctions";


const App = () => {

    return ( 
        <Router>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/pastAuctions">
                    <PastAuctions />
                </Route>
                <h1>Page not found 404</h1>
            </Switch>
        </Router>
    );
};

export default App;