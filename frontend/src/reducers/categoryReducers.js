import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_RESET,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DETAILS_RESET,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_RESET,
} from "../constants/categoryConstants";

export const categoryListReducer = (
    state = { loading: true, categories: [] },
    action
) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true, categories: [] };
        case CATEGORY_LIST_SUCCESS:
            return {
                loading: false,
                categories: action.payload.categories,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        case CATEGORY_LIST_RESET:
            return { categories: [] };
        default:
            return state;
    }
};

export const categoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            return { loading: true };
        case CATEGORY_CREATE_SUCCESS:
            return { loading: false, success: true };
        case CATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const categoryDetailsReducer = (state = { category: {} }, action) => {
    switch (action.type) {
        case CATEGORY_DETAILS_REQUEST:
            return { ...state, loading: true };
        case CATEGORY_DETAILS_SUCCESS:
            return { loading: false, category: action.payload };
        case CATEGORY_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case CATEGORY_DETAILS_RESET:
            return { category: {} };
        default:
            return state;
    }
};

export const categoryUpdateReducer = (state = { category: {} }, action) => {
    switch (action.type) {
        case CATEGORY_UPDATE_REQUEST:
            return { loading: true };
        case CATEGORY_UPDATE_SUCCESS:
            return { loading: false, success: true, category: action.payload };
        case CATEGORY_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case CATEGORY_UPDATE_RESET:
            return { category: {} };
        default:
            return state;
    }
};

