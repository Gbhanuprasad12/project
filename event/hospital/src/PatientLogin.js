import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // For cookie handling

const PatientLogin = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = `
      query {
        loginPatient(name: "${name}", contact: "${contact}") {
          name
          contact
          token
        }
      }
    `;

    try {
      const response = await axios.post(
        "http://localhost:4000/graphql",
        { query: query },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { data } = response.data;

      if (data) {
        console.log(" registration successful:", data.loginPatient);

        // Set the token in cookie (valid for 1 hour)
        Cookies.set('patientToken', data.loginPatient.token, { expires: 1 / 24, path: '/' });

        // Navigate to patient dashboard
        navigate('/user');
      } else {
        console.error("Invalid login credentials");
      }
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
    }
  };

  return (
    <div className="login-form">
      <h2>registration for the event</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Contact:</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default PatientLogin;
