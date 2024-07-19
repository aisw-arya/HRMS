import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EmployeeData } from "../../store/getEmployee";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Card, CardContent, CardActions, Typography } from "@mui/material";
import { saveAs } from "file-saver";
import vCardsJS from "vcards-js";
import QRCode from "react-qr-code";

const Employees = () => {
  const dispatch = useDispatch();
  const { employee_id } = useParams();
  const employee = useSelector((state) => state.getEmployeeData.data);
  const isLoading = useSelector((state) => state.getEmployeeData.status);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(EmployeeData(employee_id));
  }, [dispatch, employee_id]);

  const handleClick = () => {
    navigate("/display");
  };
  console.log(employee,"vcrd")

  const generateVCard = (employee) => {
    // Create a new vCard
    const vCard = vCardsJS();

    // Set properties from employee data
    vCard.firstName = employee.employee_name.split(" ")[0];
    vCard.lastName = employee.employee_name.split(" ")[1];
    vCard.organization = "Your Company Name";
    vCard.photo.attachFromUrl(employee.image, "JPEG");
    vCard.workPhone = employee.phone_number; // Example phone number
    vCard.title = employee.designation;
    vCard.email = employee.email; // Example email
    vCard.note = "Notes about the employee";
    vCard.address = employee.address; // Example address

    // Generate the vCard string
    const vCardString = vCard.getFormattedString();

    // Create a Blob from the vCard string
    const blob = new Blob([vCardString], { type: "text/vcard" });

    // Use file-saver to save the vCard
    saveAs(blob, `${employee.employee_name.replace(/\s+/g, "_")}.vcf`);
  };

  return (
    <>
      
      {isLoading === "pending" ? (
        <div>LOADING ...</div>
      ) : (
        <>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClick}
            style={{ marginBottom: "1rem" }}
          >
            Back
          </Button>

          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
             
              <Card key={employee.id} style={{ cursor: "pointer" }}>
                <CardContent>
                  <img
                    src={employee.image}
                    alt={employee.employee_name}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                    }}
                  />
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{ textAlign: "center", marginBottom: "0.5rem" }}
                  >
                    {employee.employee_name}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    style={{ textAlign: "center", marginBottom: "0.5rem" }}
                  >
                    Leave Taken: {employee.leave_take}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ textAlign: "center" }}
                  >
                    Designation: {employee.designation}
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-around" }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => generateVCard(employee)}
                  >
                    Generate VCard
                  </Button>
                  <div style={{ textAlign: "center" }}>
                    <h4>Scan QR Code</h4>
                    <QRCode
                      value={`BEGIN:VCARD\nVERSION:3.0\nFN:${employee.employee_name}\nORG:${employee.organization}\nEMAIL:${employee.email}\nTEL:${employee.phone}\nADR:${employee.address}\nEND:VCARD`}
                      size={128}
                    />
                  </div>
                </CardActions>
              </Card>
            
          </div>
        </>
      )}
    </>
  );
};

export default Employees;
