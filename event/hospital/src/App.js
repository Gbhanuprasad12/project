import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import AdminLogin from './AdminLogin';
import PatientLogin from './PatientLogin';
import LoginChoice from './LoginChoice';


function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<LoginChoice />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/patient" element={<PatientLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;










// # Get a patient by ID
// query {
//   patient(id: "PATIENT_ID") {
//     id
//     name
//     age
//     gender
//     contact
//   }
// }

// # Get all patients
// query {
//   patients {
//     id
//     name
//     age
//     gender
//     contact
//   }
// }

// # Login as patient
// query {
//   loginPatient(name: "John Doe", contact: "1234567890") {
//     id
//     name
//     contact
//     token
//   }
// }


// # Get an admin by ID
// query {
//   admin(id: "ADMIN_ID") {
//     id
//     name
//     contact
//   }
// }

// # Get all admins
// query {
//   admins {
//     id
//     name
//     contact
//   }
// }

// # Get all appointments
// query {
//   appointments {
//     id
//     patientName
//     doctor
//     date
//     createdAt
//   }
// }

// # Login as admin
// query {
//   loginAdmin(name: "Admin Name", contact: "9876543210") {
//     id
//     name
//     contact
//     token
//   }
// }


// # Add a new patient
// mutation {
//   addPatient(name: "Alice", age: 25, gender: "Female", contact: "9999999999") {
//     id
//     name
//     age
//     gender
//     contact
//   }
// }

// # Delete a patient
// mutation {
//   deletePatient(id: "PATIENT_ID") {
//     id
//     name
//   }
// }

// # Book an appointment
// mutation {
//   bookAppointment(patientName: "Alice", doctor: "Dr. Smith", date: "2025-05-10") {
//     id
//     patientName
//     doctor
//     date
//     createdAt
//   }
// }


// # Add an admin
// mutation {
//   addAdmin(name: "SuperAdmin", contact: "8888888888") {
//     id
//     name
//     contact
//   }
// }

// # Delete an admin
// mutation {
//   deleteAdmin(id: "ADMIN_ID") {
//     id
//     name
//   }
// }

// # (Admin) Delete a patient
// mutation {
//   deletePatient(id: "PATIENT_ID") {
//     id
//     name
//   }
// }



// add new admin in mongodb

// {
//   "_id": {
//     "$oid": "681d86ced546ccfca83f2429"
//   },
//   "name": "AdminName",
//   "contact": "1234567890"
// }