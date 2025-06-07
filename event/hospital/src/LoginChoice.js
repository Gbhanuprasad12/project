import React from 'react';
import { Link } from 'react-router-dom';

const LoginChoice = () => {
  return (
    <div>
      <h1>EVENT MANAGEMENT SYSTEM</h1>
      <h2>Select Login Type</h2>
      <Link to="/login/admin"><button>event module</button></Link>
      <Link to="/login/patient"><button>registration module</button></Link>
    </div>
  );
};

export default LoginChoice;
