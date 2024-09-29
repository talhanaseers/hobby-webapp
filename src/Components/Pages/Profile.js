import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Profile.css";

function Profile() {
  const navigate = useNavigate(); // Initialize navigate

  const initialUserData = {
    profilePic: "https://via.placeholder.com/80", // Default profile picture
    coverPic: "https://via.placeholder.com/375x500", // Default cover photo
    name: "John Doe",
    age: 25,
    location: "1234 Street Street",
    bio: "Bio Goes Here",
    hobbies: "Basketball, Coding, Cooking, Music", // Default hobbies
  };

  // State to handle user data
  const [userData, setUserData] = useState(initialUserData);
  // State to handle animation and visibility of large box
  const [isExpanded, setIsExpanded] = useState(false);
  // State to handle temporary changes before saving
  const [tempProfilePic, setTempProfilePic] = useState(userData.profilePic);
  const [tempCoverPic, setTempCoverPic] = useState(userData.coverPic);
  const [tempName, setTempName] = useState(userData.name);
  const [tempAge, setTempAge] = useState(userData.age);
  const [tempLocation, setTempLocation] = useState(userData.location);
  const [tempBio, setTempBio] = useState(userData.bio);
  const [tempHobbies, setTempHobbies] = useState(userData.hobbies);

  // Toggle expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  // Save changes to user data
  const handleSave = () => {
    setUserData({
      ...userData,
      profilePic: tempProfilePic,
      coverPic: tempCoverPic,
      name: tempName,
      age: tempAge,
      location: tempLocation,
      bio: tempBio,
      hobbies: tempHobbies,
    });
    toggleExpand(); // Close the expanded box after saving
  };

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setTempProfilePic(reader.result); // Store image data temporarily
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cover picture change
  const handleCoverPicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setTempCoverPic(reader.result); // Store image data temporarily
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes for text fields
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  // Convert hobbies string to an array and create unique colors
  const hobbiesArray = userData.hobbies
    .split(", ")
    .map((hobby) => hobby.trim());
  const hobbyColors = ["#f7ca02", "#2b1f99", "#751326", "#5e4f7d", "#0b8457"];

  return (
    <div className={`profile-container ${isExpanded ? "expanded" : ""}`}>
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/")}>
        ⬅️ Back
      </button>

      {/* Profile Page (Phone) */}
      <div className="profile-page">
        {/* Header section with name, profile picture, age, and location */}
        <div className="header">
          <div className="name">{userData.name + ", " + userData.age}</div>
          <div className="profile-pic">
            <img src={userData.profilePic} alt="Profile" />
          </div>
          <div className="location">{userData.location}</div>
        </div>

        {/* Large Portrait Photo */}
        <div className="cover-photo">
          <img src={userData.coverPic} alt="Cover" />
          {/* Toggle Button */}
          <button className="expand-button" onClick={toggleExpand}>
            ➕ {/* Icon or text for button */}
          </button>
          <div className="interests">
            {hobbiesArray.map((hobby, index) => (
              <button
                key={index}
                className="interest-btn"
                style={{
                  backgroundColor: hobbyColors[index % hobbyColors.length], // Rotate through colors
                  color: "white", // White text for better contrast
                }}
              >
                {hobby}
              </button>
            ))}
          </div>
        </div>

        {/* Bio Section */}
        <div className="bio-box">
          <p>{userData.bio}</p>
        </div>
      </div>

      {/* Expanded Box */}
      <div className="expanded-box">
        <h2>Edit Profile</h2>

        {/* Profile Picture Upload */}
        <div className="input-section">
          <label htmlFor="profile-upload" className="input-label">
            Profile Picture:
          </label>
          <input
            type="file"
            id="profile-upload"
            className="file-input"
            accept="image/*"
            onChange={handleProfilePicChange} // Handle profile picture change
          />
        </div>

        {/* Main Picture Upload */}
        <div className="input-section">
          <label htmlFor="main-upload" className="input-label">
            Main Picture:
          </label>
          <input
            type="file"
            id="main-upload"
            className="file-input"
            accept="image/*"
            onChange={handleCoverPicChange} // Handle cover picture change
          />
        </div>

        {/* Name Input */}
        <div className="input-section">
          <label htmlFor="name-input" className="input-label">
            Update Name:
          </label>
          <input
            type="text"
            id="name-input"
            className="text-input"
            placeholder="Update your name..."
            value={tempName}
            onChange={handleInputChange(setTempName)} // Handle name change
          />
        </div>

        {/* Age Input */}
        <div className="input-section">
          <label htmlFor="age-input" className="input-label">
            Update Age:
          </label>
          <input
            type="number"
            id="age-input"
            className="text-input"
            placeholder="Update your age..."
            value={tempAge}
            onChange={handleInputChange(setTempAge)} // Handle age change
          />
        </div>

        {/* Location Input */}
        <div className="input-section">
          <label htmlFor="location-input" className="input-label">
            Update Location:
          </label>
          <input
            type="text"
            id="location-input"
            className="text-input"
            placeholder="Update your location..."
            value={tempLocation}
            onChange={handleInputChange(setTempLocation)} // Handle location change
          />
        </div>

        {/* Bio Text Input */}
        <div className="input-section">
          <label htmlFor="bio-input" className="input-label">
            Update Bio:
          </label>
          <input
            type="text"
            id="bio-input"
            className="text-input"
            placeholder="Update your bio here..."
            value={tempBio}
            onChange={handleInputChange(setTempBio)} // Handle bio change
          />
        </div>

        {/* Hobbies Input */}
        <div className="input-section">
          <label htmlFor="hobbies-input" className="input-label">
            Update Hobbies:
          </label>
          <input
            type="text"
            id="hobbies-input"
            className="text-input"
            placeholder="Update your hobbies..."
            value={tempHobbies}
            onChange={handleInputChange(setTempHobbies)} // Handle hobbies change
          />
        </div>

        {/* Save Button */}
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default Profile;
