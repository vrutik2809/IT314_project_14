import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./components/Menu";
import DashboardScreen from "./screens/DashboardScreen";


export default function Main() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    return (
        <>
            <Header />
            <Menu />
            <div className="content-wrapper">
                <Switch>
                    <PrivateRoute exact path="/dashboard" component={DashboardScreen} />
                </Switch>
            </div>
        </>
    );
}
