import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Error from "./Error"
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./components/Menu";
import DashboardScreen from "./screens/DashboardScreen";
import Footer from "./components/Footer";

import CategoryScreen from "./screens/category/CategoryScreen";
import CategoryEditScreen from "./screens/category/CategoryEditScreen";
import TableScreen from "./screens/table/TableScreen";
import TableEditScreen from "./screens/table/TableEditScreen";
import ProductScreen from "./screens/product/ProductScreen";

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
                    <PrivateRoute exact
                        path="/dashboard/table/:id/edit"
                        component={TableEditScreen}
                    />
                    <PrivateRoute exact path="/dashboard/table" component={TableScreen} />

                    <PrivateRoute exact
                        path="/dashboard/category/:id/edit"
                        component={CategoryEditScreen}
                    />
                    <PrivateRoute exact path="/dashboard/category" component={CategoryScreen} />

                    <PrivateRoute exact path="/dashboard/product" component={ProductScreen} />

                    <Route path="*" component={Error} />
                </Switch>
            </div>
            <Footer />
        </>
    );
}
