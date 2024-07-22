import Designation from "../Designation"
import Display from "../EmployeeDetails";

const Home=()=>{
   
    return(
        <>

        <div  style={{ 
            height: "100vh",  
            width: "400px",   
            backgroundColor: "ActiveBorder",  
            border: "1px solid black",  
            position: "fixed",  
            left: 0, 
            top:0,
            overflow: "auto" 
        }}>
           <Designation/>
        </div>
        <Display/>
        


</>
)
}



export default Home