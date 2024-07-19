import {configureStore}  from "@reduxjs/toolkit"
import loginReducer  from "./login"
import employeeDataReducer from "./display"
import addEmployeeReducer from "./addEmployee";
import getEmployeeDataReducer from "./getEmployee";
// import getDeleteEmployeeDataReducer from "./deteleteEmployee";
import updateEmployeeDataReducer from "./updateEmployee";
import getDesignationListReducer from "./designationList";
import addDesignationReducer from "./addDesignation";
import updateDesignationDataReducer from "./updateDesgination"
import updateLeaveDataReducer from "./updateLeave";
export const store = configureStore({
    reducer:{
        loginData:loginReducer,
        employeeData:employeeDataReducer,
        addEmployeeData:addEmployeeReducer,
        getEmployeeData:getEmployeeDataReducer,
        // deleteEmployeeData:getDeleteEmployeeDataReducer,
        updateEmployeeData:updateEmployeeDataReducer,
        getDesignationListData:getDesignationListReducer,
        addDesignationData:addDesignationReducer,
        updateDesignationData:updateDesignationDataReducer,
        updateLeaveData:updateLeaveDataReducer,


    },
});