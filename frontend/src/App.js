import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Error from "./Error";
import LoginScreen from "./screens/auth/LoginScreen";
const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={LoginScreen} />
                <Route path = "*" component={Error} />
            </Switch>
        </Router>
    );
};

export default App;
