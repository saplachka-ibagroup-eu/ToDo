import React, { useState } from 'react';
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import * as actions from "../../redux/actions/todoActions";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    field: {
        width: '90%'
    }
});


const SearchBar = ({ filter, applyFilter }) => {

    const classes = useStyles();


    const [searchQuery, setSearchQuery] = useState(filter);
    console.log(searchQuery);

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilter(searchQuery);
    };

    return (

        <form >
            <TextField
                id="search-bar"
                value={searchQuery}
                className={classes.field}
                onInput={(e) => {
                    setSearchQuery(e.target.value);
                }}
                label="Search.."
                variant="outlined"
                placeholder="Enter a todo name"
                size="small"
            />
            <IconButton type="submit" aria-label="search" onClick={handleSearch}>
                <SearchIcon style={{ fill: "#3f51b5" }} />
            </IconButton>
        </form>
    )
};

const mapStateToProps = (state) => {
    return {
        filter: state.todo.filter
    }
}
const mapActionToProps = {
    applyFilter: actions.applyFilter,
}

export default connect(mapStateToProps, mapActionToProps)(SearchBar);