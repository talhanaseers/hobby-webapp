import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Journal.css";

// Simulating user authentication and matches
const currentUser = { id: 1, name: "John" }; // Replace with actual authenticated user
const matches = [2, 3]; // IDs of users who match with the current user

function Journal() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Example journal entries (replace with real data from your database)
  const allJournalEntries = [
    { id: 1, userId: 1, userName: "John", text: "My Journal", file: null },
    { id: 2, userId: 2, userName: "Jane", text: "Jane's Journal", file: null },
    { id: 3, userId: 3, userName: "Alex", text: "Alex's Journal", file: null },
    {
      id: 4,
      userId: 4,
      userName: "Chris",
      text: "Chris's Journal",
      file: null,
    },
  ];

  const publicEvents = [
    {
      id: 1,
      name: "Community Meetup",
      date: "October 3rd, 2024",
      link: "/events/community-meetup",
    },
    {
      id: 2,
      name: "Music Festival",
      date: "October 10th, 2024",
      link: "/events/music-festival",
    },
    {
      id: 3,
      name: "Charity Run",
      date: "October 15th, 2024",
      link: "/events/charity-run",
    },
  ];

  useEffect(() => {
    // Filter out journal entries that are from the user or their matches
    const visibleEntries = allJournalEntries.filter(
      (entry) =>
        entry.userId === currentUser.id || matches.includes(entry.userId)
    );
    setJournalEntries(visibleEntries);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newEntry.trim()) {
      const newJournalEntry = {
        text: newEntry,
        file: selectedFile ? URL.createObjectURL(selectedFile) : null,
        userId: currentUser.id, // Assign the current user's ID to the new journal entry
        userName: currentUser.name,
      };
      setJournalEntries([...journalEntries, newJournalEntry]);
      setNewEntry("");
      setSelectedFile(null);
    }
  };

  return (
    <div className="journal-page">
      <h1>General Page</h1>

      {/* Form to submit a new journal entry */}
      <form onSubmit={handleSubmit} className="journal-form">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write your journal here..."
          rows="4"
        />

        {/* File Upload Input */}
        <div className="file-input">
          <label htmlFor="file-upload">Upload a photo or file:</label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>

        <button type="submit">Post Journal</button>
      </form>

      {/* Display all journal entries visible to the current user */}
      <div className="journal-feed">
        <h2>Your Matches' Journal Entries</h2>
        {journalEntries.length > 0 ? (
          journalEntries.map((entry, index) => (
            <div key={index} className="journal-entry">
              <p>
                <strong>{entry.userName}:</strong> {entry.text}
              </p>
              {entry.file && (
                <div className="journal-file">
                  <img
                    src={entry.file}
                    alt="Uploaded file"
                    className="uploaded-file"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No journal entries yet.</p>
        )}
      </div>

      {/* Public events section */}
      <div className="public-events">
        <h2>Public Events Nearby</h2>
        <ul>
          {publicEvents.map((event) => (
            <li key={event.id}>
              {/* Link to the event page */}
              <Link to={event.link} className="event-link">
                {event.name} - {event.date}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Journal;
