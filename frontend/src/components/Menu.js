import React, { useEffect } from "react";
import { Link, Redirect,useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Menu = ({ history }) => {
    const History = useHistory();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    console.log(userInfo);

    useEffect(() => {
        if (!userInfo) {
            History.push("/login",{ referrer: "/" });
        }
    }, [dispatch, userInfo]);

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{backgroundColor:'#1C4E80'}}>
               <Link to={"/dashboard"} className="brand-link">
                <img
                    src="/logo512.png"
                    alt="Menulize Logo"
                    className=" img-circle elevation-3"
                    style={{  width:"50px",height:"50px",marginBottom:"8px", marginLeft:"10px", marginRight:"10px"}}
                />
                <span className="brand-text font-weight-light" style={{fontFamily: "Gabriola", fontSize:"40px"}}>Menulize</span>
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src={userInfo ? (userInfo.image ? userInfo.image : "/avatar.png") : "/avatar.png"}
                            className="img-circle elevation-2"
                            alt="User"
                        />
                    </div>
                    <div className="info">
                        <Link to="/dashboard/profile" className="d-block">
                            {userInfo ? userInfo.name : ""}
                        </Link>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt" />{" "}
                                <p> Dashboard</p>
                            </Link>
                        </li>

                        {!userInfo ? (
                            ""
                        ) : userInfo.isAdmin === true ? (
                            <>
                                <li className="nav-header">ADMIN</li>
                                <li className="nav-item">
                                    <Link to="/dashboard/user" className="nav-link">
                                        <i className="nav-icon fas fa-users" />{" "}
                                        <p> Users</p>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            ""
                        )}

                        <li className="nav-header">Menulize</li>
                        <li className="nav-item">
                            <Link to="/dashboard/active" className="nav-link">
                                <i className="nav-icon fas fa-bell" />{" "}
                                <p> Active Orders</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/dashboard/delivery" className="nav-link">
                                <i className="nav-icon fas fa-truck" />{" "}
                                <p> Delivery</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard/order" className="nav-link">
                                <i className="nav-icon far fa-clipboard" />{" "}
                                <p> Orders</p>
                            </Link>
                        </li>

                        <li className="nav-header">MANAGEMENT</li>

                        <li className="nav-item">
                            <Link to="/dashboard/category" className="nav-link">
                                <i className="nav-icon fas fa-list-alt" />{" "}
                                <p> Categories</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/dashboard/product" className="nav-link">
                                <i className="nav-icon fas fa-hamburger" />{" "}
                                <p> Products</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/dashboard/table" className="nav-link">
                                <i className="nav-icon fas fa-border-all" />{" "}
                                <p> Tables</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Menu;
