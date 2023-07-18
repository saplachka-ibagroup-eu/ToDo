import * as actionTypes from '../actions/actionTypes'

const initialState = {
    list: [],    
    filter: [],
    error: ""
}


export const employeeReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_ALL_EMPLOYEE:
            return {
                ...state,
                list: [...action.payload]
            };   
        case actionTypes.SET_FILTER:
            console.log(action);
            return {
                ...state,
                filter: action.payload,
                error: ""
            };

        default:
            return state;
    }
}