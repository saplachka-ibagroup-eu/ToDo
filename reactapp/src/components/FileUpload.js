import React, { useState } from "react";
import { connect } from 'react-redux';
import api from '../redux/actions/employeeApi';
import { Button, Typography, TextField } from "@material-ui/core";
import * as actions from '../redux/actions/authActions';

const FileUpload = ({ fetchCurrentUser }) => {
    const [file, setFile] = useState();

    const saveFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    const uploadFile = async (e) => {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await api.employee().uploadImage(formData);
            console.log(res);
            fetchCurrentUser();
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <>
            <Typography style={{ padding: '20px' }} variant="h5">Upload avatar</Typography>
            <input style={{ paddingLeft: '20px' }} type="file" onChange={saveFile} />
             <Button color="primary" variant="contained" component="span" onClick={uploadFile}>
              Upload
             </Button>          
        </>
    );
};

const mapActionToProps = {
    fetchCurrentUser: actions.fetchCurrentUser,
    
}

export default connect(null, mapActionToProps)(FileUpload);