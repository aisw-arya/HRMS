import Login from "./pages/Login"
import Display from "./pages/EmployeeDetails";
import Employees from "./pages/Employee";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Designation from "./pages/Designation"
function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/display" element={<Display/>}/>
          <Route path ="/employee/:employee_id" element={<Employees/>}/>
          <Route path ="/designation" element={<Designation/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
