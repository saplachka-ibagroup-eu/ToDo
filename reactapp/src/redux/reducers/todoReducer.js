import * as actionTypes from '../actions/actionTypes'


const initialState = {
    list: [],
    edit: false,
    item: null,
    filter: "",
    error: ""
}


export const todo = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }

        case actionTypes.CREATE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case actionTypes.UPDATE:
            return {
                ...state,
                list: state.list.map(x => x.id == action.payload.id ? action.payload : x)
            }

        case actionTypes.DELETE:
            return {
                ...state,
                list: state.list.filter(x => x.id != action.payload)
            }

        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.error
            }

        case actionTypes.SET_EDIT:
            console.log(action);
            return {
                ...state,
                edit: true,
                error: ""
            }

        case actionTypes.SET_ITEM:
            console.log(action);
            return {
                ...state,
                item: action.item,
                error: ""
            }

        case actionTypes.SET_FILTER:
            console.log(action);
            return {
                ...state,
                filter: action.payload,
                error: ""
            }

        default:
            return state
    }
}