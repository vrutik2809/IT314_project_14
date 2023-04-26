import React from "react";
import { Link } from "react-router-dom";

const Table = ({ table }) => {
    console.log(table);
    return (
        <Link
            to={
                table.orders[0]
                    ? `/dashboard/order/${table.orders[0]._id}/view`
                    : "/dashboard/active"
            }
        >
            <div className="small-box bg-danger">
                <div className="inner">
                    <h3>{table.name}</h3>
                </div>
                <div className="icon">
                    <i className="fas fa-user-friends"></i>
                </div>
                <div className="small-box-footer">
                    More info <i className="fa fa-arrow-circle-right" />
                </div>
            </div>
        </Link>
    );
};

export default Table;
