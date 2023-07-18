import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@mui/material/Avatar';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { authService } from '../services/AuthService';

const useStyles = makeStyles({
    toolbar: {
        textAlign: "center",
        height: 80
    },
    heading: {
        margin: "auto"
    }
});
const Header = ({ user }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfile = () => {
        navigate('/avatar')
    }

    const handleEmployee = () => {
        navigate('/employee')
    }

    const handleLogout = () => {
        setAnchorEl(null);
        authService.logout();
        navigate('/sign-in')
    };

    const handleClose = () => {
        setAnchorEl(null);       
    };


    console.log(user)
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography className={classes.heading} variant="h5">Todo App</Typography>
                {user && (<div><IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"><Avatar src={user.avatar}>{user.employeeName[0]}</Avatar>
                </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleEmployee}>Employees</MenuItem>
                        <MenuItem onClick={handleLogout}>Log out</MenuItem>                       
                    </Menu>
                </div>)}
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        user: state.auth.auth,

    }
}


export default connect(mapStateToProps, null)(Header);