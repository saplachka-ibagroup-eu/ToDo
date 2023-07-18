import React, { useEffect } from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SearchBar from './SearchBar/SearchBar';
import Form from './Form';
import { connect } from 'react-redux';
import * as actions from "../redux/actions/todoActions";
import { useToasts } from "react-toast-notifications";

const useStyles = makeStyles({
    container: {
        padding: 16
    },
    root: {
        textAlign: "center",
        height: "100%"
    },
    search: {
        textAlign: "center",
        width: "90%"
    }
});


function TodoList({ setEdit, setItem, todoList, fetchAllTodos, deleteTodoItem }) {
    const classes = useStyles();


    useEffect(() => {
        fetchAllTodos()
    }, [])

    const { addToast } = useToasts();

    const handleEdit = (item) => {
        setEdit();
        setItem(item);
    }



    const handleDelete = async (id) => {
        await deleteTodoItem(id, () => addToast("Deleted successfully", { appearance: 'info' }));
        fetchAllTodos();
    }

    console.log(todoList);

    return (
        <div className={classes.root}>
         <Form/>
            <Container className={classes.container} maxWidth="md">
                {todoList.length > 0 && <SearchBar />}
                {!todoList.length
                    ?
                    <Typography variant="h6" color="error">No Data to display</Typography>
                    :
                    (<List>
                        {todoList.map(item => {
                            console.log(item)
                            return (
                                <ListItem key={item.key} button>
                                    <ListItemIcon>
                                        <CheckCircleIcon color="primary" />
                                    </ListItemIcon>

                                    <ListItemText primary={item.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.key)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                    </List>)
                }
            </Container>
        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        todoList: state.todo.list
    }
}

const mapActionToProps = {
    fetchAllTodos: actions.fetchAll,
    deleteTodoItem: actions.deleteItem,
    setEdit: actions.setEdit,
    setItem: actions.setItem
}

export default connect(mapStateToProps, mapActionToProps)(TodoList);