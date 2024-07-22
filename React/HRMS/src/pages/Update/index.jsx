import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployeeData } from "../../store/updateEmployee";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getEmployeeData } from "../../store/display";

const initialValues = {
  employee_name: "",
  address: "",
  phone_number: "",
  email: "",
  image: "",
  des_id: "",
};

export default function Update({ employeeData, employee_id }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState(initialValues);
  const designation = useSelector((state) => state.getDesignationListData.data);
  console.log(designation,"designation");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEmployee(initialValues);
  };

  useEffect(() => {
    setEmployee(employeeData);
  }, [employeeData]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };
  const handleSuccessCB = () => {
    dispatch(getEmployeeData());
    handleClose();
  };
  const handleAddEmployee = (e) => {
    e.preventDefault();
    console.log(employee_id, "employee id");
    dispatch(
      updateEmployeeData({
        data: employee,
        successCB: handleSuccessCB,
        employee_id: employee_id,
      })
    );
  };
  return (
    <div>
      <Button onClick={handleOpen}>update</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update employee
          </Typography>
          <form id="my-form" onSubmit={handleAddEmployee}>
            <div style={{ marginBottom: "15px" }} id="form-group">
              <label style={{ color: "white", fontSize: "20px" }}>Name:</label>
              <input
                type="text"
                name="employee_name"
                value={employee.employee_name}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }} id="form-group">
              <label style={{ color: "white", fontSize: "20px" }}>
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={employee.address}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }} id="form-group">
              <label style={{ color: "white", fontSize: "20px" }}>
                Contact Number:
              </label>
              <input
                type="text"
                name="phone_number"
                value={employee.phone_number}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }} id="form-group">
              <label style={{ color: "white", fontSize: "20px" }}>
                Mail id:
              </label>
              <input
                type="text"
                name="email"
                value={employee.email}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }} id="form-group">
              <label style={{ color: "white", fontSize: "20px" }}>image:</label>
              <input
                type="text"
                name="image"
                value={employee.image}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }} id="form-group">
              <label style={{ color: "white", fontSize: "20px" }}>
                Designation name:
              </label>
              <input
                type="text"
                name="designation"
                value={employee.designation}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
 

            <div>
              <button type="submit">Add</button>
              <button onClick={handleClose}>Cancel</button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "1px solid #ccc", 
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
  borderRadius: "8px",
  padding: "20px",
  backgroundColor: "transparent", 
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ccc", 
  borderRadius: "4px",
  marginBottom: "15px",
  backgroundColor: "#f9f9f9", 
};
