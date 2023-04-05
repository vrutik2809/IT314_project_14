// importing all the dependencies 
import axios from "../axiosInstance";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_DETAILS_RESET,
} from "./../constants/userConstants";

// handling login backend
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        //headers
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        //get login data
        const { data } = await axios.post(
            "/api/auth/login",
            { email, password },
            config
        );
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};