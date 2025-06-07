import React, { useEffect, useState } from 'react';
import  { jwtDecode }  from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  // Decode token on mount
  useEffect(() => {
    const token = Cookies.get('patientToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    const mutation = `
      mutation {
        bookAppointment(patientName: "${user.name}", doctor: "${doctor}", date: "${date}") {
          patientName
          doctor
          date
        }
      }
    `;

    try {
      const response = await axios.post(
        'http://localhost:4000/graphql',
        { query: mutation },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.data?.bookAppointment) {
        setMessage('Appointment booked successfully!');
        setDoctor('');
        setDate('');
      } else {
        setMessage('Failed to book appointment.');
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setMessage('Error occurred.');
    }
  };
   // Handle logout
    const handleLogout = () => {
      // Remove the token from cookies
      Cookies.remove('patientToken');
      // Redirect to home page
      navigate('/');
    };
    const handleFileUpload = async (e) => {
      e.preventDefault();
      if (!certificate) return;
    
      const formData = new FormData();
      formData.append('certificate', certificate);
    
      try {
        const res = await axios.post('http://localhost:4000/uploadcertificate', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setUploadMessage('Certificate uploaded successfully!');
        console.log('File URL:', res.data.filePath); // You can store this in DB if needed
      } catch (err) {
        console.error('Upload failed:', err);
        setUploadMessage('Failed to upload certificate.');
      }
    };
    
  if (!user) return <div>Loading user data...</div>;

  return (
    <div className="user-dashboard">
      <h1>Welcome, {user.name}</h1>
      <p><strong>Contact:</strong> {user.contact}</p>
      <button onClick={handleLogout}>logout</button>

      <hr />

      <h2>register for an event</h2>
      <form onSubmit={handleAppointmentSubmit}>
        <label>event Name:</label>
        <input
          type="text"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          required
        />

        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">register</button>
      </form>

      {message && <p>{message}</p>}
      <hr />
    <h2>upload your recent works</h2>
  <form onSubmit={handleFileUpload}>
  <input
    type="file"
    accept=".pdf,.jpg,.jpeg,.png"
    onChange={(e) => setCertificate(e.target.files[0])}
    required
  />
  <button type="submit">Upload </button>
</form>
{uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
}
