import * as actionTypes from './actionTypes';
import api from './employeeApi';


export const applyFilter = (criteria) => dispatch => {
    console.log(criteria)
    dispatch({
        type: actionTypes.SET_FILTER,
        payload: criteria
    });

    return api.employee().fetchAll(criteria)
        .then(response => {
            dispatch({
                type: actionTypes.FETCH_ALL_EMPLOYEE,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}