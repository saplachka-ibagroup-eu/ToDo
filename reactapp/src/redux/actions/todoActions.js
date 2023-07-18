import api from "./todoApi";
import * as actionTypes from './actionTypes';


export const fetchAll = (criteria) => dispatch => {
    return api.todo().fetchAll(criteria)
        .then(response => {
            dispatch({
                type: actionTypes.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {

    return api.todo().create(data)
        .then(res => {
            dispatch({
                type: actionTypes.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    return api.todo().update(id, data)
        .then(res => {
            dispatch({
                type: actionTypes.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const deleteItem = (id, onSuccess) => dispatch => {
    return api.todo().delete(id)
        .then(res => {
            dispatch({
                type: actionTypes.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const setError = (error) => {
    return {
        type: actionTypes.SET_ERROR,
        error: error
    }
}

export const setItem = (item) => {
    return {
        type: actionTypes.SET_ITEM,
        item: item
    }
}

export const setEdit = () => {
    return {
        type: actionTypes.SET_EDIT
    }
}

export const applyFilter = (criteria) => dispatch => {

    dispatch({
        type: actionTypes.SET_FILTER,
        payload:criteria
    });

    return api.todo().fetchAll(criteria)
        .then(response => {
            dispatch({
                type: actionTypes.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

