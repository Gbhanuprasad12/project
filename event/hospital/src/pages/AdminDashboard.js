import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddPatient from '../components/AddPatient';
import PatientList from '../components/PatientList';

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  // Fetch admin details using token
  useEffect(() => {
    const token = Cookies.get('adminToken');
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setAdmin(decoded);
      const query = `
        query {
          admin(name: "${decoded.name}", contact: "${decoded.contact}") {
            name
            contact
          }
        }
      `;

      axios.post('http://localhost:4000/graphql', { query }, {
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
        setAdmin(res.data.data.admin);
      }).catch(err => {
        console.error('Error fetching admin:', err);
      });
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }, []);

  // Fetch all appointments
  useEffect(() => {
    const query = `
      query {
        appointments {
          patientName
          doctor
          date
        }
      }
    `;

    axios.post('http://localhost:4000/graphql', { query }, {
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      setAppointments(res.data.data.appointments);
    }).catch(err => {
      console.error('Error fetching appointments:', err);
    });
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Remove the token from cookies
    Cookies.remove('adminToken');
    // Redirect to home page
    navigate('/');
  };

  return (
    <div>
      <h1>event Admin Dashboard</h1>
      <h2>events availability</h2>

      {admin ? (
        <div>
          <p><strong>Admin Name:</strong> {admin.name}</p>
          <p><strong>Contact:</strong> {admin.contact}</p>
        </div>
      ) : (
        <p>Loading admin info...</p>
      )}

      <button onClick={handleLogout}>Logout</button>

      <hr />

      <h2>All Events registrations </h2>
      <ul>
        {appointments.map((appt, index) => (
          <li key={index}>
            <strong>participate name:</strong> {appt.patientName} | 
            <strong> event name:</strong> {appt.doctor} | 
            <strong> Date:</strong> {appt.date}
          </li>
        ))}
      </ul>

      <hr />

      <AddPatient />
      <PatientList />
    </div>
  );
}
