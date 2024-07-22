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



export default function Display() {
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
     
           

    <>
    <div style={{ position: "fixed", top: 0,left:"800px", padding: "5px" }}>
     <img src="logo.jpg" alt="" style={{width:"100px",height:"100px",borderRadius:"100px"}}/>
            <h1 style={{color:"black"}}>Revolutionary Resolve </h1>

          
      <Form />
      </div>
      
      <div style={{ position: "fixed", top: 0, left: 0, padding: "5px" }}>
      <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>Back</Button>
      </div>
      <div style={{ position: "fixed", top: 0, right: 0, padding: "5px" }}>
      <Button variant="outlined" color="secondary" onClick={handleClickLogout}>Logout</Button>
        </div>

      
      {isLoading === "pending" ? (
        <div>Loading ...</div>
      ) : (
        <>
        

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center",position: "fixed", top: "300px",left:"600px", padding: "5px",
             overflow: "auto", maxHeight: "calc(100vh - 350px)"}}>

          <div >

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
          
        </>
      )}
    </>

       
  );
}

