import Login from "./pages/Login"
import Home from "./pages/Home";
import Employees from "./pages/Employee";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path ="/employee/:employee_id" element={<Employees/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
