// App.js
import React from 'react';
import './App.css'; // Custom styles for your app
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap styles
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Link } from 'react-router-dom'; // Ensure this import is correct

// Importing commons
import SiteFooter from './Components/Commons/SiteFooter';

// Import logo
import logo from './logo.png'; // Adjust the path as necessary

Amplify.configure(awsconfig); // Configuring Amplify with your AWS configurations

function App() {
  return (
    <div>
      <div>
        <img src={logo} alt="Hobn'Go Logo" style={{ width: '100px', height: 'auto' }} /> {/* Adjust size as needed */}
        <h1>Hobn'Go</h1>
        <h3>
          <Link to='/Journal'>Create an account or login to get started</Link>
        </h3>
      </div>
      <SiteFooter />
    </div>
  );
}

export default App;
