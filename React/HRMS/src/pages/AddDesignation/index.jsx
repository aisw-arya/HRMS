import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDesigntion } from "../../store/addDesignation";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {getDesignationListData} from "../../store/designationList"



const Form = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [designation, setDesignation] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDesignation({
            ...designation,
            [name]: value,
        });
    };
    const handleSuccessCB=()=>{
        handleClose();
        dispatch(getDesignationListData());
      }

    const handleAddDesignation = (e) => {
        e.preventDefault();
        dispatch(addDesigntion({ data: designation,successCB: handleSuccessCB }));
        
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
        width: '90%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',    
        borderRadius: '4px',
        marginBottom: '15px',
        backgroundColor: '#f9f9f9', 
      };

    return (
        <div>
            <Button onClick={handleOpen} >Add Designation</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2"style={{color:"white", fontSize:"20px"}}>
                        Add Designation
                    </Typography>
                    <form onSubmit={handleAddDesignation}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{color:"white", fontSize:"20px"}}>Name:</label>
                            <input
                                type="text"
                                name="designation"
                                value={designation.designation}
                                onChange={handleInputChange}
                                style={inputStyle}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{color:"white", fontSize:"20px"}}>Total Leave:</label>
                            <input
                                type="number"
                                name="total_leave"
                                value={designation.total_leave}
                                onChange={handleInputChange}
                                style={inputStyle}
                                required
                            />
                        </div>
                        <div>
                            <Button type="submit" variant="contained" color="primary">
                                Add
                            </Button>
                            <button onClick={handleClose}>Cancel</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default Form;
