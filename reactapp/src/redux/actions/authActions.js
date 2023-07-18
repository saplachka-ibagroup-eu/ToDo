import { authService } from "../../services/AuthService";
import { formateError } from "../../utils";
import * as actionTypes from './actionTypes';

export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOGOUT_ACTION = "[Logout action] logout action";
export const LOADING_ON = "LOADING_ON";
export const LOADING_OFF = "LOADING_OFF";

export const fetchCurrentUser = () => dispatch => {
    authService
        .fetchCurrentUser()
        .then((response) => {
            dispatch({
                type: actionTypes.LOGIN_CONFIRMED_ACTION,
                payload: response.data
            })
        })
        .catch(err => console.log(err));
}

export const signInAction =
    (name, password, navigate) =>
        (dispatch) => {
            dispatch(setLoadingOn());

            authService
                .login({ name, password })
                .then((response) => {
                    const { token } = response.data;
                    console.log(token);
                    authService.saveTokens({
                        token                 
                    });
                    dispatch(setLoadingOff());
                    dispatch(fetchCurrentUser());
                    navigate("/");
                })
                .catch((error) => {
                    console.log(error);
                    const errorMessage = formateError(error.response.data);
                    dispatch(loginFailedAction(errorMessage));
                    dispatch(setLoadingOff());
                });
        };

export function setLoadingOn() {
    return {
        type: LOADING_ON,
    };
}

export function setLoadingOff() {
    return {
        type: LOADING_OFF,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}