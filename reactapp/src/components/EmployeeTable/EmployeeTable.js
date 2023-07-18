import React, { useEffect } from "react";
import { DataGrid, getGridNumericOperators, getGridStringOperators, getGridDateOperators } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import "./EmployeeTable.css";
import * as actions from "../../redux/actions/employeeActions";
import { connect } from 'react-redux';

const stringOperators = getGridStringOperators().filter((op => ['equals'].includes(op.value)));
const numberOperators = getGridNumericOperators().filter((op => ['=', '>', '<', '!=', '>=', '<='].includes(op.value)));
const dateOperators = getGridDateOperators().filter((op => ['is'].includes(op.value)));

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'employeeName',
        headerName: 'Employee name',
        filterOperators: stringOperators,
        width: 200,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        filterOperators: numberOperators,
        width: 200,
        editable: true,
    },
    {
        field: 'speciality',
        headerName: 'Speciality',
        filterOperators: stringOperators,
        width: 200,
        editable: true,
    },
    {
        field: 'createdOn',
        type: 'dateTime',
        valueGetter: ({ value }) => value && new Date(value),
        headerName: 'Created On',
        filterOperators: dateOperators,
        width: 200,
        editable: true,
    },
    {
        field: 'avatar',
        headerName: 'Avatar',
        filterable: false,
        width: 200,
        editable: false,
        renderCell: (params) => {
            return params.value && <Avatar src={params.value}/>;
        },
    },

];

const EmployeeTable = ({ employeeList, applyFilter }) => {

    const handleFilterModelChange = React.useCallback((filterModel) => {
        console.log(filterModel)
        // Here you save the data you need from the filter model
        applyFilter(filterModel);
    }, [applyFilter]);

    useEffect(() => {
        applyFilter()
    }, [])


    console.log(employeeList);
    return (
        <div className="Container">
            <div className="Grid">
                <DataGrid
                    rows={employeeList}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    filterMode="server"
                    onFilterModelChange={handleFilterModelChange}
                />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        employeeList: state.employee.list,
        filter: state.employee.filter
    }
}

const mapActionToProps = {
    applyFilter: actions.applyFilter,

}

export default connect(mapStateToProps, mapActionToProps)(EmployeeTable);