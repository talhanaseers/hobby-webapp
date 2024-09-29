import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Amplify } from 'aws-amplify'; // Correctly importing Amplify
import awsconfig from './aws-exports'; // Ensure this path is correct

// Pages
import App from './App';
import Profile from './Components/Pages/Profile';
import Journal from './Components/Pages/Journal';
import MatchMaking from './Components/Pages/MatchMaking';
import ErrorPage from './Components/Pages/ErrorPage'; // Ensure this import exists

// Configure Amplify
Amplify.configure(awsconfig);

// Setting up routes between pages
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, // Note the capitalization
  },
  {
    path: "/MatchMaking",
    element: <MatchMaking />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/Journal",
    element: <Journal />,
  },
]);

// Existing index.js code
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/* Use RouterProvider */}
  </React.StrictMode>
);

reportWebVitals();
