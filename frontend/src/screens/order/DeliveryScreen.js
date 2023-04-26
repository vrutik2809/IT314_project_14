import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/* components */
import HeaderContent from "../../components/HeaderContent";
import DataTableLoader from "../../components/loader/DataTableLoader";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

/* actions */
import { listOrders } from "../../actions/orderActions";

const DeliveryScreen = ({ history }) => {
    const dispatch = useDispatch();

    const [pageNumber, setPageNumber] = useState(1);
    const [keyword, setKeyword] = useState("");
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders, page, pages } = orderList;

    useEffect(() => {
        dispatch(listOrders({ keyword, pageNumber, delivery: true }));
    }, [dispatch, history, userInfo, pageNumber, keyword]);

    const renderCreateButton = () => (
        <Link to="/dashboard/order/create/delivery">
            <button className="btn btn-success btn-lg">
                <i className="fas fa-truck" /> New Delivery
            </button>
        </Link>
    );

    const renderTable = () => (
        <table className="table table-hover text-nowrap">
            <thead>
                <tr>
                    <th>SN</th>
                    <th>Customer Name</th>
                    <th>Paid</th>
                    <th>Check</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order,idx) => (
                    <tr key={order.id}>
                        <td>{idx+1}</td>
                        <td>{`Customer ${idx+1}`}</td>
                        <td>
                            {order.isPaid ? (
                                <h4 className="text-success">
                                    <i className="fas fa-check"></i>
                                </h4>
                            ) : (
                                <h4 className="text-danger">
                                    <i className="far fa-times-circle"></i>
                                </h4>
                            )}
                        </td>
                        <td>
                            <Link
                                to={`/dashboard/order/${order.id}/view`}
                                className="btn btn-info btn-lg"
                            >
                                View
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderDeliveries = () => (
        <>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Active Delivery orders</h3>
                    <div className="card-tools">
                        <Search
                            keyword={keyword}
                            setKeyword={setKeyword}
                            setPage={setPageNumber}
                        />
                    </div>
                </div>
                <div className="card-body table-responsive p-0">
                    <LoaderHandler
                        loading={loading}
                        error={error}
                        loader={DataTableLoader()}
                        render={renderTable}
                    />
                </div>
            </div>

            <Pagination page={page} pages={pages} setPage={setPageNumber} />
        </>
    );

    return (
        <>
            <HeaderContent name={"Delivery"} />

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {renderCreateButton()}
                            <hr />

                            {renderDeliveries()}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DeliveryScreen;
