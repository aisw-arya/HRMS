import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployeeData } from "../../store/display"; 
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Form from "../AddEmployee/index";
import Update from "../Update/index";
import UpdateLeave from "../updateLeave";
import { deleteEmployee } from "../../api/deleteEmployeeApi";
import {logout} from "../../api/logoutApi"
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';



function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
export default function Display(props) {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employeeData.data);
  const isLoading = useSelector((state) => state.employeeData.status);
  const navigate=useNavigate();

  useEffect(() => {
    dispatch(getEmployeeData());
  }, [dispatch]);

  const handleDelete=(employee_id)=>{
    deleteEmployee(employee_id);
    dispatch(getEmployeeData());
     }
    

  
  
  const handleClickLogout = () => {
    logout();
    console.log("logout")
    navigate("/")
    };



  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar sx={{backgroundColor:"white",height:"100%"}}>
          <Toolbar>
            <Typography variant="h6" component="div">

            <img src="loho1.jpg" alt="" style={{width:"100px",height:"100px",borderRadius:"100px"}}/>
            <h1 style={{color:"black"}}>Revolutionary Resolve </h1>
            <img src="office_image.jpg" alt="" style={{width:"1800px",height:"600px"}}/>
            <h5 style={{color:"red"}}>swipe up</h5>
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container sx={{}}>
        <Box sx={{ my: 2 }}>
          

    <>
      <Form />
      
      
      <div style={{ position: "fixed", top: 0, left: 0, padding: "5px" }}>
      <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>Back</Button>
      </div>
      <div style={{ position: "fixed", top: 0, right: 0, padding: "5px" }}>
      <Button variant="outlined" color="secondary" onClick={handleClickLogout}>Logout</Button>
        </div>

      {/* <div id="background"></div> */}
      {isLoading === "pending" ? (
        <div>Loading ...</div>
      ) : (
        <>
        

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          <div >
            <img src="loho1.jpg" alt="" style={{width:"100px",height:"100px"}}/>

            <h1 style={{ marginBottom: "20px" }}>Human Resource Management System</h1>
      
      </div>
            <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", borderRadius: "8px", overflow: "hidden"}}>
              <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Image</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Employee Name</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Leave Taken</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Designation</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Delete</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Update</th>
                </tr>
              </thead>
              <tbody>
                {employee.map((data) => (
                  <tr onDoubleClick={() =>navigate(`/employee/${data.employee_id}`)} key={data.id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <img src={data.image} alt={data.title} style={{ maxWidth: "100px", height: "100px", borderRadius: "8px" }} />
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>{data.employee_name}</td>
                    
                    <td style={{ padding: "10px", textAlign: "center" }}><UpdateLeave employeeData={data} employee_id={data.employee_id}/></td>
                    <td style={{ padding: "10px", textAlign: "center" }}>{data.designation}</td>
                    <td><Button variant="outlined" color="secondary" onClick={() => handleDelete(data.employee_id)}>Delete</Button></td>
                    <td><Update employeeData={data} employee_id={data.employee_id}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
            
        
          </div>
          <div style={{ position: "fixed", top: 50, right: 0, padding: "5px" }}>
      <Button variant="outlined" color="secondary"  onClick={() => navigate('/designation')}>Designation</Button>
      <Form />
        </div>
          
        </>
      )}
    </>

        </Box>
      </Container>
    </React.Fragment>
  );
}
