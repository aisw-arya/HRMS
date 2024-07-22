
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from "../../store/addEmployee";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getEmployeeData } from "../../store/display";

const initialValues = {
  employee_name:'',
  address:'',
  phone_number:'',
  email:'',
  image:'',
  des_id:''
};

const Form = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState(initialValues);
  const [error,setError] =useState(null);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEmployee(initialValues);   
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };
  const handleErrorCB=(data)=>{
    setError(data)
    return(data)
  }

  const handleSuccessCB=()=>{
    handleClose();
    dispatch(getEmployeeData());
  }

  const handleAddEmployee = (e) => {
    e.preventDefault();
    dispatch(addEmployee({ data: employee, successCB: handleSuccessCB,
      errorCB:handleErrorCB }));    
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '1px solid #ccc',   
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: 'transparent',  
  };
  
  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',    
    borderRadius: '4px',
    marginBottom: '15px',
    backgroundColor: '#f9f9f9', 
  };
  

  
  const labelStyle = {
    marginBottom: '5px',
    display: 'block',
    color: '#f9f9f9',            
  };
  
  

  return (
    <>
      <div id="m">
        <Button variant="outlined" color="secondary" onClick={handleOpen} >Add employee</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginBottom: '20px' ,color:"whitesmoke"}}>
            ADD EMPLOYEE
          </Typography>
          <form id="my-form">
            <div style={{ marginBottom: '15px', backgroundColor: 'transparent', padding: '10px', borderRadius: '4px' }} id="form-group">
              <label style={labelStyle}>Name:</label>
              <input
                type="text"
                name="employee_name"
                value={employee.employee_name}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: '15px', backgroundColor: 'transparent', padding: '10px', borderRadius: '4px' }} id="form-group">
              <label style={labelStyle}>Address:</label>
              <input
                type="text"
                name="address"
                value={employee.address}
                onChange={handleInputChange}
                
                required
              />
            </div>
            <div style={{ marginBottom: '15px', backgroundColor: 'transparent', padding: '10px', borderRadius: '4px' }} id="form-group">
              <label style={labelStyle}>Contact Number:</label>
              <input
                type="text"
                name="phone_number"
                value={employee.phone_number}
                onChange={handleInputChange}
                
                required
              />
            </div>
            <div style={{ marginBottom: '15px', backgroundColor: 'transparent', padding: '10px', borderRadius: '4px' }} id="form-group">
              <label style={labelStyle}>Mail id:</label>
              <input
                type="text"
                name="email"
                value={employee.email}
                onChange={handleInputChange}
                
                required
              />
            </div>
            <div style={{ marginBottom: '15px', backgroundColor: 'transparent', padding: '10px', borderRadius: '4px' }} id="form-group">
              <label style={labelStyle}>Image:</label>
              <input
                type="text"
                name="image"
                value={employee.image}
                onChange={handleInputChange}
                
                required
              />
            </div>
            <div style={{ marginBottom: '15px', backgroundColor: 'transparent', padding: '10px', borderRadius: '4px' }} id="form-group">
              <label style={labelStyle}>Designation name:</label>
              <input
                type="text"
                name="designation"
                value={employee.designation}
                onChange={handleInputChange}
                
                required
              />
            </div>
            {error}
            <center>
            <button
              type="submit"
              onClick={handleAddEmployee}
            >
              Add
            </button>
            <button
              
              onClick={handleClose}
            >
              Cancel
            </button>
            </center>
          </form>
        </Box>
        
      
        </Modal>
      </div>
    </>
  );
};

export default Form;
