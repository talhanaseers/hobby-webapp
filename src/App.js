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
    <div className="App">
      <div className="center-box">
        <img src={logo} alt="Hobn'Go Logo" className="App-logo" />
        <text className='description'>
          Looking to connect with others who share your passions? 
          Our platform makes it easy to find people with the same hobbies, 
          whether you're into sports, arts, gaming, or anything else. 
          Join today and start building meaningful connections around the things you love!
        </text>
        <h3>
          <Link to='/Journal' className="App-link">
            Login or Create Account
          </Link>
        </h3>
      </div>
      <SiteFooter />
    </div>
  );
}

export default App;