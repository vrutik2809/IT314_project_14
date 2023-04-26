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

/* Order Components */
import ProductsTable from "../../components/order/ProductsTable";
import OrderInfo from "../../components/order/OrderInfo";
import Select from "../../components/Select";
import OrderCart from "../../components/order/OrderCart";
import LoaderHandler from "../../components/loader/LoaderHandler";

/* Constants */
import {
    ORDER_DETAILS_RESET,
    ORDER_UPDATE_RESET,
} from "../../constants/orderConstants";

/* Actions */
import { listOrderDetails, updateOrder } from "../../actions/orderActions";
import { listTables } from "../../actions/tableActions";

const OrderEditScreen = ({ history, match }) => {
    const orderId = (match.params.id);

    const [table, setTable] = useState(null);
    const [total, setTotal] = useState(0);
    const [delivery, setDelivery] = useState(false);
    const [note, setNote] = useState("");
    const [productsInOrder, setProductsInOrder] = useState([]);
    const [productsAlreadyOrdered, setProductsAlreadyOrdered] = useState([]);
    const [errors, setErrors] = useState({});
   
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    //order details state
    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, order } = orderDetails;

    const tableList = useSelector((state) => state.tableList);
    const { tables } = tableList;

    //order edit state
    const orderUpdate = useSelector((state) => state.orderUpdate);
    const {
        loading: loadingUpdate,
        success: successUpdate,
        errorUpdate,
    } = orderUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: ORDER_UPDATE_RESET });
            dispatch({ type: ORDER_DETAILS_RESET });
            if (delivery) {
                history.push("/dashboard/delivery");
            } else {
                history.push("/dashboard/active");
            }
        }
    }, [successUpdate]);

    useEffect(() => {
        //load order
        if (order) {
            if (!order.id || order.id !== orderId) {
                dispatch(listOrderDetails(orderId));
            } else {
                //set states
                setTable(order.table ? order.table._id : null);
                setNote(order.note ? order.note : note);
                setDelivery(order.delivery ? order.delivery : delivery);

                if (order.order_products) {
                    /* Format products */
                    const products = order.order_products.map((order_product) => {
                        return {
                            ...order_product,
                            quantity: order_product.quantity,
                        };
                    });

                    /* Set products state */
                    setProductsInOrder(products);
                    setProductsAlreadyOrdered(products);
                }
            }
        }
    }, [dispatch, history, order, orderId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let errorsCheck = {};

        if (!table && !delivery) {
            errorsCheck.table = "Table is required";
        }

        if (productsInOrder.length < 1) {
            errorsCheck.products = "Cart cannot by empty";
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            const order = {
                id: orderId,
                total: total,
                tableId: !delivery ? table : (table ? table : null),
                products: productsInOrder,
                delivery: delivery,
                note: note,
            };

            dispatch(updateOrder(order));
        }
    };

    const filterFreeTables = () => {
        const mappedTables = tables.filter((tableItem) => {
            return tableItem.occupied === false || tableItem.id === table;
        });
        return mappedTables;
    };

    const renderProductsTable = () => (
        <ProductsTable
            productsInOrder={productsInOrder}
            productsAlreadyOrdered={productsAlreadyOrdered}
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

    const renderTablesSelect = () => {
        return (
            <>
                <Select
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
    )};

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
                                    <Loader variable={loadingUpdate} />
                                    <Message
                                        message={errorUpdate}
                                        color={"danger"}
                                    />
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

export default OrderEditScreen;
