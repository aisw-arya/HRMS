import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDesignationListData } from "../../store/designationList";
import Form from "../AddDesignation";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Update from "../upadateDesignation";
import { deleteDesignation } from "../../api/deleteDesignation";

const Designation = () => {
    const dispatch = useDispatch();
    const designationList = useSelector((state) => state.getDesignationListData.data);
    const isLoading = useSelector((state) => state.getDesignationListData.status);


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
                    <Form />
               
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", marginTop: "3rem" }}>
                        <h1>Designations</h1>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
                            {designationList.map((designation) => (
                                <Card key={designation.designation_id} style={{ minWidth: "300px", maxWidth: "400px", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" style={{ marginBottom: "1rem", textAlign: "center" }}>
                                            {designation.designation}
                                        </Typography>
                                        <Typography variant="body1" component="div" style={{ marginBottom: "0.5rem", textAlign: "center" }}>
                                            Total leave: {designation.total_leave}
                                        </Typography>
                                        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                                            <Button variant="outlined" color="secondary" onClick={() => handleDelete(designation.designation_id)}>Delete</Button>
                                            <Update designationData={designation} designation_id={designation.designation_id} />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Designation;
