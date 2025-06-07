import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

const AdminLogin = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define the GraphQL query
    const query = `
      query {
        loginAdmin(name: "${name}", contact: "${contact}") {
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

      // Handle success
      const { data } = response.data;
      if (data) {
        console.log("Login successful:", data.loginAdmin);

        // Store the token in a cookie using js-cookie
        Cookies.set('adminToken', data.loginAdmin.token, { expires: 1 / 24, path: '/' }); // 1 hour expiration

        // Navigate to the admin page
        navigate('/admin');
      } else {
        console.error("Invalid login credentials");
      }
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
    }
  };

  return (
    <div className="login-form">
      <h2>Admin Login</h2>
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

export default AdminLogin;
