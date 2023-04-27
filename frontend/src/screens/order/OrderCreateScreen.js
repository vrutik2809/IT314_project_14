import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* Components */
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import HeaderContent from "../../components/HeaderContent";
import ButtonGoBack from "../../components/ButtonGoBack";

/* Form components */
import Textarea from "../../components/form/Textarea";
import Checkbox from "../../components/form/Checkbox";

/* Order components */
import ProductsTable from "../../components/order/ProductsTable";
import OrderInfo from "../../components/order/OrderInfo";
import Select from "../../components/Select";
import OrderCart from "../../components/order/OrderCart";
import LoaderHandler from "../../components/loader/LoaderHandler";

/* Constants */

import { PRODUCT_LIST_RESET } from "../../constants/productConstants";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";

/* Actions */
import { listTables } from "../../actions/tableActions";
import { createOrder } from "../../actions/orderActions";

const OrderCreateScreen = ({ history, match }) => {
    /* Get table from url */
    const tableFromUrl = window.location.href.indexOf("table") !== -1;
    /* Get delivery from url */
    const deliveryFromUrl = window.location.href.indexOf("delivery") !== -1;

    const [table, setTable] = useState(
        tableFromUrl ? (match.params.id) : null
    );

    const [delivery, setDelivery] = useState(deliveryFromUrl);
    const [note, setNote] = useState("");
    const [errors, setErrors] = useState({});
    const [total, setTotal] = useState(0);
    const [productsInOrder, setProductsInOrder] = useState([]);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const tableList = useSelector((state) => state.tableList);
    const { tables } = tableList;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { success, loading, error } = orderCreate;

    useEffect(() => {
        if (success) {
            dispatch({ type: PRODUCT_LIST_RESET });
            dispatch({ type: ORDER_CREATE_RESET });
            if (delivery) {
                history.push("/dashboard/delivery");
            } else {
                history.push("/dashboard/active");
            }
        }
    }, [dispatch, history, success, error]);

    const handleSubmit = (e) => {
        e.preventDefault();

        /* Set Errors */
        let errorsCheck = {};
        if (!table && !delivery) {
            errorsCheck.table = "Table is required";
        }

        if (productsInOrder.length < 1) {
            errorsCheck.products = "Cart cannot by empty";
        }

        /* Check errors */
        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            /* Create order */
            const order = {
                total: total,
                tableId: !delivery ? table : "",
                products: productsInOrder,
                delivery: delivery,
                note: note,
            };
            /* Make request */
            dispatch(createOrder(order));
        }
    };

    /* Filter tables */
    const filterFreeTables = () => {
        const mappedTables = tables.filter((table) => {
            return table.occupied === false;
        });
        return mappedTables;
    };

    const renderProductsTable = () => (
        <ProductsTable
            productsInOrder={productsInOrder}
            setProductsInOrder={setProductsInOrder}
        />
    );

    const renderCart = () => (
        <>
            {errors.products && (
                <Message message={errors.products} color={"warning"} />
            )}
            <OrderInfo
                total={total}
                setTotal={setTotal}
                productsInOrder={productsInOrder}
            />
            <OrderCart
                productsInOrder={productsInOrder}
                setProductsInOrder={setProductsInOrder}
            />
        </>
    );

    const searchTables = (e) => {
        dispatch(listTables(e.target.value));
    };

    const renderTablesSelect = () => (
        <>
            <Select
                name="Select Table"
                data={table}
                setData={setTable}
                items={filterFreeTables(tables)}
                disabled={delivery}
                search={searchTables}
            />
            {errors.table && (
                <Message message={errors.table} color={"warning"} />
            )}
        </>
    );

    const renderDeliveryCheckbox = () => (
        <Checkbox name={"delivery"} data={delivery} setData={setDelivery} />
    );

    const renderNoteTextarea = () => (
        <Textarea
            title={"Note (optional)"}
            rows={3}
            data={note}
            setData={setNote}
        />
    );

    const renderSubmitButton = () => (
        <button
            onClick={handleSubmit}
            className="btn btn-success btn-lg float-right "
        >
            Submit
        </button>
    );

    return (
        <>
            <HeaderContent name={"Orders"} />
            <section className="content">
                <div className="container-fluid">
                    <ButtonGoBack history={history} />
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Create Order</h3>
                                    <Loader variable={loading} />
                                    <Message message={error} color={"danger"} />
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 col-lg-6">
                                            {renderProductsTable()}
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            {renderCart()}
                                            <div className="row">
                                                <div className="col-12 col-md-6">
                                                    {renderTablesSelect()}
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                {renderDeliveryCheckbox()}
                                            </div>
                                            {renderNoteTextarea()}
                                        </div>
                                    </div>
                                    {renderSubmitButton()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OrderCreateScreen;
