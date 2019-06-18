import {createStore, applyMiddleare, compose} from "redux";
import thunk from "redux-thunk";

const initialState = {};

const middlware = [thunk];

const store = createStore(
    () => [],
    initialState,
    compose(
        applyMiddleare(...middlware),
        window.__REDUX_DEVTOOLS_EXTENSION_ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;