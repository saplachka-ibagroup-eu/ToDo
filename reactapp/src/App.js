import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import TodoList from './components/TodoList';
import { history } from './helpers/history';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
import FileUpload from './components/FileUpload';


function App() {

    return (
        <Router history={history}>
            <Header />
            <Routes>
                <Route path="/sign-in" element={<LoginForm />} />
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" index element={<TodoList />} />
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/employee" element={<EmployeeTable />} />
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/avatar" element={<FileUpload />} />
                </Route>
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </Router>
    );
}



export default App;