import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateLeaveData } from "../../store/updateLeave";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {getEmployeeData} from "../../store/display"

const initialValues = {
    employee_name: '',
    leave_take: ''
};



export default function UpdateLeave({ employeeData, employee_id }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [leave, setLeave] = useState(initialValues);
  const [error,setError] =useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLeave(employeeData);
  }, [employeeData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeave({
      ...leave,
      [name]: value,
    });
  };

  const handleSuccessCB = () => {
    dispatch(getEmployeeData());
    handleClose();
  };
  const handleErrorCB=(data)=>{
    setError(data)
    return(data)
  }

  const handleAddleave = (e) => {
    e.preventDefault();
    dispatch(updateLeaveData({
      data: leave,
      successCB: handleSuccessCB,
      errorCB:handleErrorCB,
      employee_id: employee_id
    }));
  };

  return (
    <div>
      <Button onClick={handleOpen}>{leave.leave_take}/{leave.total_leave}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Leave
          </Typography>
          <form id="my-form" onSubmit={handleAddleave}>
            <div style={{ marginBottom: '15px' }} id="form-group">
              <label style={{color:"white", fontSize:"20px"}}>Employee Name:</label>
              <input
                type="text"
                name="employee_name"
                value={leave.employee_name}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: '15px' }} id="form-group">
              <label style={{color:"white", fontSize:"20px"}}>Leave Taken:</label>
              <input
                type="number"
                name="leave_take"
                value={leave.leave_take}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            {error}
            <div>
              
              <button type="submit" >
                Update
              </button>
              <button onClick={handleClose}>Cancel</button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

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