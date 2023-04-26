import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/* Components */
import HeaderContent from "./../components/HeaderContent";
import SmallBox from "./../components/SmallBox";
import DeliveryListItem from "../components/DeliveryListItem";
import DataTableLoader from "../components/loader/DataTableLoader";
import LoaderHandler from "../components/loader/LoaderHandler";

/* Actions */

import {
    OccupiedTableLoader,
    SkeletonBoxes,
    SkeletonSales,
} from "../components/loader/SkeletonLoaders";
import { getStatistics } from "../actions/orderActions";

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  //user state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderStatistics = useSelector((state) => state.orderStatistics);
  const { loading, error, data } = orderStatistics;
  const { orders, sales, statistics, totalOrders } = data;

  useEffect(() => {
      if (!userInfo) {
          history.push("/login");
      }
      dispatch(getStatistics());
  }, [dispatch, history, userInfo]);

  //get all in place orders
  const ordersInPlace = (orders) => {
      const ordersInPlace = orders.filter(function (item) {
          return item.delivery === false;
      });

      return ordersInPlace;
  };

  const getTodaySales = (items) => {
      let day = new Date();
      day = day.toISOString().slice(8, 10);
      const newSales = items.filter(function (item) {
          const saleDay = item.updated_at.slice(8, 10);
          return day === saleDay;
      });
      return newSales;
  };

  //get all delivery orders
  const ordersForDelivery = (orders) => {
      const ordersForDelivery = orders.filter(function (item) {
          return item.delivery === true;
      });

      return ordersForDelivery;
  };

  const handleRowClick = (e, id) => {
      e.preventDefault();
      history.push(`/dashboard/order/${id}/view`);
  };

  const returnSales = () => {
      var indents = [];
      for (var i = 0; i < (sales.length > 3 ? 4 : sales.length); i++) {
          indents.push(
              <tr key={sales[i].id}>
                  <td className="font-weight-bold">{i+1}</td>
                  <td className="h4">
                      {sales[i].delivery ? (
                          <span className={"badge bg-info"}>DELIVERY</span>
                      ) : (
                          <span className={"badge bg-primary"}>IN PLACE</span>
                      )}
                  </td>
                  <td className="h4">
                      <span className={"badge bg-success"}>
                          ₹{sales[i].total}
                      </span>
                  </td>
                  <td className="h4">
                      <span className={"badge bg-warning"}>
                          {sales[i].order_products.length}
                      </span>
                  </td>
                  <td>
                      <Link
                          to={`/dashboard/order/${sales[i].id}/view`}
                          className="btn btn-info"
                      >
                          <i className="fas fa-search"></i>
                      </Link>
                  </td>
              </tr>
          );
      }
      return indents;
  };

  const renderSmallBoxes = () => (
    <>
        <SmallBox
            number={orders.length}
            paragraph={"Unpaid orders"}
            link={"dashboard/order"}
            color={"success"}
            icon={"fas fa-utensils"}
        />

        <SmallBox
            number={ordersInPlace(orders).length}
            paragraph={"In Place Orders"}
            link={"dashboard/active"}
            color={"info"}
            icon={"fas fa-users"}
        />
        <SmallBox
            number={ordersForDelivery(orders).length}
            paragraph={"Orders for delivery"}
            link={"dashboard/delivery"}
            color={"danger"}
            icon={"fas fa-truck"}
        />

        <SmallBox
            number={totalOrders}
            paragraph={"Total orders"}
            link={"dashboard/order"}
            color={"warning"}
            icon={"ion ion-bag"}
        />
    </>
);


  return (
      <>
          <HeaderContent name={"Dashboard"} />

          <section className="content">
              <div className="container-fluid">
                  <div className="row">
                      <LoaderHandler
                          loading={loading}
                          error={error}
                          loader={<SkeletonBoxes />}
                          render={renderSmallBoxes}
                      />
                  </div>


                  <div className="row">
                      <div className="col-12 col-md-9">
                          <div className="card">
                              <div className="card-header border-transparent">
                                  <h3 className="card-title">
                                      Current In Place Orders
                                  </h3>
                                  <div className="card-tools">
                                      <button
                                          type="button"
                                          className="btn btn-tool"
                                          data-card-widget="collapse"
                                      >
                                          <i className="fas fa-minus" />
                                      </button>
                                  </div>
                              </div>
                              
                              <div className="card-footer clearfix">
                                  <Link
                                      to={"/dashboard/order/create"}
                                      className="btn btn-sm btn-info float-left"
                                  >
                                      Place New Order
                                  </Link>
                                  <Link
                                      to={"/dashboard/order"}
                                      className="btn btn-sm btn-secondary float-right"
                                  >
                                      View All Orders
                                  </Link>
                              </div>
                          </div>
                      </div>
                      <div className="col-12 col-md-3">
                          <div className="card">
                              <div className="card-header">
                                  <h3 className="card-title">
                                      Recently Added Delivery Orders
                                  </h3>
                                  <div className="card-tools">
                                      <button
                                          type="button"
                                          className="btn btn-tool"
                                          data-card-widget="collapse"
                                      >
                                          <i className="fas fa-minus" />
                                      </button>
                                  </div>
                              </div>
                             
                              <div className="card-footer text-center">
                                  <Link
                                      to={"/dashboard/delivery"}
                                      className="uppercase"
                                  >
                                      View All Delivery Orders
                                  </Link>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </>
  );
};

export default DashboardScreen;

