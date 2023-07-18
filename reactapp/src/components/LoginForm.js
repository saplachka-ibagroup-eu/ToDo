import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    TextField, Button, Box, CircularProgress,
    FormHelperText } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";

import { signInAction } from "../redux/actions/authActions";
import { useAuth } from "../hooks/useAuth";

const initalValues = {
    name: "",
    password: "",
};


const LoginForm = () => {

    const isAuthenticated = useAuth();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { showLoading, errorMessage } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="MaterialForm">           
            <Formik
                initialValues={initalValues}
                validationSchema={object({
                    name: string().required("Please enter name").min(2, "Name too short"),
                    password: string()
                        .required("Please enter password")
                        .min(5, "Password should be minimum 5 characters long"),
                })}
                onSubmit={async (values) => {
                    const { name, password } = values;
                    dispatch(signInAction(name, password, navigate));
                }}
            >
                {({ errors, isValid, touched, dirty }) => (
                    <Form>                        
                        <Field
                            name="name"
                            type="name"
                            as={TextField}
                            variant="outlined"
                            color="primary"
                            label="Name"
                            fullWidth
                            error={Boolean(errors.name) && Boolean(touched.name)}
                            helperText={Boolean(touched.name) && errors.name}
                        />
                        <Box height={14} />
                        <Field
                            name="password"
                            type="password"
                            as={TextField}
                            variant="outlined"
                            color="primary"
                            label="Password"
                            fullWidth
                            error={Boolean(errors.password) && Boolean(touched.password)}
                            helperText={Boolean(touched.password) && errors.password}
                        />
                        <Box height={14} />
                        {errorMessage && (
                            <FormHelperText error>Authentication failed: {errorMessage}</FormHelperText>
                        )}
                        {showLoading ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={!isValid || !dirty}
                            >
                                Sign in
                            </Button>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;