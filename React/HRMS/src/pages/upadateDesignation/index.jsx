import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateData } from "../../store/updateDesgination";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getDesignationListData } from "../../store/designationList"; 

const initialValues = {
    designation: '',
    total_leave: ''
};


export default function Update({ designationData, designation_id }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [designation, setDesignation] = useState(initialValues);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDesignation(initialValues);
  };

  useEffect(() => {
    setDesignation(designationData);
  }, [designationData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDesignation({
      ...designation,
      [name]: value,
    });
  };

  const handleSuccessCB = () => {
    handleClose();
    dispatch(getDesignationListData())
  };

  const handleAdddesignation = (e) => {
    e.preventDefault();
    dispatch(UpdateData({
      data: designation,
      successCB: handleSuccessCB,
      designation_id: designation_id
    }));
  };

  return (
    <div>
      <Button onClick={handleOpen}>Update</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'white',fontSize:'20px', fontFamily:'inherit'}}>
            UPDATE DESIGNATION 
          </Typography>
          <form id="my-form" onSubmit={handleAdddesignation}>
            <div style={{ marginBottom: '15px' }} id="form-group">
              <label style={{color:"white", fontSize:"20px"}}>Designation:</label>
              <input
                type="text"
                name="designation"
                value={designation.designation}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: '15px' }} id="form-group">
              <label style={{color:"white", fontSize:"20px"}}>Total Leave:</label>
              <input
                type="text"
                name="total_leave"
                value={designation.total_leave}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <button type="submit" >
                Update
              </button>
              <button onClick={handleClose} >
                Cancel
              </button>
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
