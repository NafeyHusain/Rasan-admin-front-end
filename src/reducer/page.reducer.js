import { pageConstants } from "../actions/constants";

const initState = {
    error: null,
    message: "",
    loading: false,
};

/* eslint-disable */
export default (state = initState, action) => {
    switch (action.type) {
        case pageConstants.CREATE_PAGE_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case pageConstants.CREATE_PAGE_SUCCESS:
            state = {
                ...state,
                loading: false,
            };
            break;
        case pageConstants.CREATE_PAGE_ERROR:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
    }
    return state;
};
