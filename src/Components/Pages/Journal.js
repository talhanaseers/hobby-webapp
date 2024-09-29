
import React, { useEffect, useState } from 'react';

import React from 'react';
import './custom-styles.css';

// AWS imports

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Importing components from the correct path
import SiteNav from '../Commons/SiteNav'; 
import SiteFooter from '../Commons/SiteFooter';
import './Journal.css'; // Import a CSS file for styles (optional)

const Journal = () => {
  const [allJournalEntries, setAllJournalEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch journal entries from an API
  const fetchJournalEntries = async () => {
    try {
      const response = await fetch('/api/journal-entries'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAllJournalEntries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch journal entries when the component mounts
    fetchJournalEntries();
  }, []); // Run once on mount

  useEffect(() => {
    // Logic that depends on allJournalEntries
    console.log('Journal entries updated:', allJournalEntries);
  }, [allJournalEntries]); // Include allJournalEntries in the dependency array

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  return (
    <div className="journal-container">
      <h1>My Journal</h1>
      <ul className="journal-list">
        {allJournalEntries.map((entry) => (
          <li key={entry.id} className="journal-entry">
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>
            <span>{new Date(entry.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Wrapper component for authentication
function JournalPage() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <SiteNav logOut={signOut} /> {/* Custom Nav Component */}
          <Journal /> {/* Your main Journal component */}
          <SiteFooter /> {/* Custom Footer Component */}
        </div>
      )}
    </Authenticator>
  );
}

export default JournalPage;
