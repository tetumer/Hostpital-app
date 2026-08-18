import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientList from "./PatientList";
import 'bootstrap/dist/css/bootstrap.min.css'
import PatientDetails from "./PatientDetails";
import DoctorList from "./DoctorList";
import DoctorDetails from "./DoctorDetails";
import Appointments from "./Appointments";
import DepartmentList from "./DepartmentList";
import DepartmentDetails from "./DepartmentDetails";
import PrescriptionList from "./PrescriptionList";
import LabReports from "./LabReports";
import Dashboard from "./Dashboard";
import Bill from "./Bill";
import Reception from "./Reception";
import Register from "./Register"
import Login from "./Login";
import Settings from "./Settings";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/patients" element={<PatientList />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/departments/:id" element={<DepartmentDetails />} />
        <Route path="/prescriptions" element={<PrescriptionList />} />
        <Route path="/labreports" element={<LabReports />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/reception" element={<Reception />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
