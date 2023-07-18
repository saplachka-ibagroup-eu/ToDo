import { combineReducers } from "redux";
import { todo } from "./todoReducer";
import { authReducer } from "./authReducer";
import { employeeReducer } from "./employeeReducer";

export const reducers = combineReducers({
    todo, auth: authReducer, employee: employeeReducer
})