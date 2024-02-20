import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import categoryReducer from "./category.reducer";
import orderReducer from "./order.reducer";
import pageReducer from "./page.reducer";
import productReducer from "./product.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    order: orderReducer,
    product: productReducer,
    page: pageReducer,
});

export default rootReducer;
