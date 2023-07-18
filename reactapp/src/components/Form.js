
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import * as actions from "../redux/actions/todoActions";
import { useToasts } from "react-toast-notifications";

const useStyles = makeStyles({
    root: {
        marginTop: 16,
        marginBottom: 16,
        padding: 16,
        boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)"
    },
    button: {
        marginTop: 16
    }
});

const Form = ({ fetchAllTodos, createTodo, updateTodo, error, setError, item, state,setItem }) => {
    console.log(state)
    const classes = useStyles();
    const [todo, setTodo] = useState("");

    const { addToast } = useToasts();
    console.log(item);

    useEffect(() => {
        if (item) { setTodo(item.name) }

    }, [item?.name])
    console.log(todo);

    const handleChange = (event) => {
        const title = event.target.value;
        if (title.length === 0) {
            setError("Please enter title");
            console.log(error);
        } else {
            setError("");
        }
        setTodo(title);
    }

    const handleClick = async () => {
        console.log(todo);
        console.log(item);

        if (todo === "") {
            alert("Input is Empty");
            setError("Please enter title");
            console.log(error);
            return;
        }
        if (item) {

            const onUpdate = () => {

                addToast("Updated successfully", { appearance: 'success' })
            }
          await  updateTodo(item.key, {
                Name: todo
            }, onUpdate);
            setTodo("");
            setItem(null);
            fetchAllTodos();
        } else {
            const onSuccess = () => {

                addToast("Submitted successfully", { appearance: 'success' })
            }
            createTodo({
                Name: todo
            }, onSuccess);
            setTodo("");
        }

    }

    return (
        <Container maxWidth="sm" className={classes.root}>
            <Grid container alignItems="center">
                <Grid item md={12}>
                    <TextField value={todo} onChange={handleChange}
                        error={!!error} helperText={error} id="outlined-basic" fullWidth label="Enter Title" multiline variant="outlined" />
                </Grid>
                <Grid item md={12}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={handleClick}>
                        {item ? "Edit" : "Add"}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state,
        todoList: state.todo.list,
        edit: state.todo.edit,
        item: state.todo.item,
        error: state.error
    }
}


const mapActionToProps = {
    fetchAllTodos: actions.fetchAll,
    createTodo: actions.create,
    updateTodo: actions.update,
    setError: actions.setError,
    setItem: actions.setItem
}

export default connect(mapStateToProps, mapActionToProps)(Form);