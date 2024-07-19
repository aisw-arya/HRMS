// // import { useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { getEmployeeData } from "../../store/display"; 
// // import { useNavigate } from "react-router-dom";
// // import Button from '@mui/material/Button';
// // import Form from "../AddEmployee/index";
// // import Update from "../Update/index";
// // import axios from 'axios';
// // import UpdateLeave from "../updateLeave";
// // import { deleteEmployee } from "../../api/deleteEmployeeApi";


// // const Display = () => {
// //   const dispatch = useDispatch();
// //   const employee = useSelector((state) => state.employeeData.data);
// //   const isLoading = useSelector((state) => state.employeeData.status);
// //   const navigate=useNavigate();

// //   useEffect(() => {
// //     dispatch(getEmployeeData());
// //   }, [dispatch]);

// //   const handleDelete=(employee_id)=>{
// //     deleteEmployee(employee_id);
// //     console.log("deleted")
// //   };
  
  
// //   const handleClickLogout = () => {
// //     const url = `${import.meta.env.VITE_BASE_URL}/logout`;
// //     return axios.post(url)
// //       .then((res) => {
// //         console.log("logout")
// //         navigate("/")
// //         return res; 
// //       })
// //       .catch((error) => {
// //         throw error; 
// //       });
// //   };

// //   return (
// //     <>
// //       <Form />
// //       <div><img src="loho1.jpg" alt="" style={{width:"100px",height:"100px"}}/>
// //       <h1>Revolutionary Resolve </h1>
// //       </div>
      
// //       <div style={{ position: "fixed", top: 0, left: 0, padding: "5px" }}>
// //       <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>Back</Button>
// //       </div>
// //       <div style={{ position: "fixed", top: 0, right: 0, padding: "5px" }}>
// //       <Button variant="outlined" color="secondary" onClick={handleClickLogout}>Logout</Button>
// //         </div>

// //       {/* <div id="background"></div> */}
// //       {isLoading === "pending" ? (
// //         <div>Loading ...</div>
// //       ) : (
// //         <>

// //           <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
// //             <h1 style={{ marginBottom: "1rem" }}>EMPLOYEES</h1>
// //             <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", borderRadius: "8px", overflow: "hidden" }}>
// //               <thead>
// //                 <tr style={{ backgroundColor: "#f2f2f2" }}>
// //                   <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Image</th>
// //                   <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Employee Name</th>
// //                   <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Leave Taken</th>
// //                   <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Designation</th>
// //                   <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Delete</th>
// //                   <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Update</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {employee.map((data) => (
// //                   <tr onDoubleClick={() =>navigate(`/employee/${data.employee_id}`)} key={data.id} style={{ borderBottom: "1px solid #ddd" }}>
// //                     <td style={{ padding: "10px", textAlign: "center" }}>
// //                       <img src={data.image} alt={data.title} style={{ maxWidth: "100px", height: "100px", borderRadius: "8px" }} />
// //                     </td>
// //                     <td style={{ padding: "10px", textAlign: "center" }}>{data.employee_name}</td>
                    
// //                     <td style={{ padding: "10px", textAlign: "center" }}><UpdateLeave employeeData={data} employee_id={data.employee_id}/></td>
// //                     <td style={{ padding: "10px", textAlign: "center" }}>{data.designation}</td>
// //                     <td><Button variant="outlined" color="secondary" onClick={() => handleDelete(data.employee_id)}>Delete</Button></td>
// //                     <td><Update employeeData={data} employee_id={data.employee_id}/></td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </>
// //       )}
// //     </>
// //   );
// // };

// // export default Display;





import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployeeData } from "../../store/display"; 
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Form from "../AddEmployee/index";
import Update from "../Update/index";
import axios from 'axios';
import UpdateLeave from "../updateLeave";
import { deleteEmployee } from "../../api/deleteEmployeeApi";
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
import SimpleBottomNavigation from "../../components/bottombar";


function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
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
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
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
    console.log("deleted")
  };
  
  
  const handleClickLogout = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/logout`;
    return axios.post(url)
      .then((res) => {
        console.log("logout")
        navigate("/")
        return res; 
      })
      .catch((error) => {
        throw error; 
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">

            <img src="loho1.jpg" alt="" style={{width:"100px",height:"100px"}}/>
            <h1>Revolutionary Resolve </h1>
            <img src="office_image.jpg" alt="" style={{width:"1800px",height:"800px"}}/>
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
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

          <div><img src="loho1.jpg" alt="" style={{width:"100px",height:"100px"}}/>

            <h1 style={{ marginBottom: "1rem" }}>EMPLOYEES</h1>
      
      </div>
            <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", borderRadius: "8px", overflow: "hidden" }}>
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
        </>
      )}
    </>

    <SimpleBottomNavigation/>
        </Box>
      </Container>
    </React.Fragment>
  );
}

// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getEmployeeData } from "../../store/display";
// import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
// import Form from "../AddEmployee/index";
// import Update from "../Update/index";
// import axios from "axios";
// import UpdateLeave from "../updateLeave";
// import { deleteEmployee } from "../../api/deleteEmployeeApi";

// const Display = () => {
//   const dispatch = useDispatch();
//   const employee = useSelector((state) => state.employeeData.data);
//   const isLoading = useSelector((state) => state.employeeData.status);
//   const navigate = useNavigate();
//   const [showHeader, setShowHeader] = useState(true);

//   useEffect(() => {
//     dispatch(getEmployeeData());
//   }, [dispatch]);

//   const handleDelete = (employee_id) => {
//     deleteEmployee(employee_id);
//     console.log("deleted");
//   };

//   const handleClickLogout = () => {
//     const url = `${import.meta.env.VITE_BASE_URL}/logout`;
//     axios
//       .post(url)
//       .then((res) => {
//         console.log("logout");
//         navigate("/");
//       })
//       .catch((error) => {
//         console.error("Logout error:", error);
//       });
//   };

//   const handleScroll = () => {
//     if (window.scrollY > 0) {
//       setShowHeader(false);
//     } else {
//       setShowHeader(true);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       {showHeader && (
//         <div style={{ position: "fixed", top: 0, left: 0, width: "100%", backgroundColor: "#fff", zIndex: 100, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", padding: "10px 0" }}>
//           <h1>Revolutionary Resolve</h1>
//           <img src="office_image.jpg" alt="" style={{ width: "1700px", height: "800px" }} />
          
//         </div>
//       )}

//       <Form />
//       <div style={{ marginTop: showHeader ? "150px" : "0" }}>
//         <h1>EMPLOYEES</h1>

//         {isLoading === "pending" ? (
//           <div>Loading ...</div>
//         ) : (
//           <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", borderRadius: "8px", overflow: "hidden" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#f2f2f2" }}>
//                 <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Image</th>
//                 <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Employee Name</th>
//                 <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Leave Taken</th>
//                 <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Designation</th>
//                 <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Delete</th>
//                 <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Update</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employee.map((data) => (
//                 <tr onDoubleClick={() => navigate(`/employee/${data.employee_id}`)} key={data.id} style={{ borderBottom: "1px solid #ddd" }}>
//                   <td style={{ padding: "10px", textAlign: "center" }}>
//                     <img src={data.image} alt={data.title} style={{ maxWidth: "100px", height: "100px", borderRadius: "8px" }} />
//                   </td>
//                   <td style={{ padding: "10px", textAlign: "center" }}>{data.employee_name}</td>
//                   <td style={{ padding: "10px", textAlign: "center" }}>
//                     <UpdateLeave employeeData={data} employee_id={data.employee_id} />
//                   </td>
//                   <td style={{ padding: "10px", textAlign: "center" }}>{data.designation}</td>
//                   <td>
//                     <Button variant="outlined" color="secondary" onClick={() => handleDelete(data.employee_id)}>
//                       Delete
//                     </Button>
//                   </td>
//                   <td>
//                     <Update employeeData={data} employee_id={data.employee_id} />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       <div style={{ position: "fixed", bottom: 0, right: 0, padding: "10px", backgroundColor: "#fff", boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)", display: showHeader ? "none" : "block" }}>
//         <Button variant="outlined" color="secondary" onClick={handleClickLogout}>
//           Logout
//         </Button>
//       </div>
//     </>
//   );
// };

// export default Display;



 

