import React from "react";
import { capitalize } from "../../utils/functions";

const Input = ({ name, type, data, setData, errors,min = 0, classes = "" }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{capitalize(name)}</label>
            <input
                type={type}
                className={`form-control ${classes}`}
                id={name}
                aria-describedby={name}
                value={data}
                min={min}
                onChange={(e) => setData(e.target.value)}
            />

            {errors[name] && (
                <label className="text-danger">{errors[name]} </label>
            )}
        </div>
    );
};

export default Input;
