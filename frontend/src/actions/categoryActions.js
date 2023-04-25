import axios from "../axiosInstance";
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
} from "../constants/categoryConstants";

//get all categories with pagination
export const listCategories =
    (keyword = "", pageNumber = "") =>
    async (dispatch, getState) => {
        try {
            dispatch({
                type: CATEGORY_LIST_REQUEST,
            });

            //get user from state
            const {
                userLogin: { userInfo },
            } = getState();

            //headers
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            //get all categories
            const { data } = await axios.get(
                `/api/categories?keyword=${keyword}&pageNumber=${pageNumber}`,
                config
            );

            dispatch({
                type: CATEGORY_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: CATEGORY_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

//create a category
export const createCategory = (category) => async (dispatch, getState) => {
    const { name } = category;

    try {
        dispatch({
            type: CATEGORY_CREATE_REQUEST,
        });

        //get category from state
        const {
            userLogin: { userInfo },
        } = getState();

        //headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //create category
        const { data } = await axios.post("/api/categories", { name }, config);
        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//get category details
export const listCategoryDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_DETAILS_REQUEST });

        //get user from state
        const {
            userLogin: { userInfo },
        } = getState();

        //headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //api call to get category
        const { data } = await axios.get(`/api/categories/${id}`, config);
        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//update a category
export const updateCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_UPDATE_REQUEST,
        });

        //get user from state
        const {
            userLogin: { userInfo },
        } = getState();
        //headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //update category
        const { data } = await axios.put(
            `/api/categories/${category._id}`,
            { name: category.name },
            config
        );
        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

