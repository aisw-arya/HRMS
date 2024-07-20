import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDesignationListData } from "../../store/designationList"; 
import { useNavigate } from "react-router-dom";
import Form from "../AddDesignation";
import Button from '@mui/material/Button';
import Update from "../upadateDesignation";
import { deleteDesignation } from "../../api/deleteDesignation";

const Designation = () => {
  const dispatch = useDispatch();
  const designation = useSelector((state) => state.getDesignationListData.data);
  const isLoading = useSelector((state) => state.getDesignationListData.status);
  console.log(designation,"listtttttt")
  const navigate=useNavigate();

  const handleClickBack =() =>{
      navigate('/display');
  }

 
  useEffect(() => {
    dispatch(getDesignationListData());
  }, [dispatch]);
  
  const handleDelete=(designation_id)=>{
    deleteDesignation(designation_id);
    dispatch(getDesignationListData());
  }
  
  return (
    <>
      {isLoading === "pending" ? (
        <div>LOADING ...</div>
      ) : (
        <>
        <Form/>
        <div style={{ position: "fixed", top: 0, left: 0, padding: "5px" }}>
        <Button variant="outlined" color="secondary" onClick={handleClickBack}>back</Button>
      </div>
        <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>
  <h1 style={{ marginBottom: "1rem" }}>Designation</h1>
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      overflow: "hidden",
    }}
  >
    <thead>
      <tr style={{ backgroundColor: "#f2f2f2" }}>
        <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Designation Name</th>
        <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Total Taken</th>
        <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Delete</th>
        <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>Update</th>


      </tr>
    </thead>
    <tbody>
      {designation.map((data) => (
        <tr key={data.id} style={{ borderBottom: "1px solid #ddd" }}>
          <td style={{ padding: "10px", textAlign: "center" }}>{data.designation}</td>
          <td style={{ padding: "10px", textAlign: "center" }}>{data.total_leave}</td>
          <td>           
          <Button variant="outlined" color="secondary"   onClick={() => handleDelete(data.designation_id)} >Delete</Button></td>
          <td><Update designationData={data} designation_id={data.designation_id}/></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </>
      )}

    </>
  );
};

export default Designation;

