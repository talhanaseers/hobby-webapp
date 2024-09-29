
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import React from 'react';

import './custom-styles.css';

import SiteNav from "../Commons/SiteNav";
import SiteFooter from "../Commons/SiteFooter";

import { React, useState } from "react";
import { Amplify } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import './Profile.css'; 
import profilePic from './profilepic.jpg';

import awsExports from "../../aws-exports";
import { deleteUser } from "aws-amplify/auth";

Amplify.configure(awsExports);

async function deleteAccount() {
  try {
    await deleteUser();
  } catch (error) {
    console.log(error);
  }
}

const hobbies = [
    "Fishing",
    "Kayaking",
    "Hiking",
    "Gaming",
    "Cooking",
    "Cycling",
    "Photography",
    "Drawing",
    "Reading",
    "Gardening",
    "Traveling",
    "Music",
    "Programming",
    "Running",
    "Rock Climbing",
    "Bird Watching",
    "Skiing",
    "Dancing",
    "Swimming",
    "Yoga",
    "Writing",
    "Chess",
    "Camping",
    "Archery",
    "Painting",
    "Surfing",
    "Weightlifting",
    "Snowboarding",
    "Martial Arts",
    "Meditation",
    "Basketball",
    "Football",
    "Tennis",
    "Golf",
    "Pottery",
    "Baking",
    "Scuba Diving",
    "Skateboarding",
    "Knitting",
    "Woodworking",
    "Astrophotography",
    "Astronomy",
    "Pilates",
    "Volunteering",
    "Sailing",
    "Metalworking",
    "Origami",
    "CrossFit",
    "Journaling",
    "Table Tennis",
    "Horseback Riding",
    "Bouldering",
];

const modeOfTransport = [
  "Car",
  "Motorcycle",
  "Bicycle",
  "E-Bike",
  "Bus",
  "Uber/Lyft",
  "Horse",
  "None",
];

export function readProfile() {
  let profile = localStorage.getItem("profile");
  if (profile) {
    try {
      profile = JSON.parse(profile);
    } catch (e) {
      console.log(e);
      profile = {
        hobbies: [],
        modeOfTransport: [],
        bio: "I enjoy outdoor activities and learning new things.",
        location: "", // Initialize location
      };
    }
    console.log(profile);
  } else {
    profile = {
      hobbies: [],
      modeOfTransport: [],
      bio: "I enjoy outdoor activities and learning new things.",
      location: "", // Initialize location
    };
  }
  return profile;
}

export default function Profile() {
  let profile = readProfile();
  const [selected_hobbies, set_selected_hobbies] = useState(profile.hobbies);
  const [selected_modeOfTransport, set_selected_modeOfTransport] = useState(profile.modeOfTransport);
  const [bio, set_bio] = useState(profile.bio);
  const [location, set_location] = useState(profile.location); // New state for location

  const toggleHobby = (option) => {
    if (selected_hobbies.includes(option)) {
      set_selected_hobbies(selected_hobbies.filter((item) => item !== option));
    } else {
      set_selected_hobbies([...selected_hobbies, option]);
    }
  };

  const toggleModeOfTransport = (option) => {
    if (selected_modeOfTransport.includes(option)) {
      set_selected_modeOfTransport(
        selected_modeOfTransport.filter((item) => item !== option)
      );
    } else {
      set_selected_modeOfTransport([...selected_modeOfTransport, option]);
    }
  };

  const [editing, setEditing] = useState(null);

  const save = () => {
    setEditing(false);
    let profile = {
      hobbies: selected_hobbies,
      modeOfTransport: selected_modeOfTransport,
      bio: bio,
      location: location, // Include location in profile
    };
    localStorage.setItem("profile", JSON.stringify(profile));
  };

  const renderName = (name) => {
    if (editing) {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form.Control
            placeholder={`${name}`}
            type="text"
            style={{ width: "50%" }}
          />
        </div>
      );
    } else {
      return <p>{name}</p>;
    }
  };

  const renderHobbies = () => {
    if (editing) {
      return (
        <div className="checkbox-grid">
          {hobbies.map((option) => (
            <div key={`${option}`} style={{ display: "inline-block" }}>
              <Form.Check
                type="checkbox"
                id={`hobby-${option}`}
                label={`${option}`}
                checked={selected_hobbies.includes(option)}
                onChange={() => toggleHobby(option)}
              />
            </div>
          ))}
        </div>
      );
    } else {
      return hobbies
        .filter((option) => selected_hobbies.includes(option))
        .map((option) => (
          <Badge
            pill
            key={`${option}`}
            bg="secondary"
            className="badge"
          >
            {`${option}`}
          </Badge>
        ));
    }
  };

  const renderModeOfTransport = () => {
    if (editing) {
      return (
        <div className="checkbox-grid">
          {modeOfTransport.map((option) => (
            <div key={`${option}`} style={{ display: "inline-block" }}>
              <Form.Check
                type="checkbox"
                id={`mode-${option}`}
                label={`${option}`}
                checked={selected_modeOfTransport.includes(option)}
                onChange={() => toggleModeOfTransport(option)}
              />
            </div>
          ))}
        </div>
      );
    } else {
      return modeOfTransport
        .filter((option) => selected_modeOfTransport.includes(option))
        .map((option) => (
          <Badge
            pill
            key={`${option}`}
            bg="secondary"
            className="badge"
          >
            {`${option}`}
          </Badge>
        ));
    }
  };

  const renderBio = () => {
    if (editing) {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form.Control
            as="textarea"
            placeholder="Tell us about yourself"
            style={{ height: "100px", width: "50%" }}
            value={bio}
            onChange={(e) => set_bio(e.target.value)}
          />
        </div>
      );
    } else {
      return <p>{`${bio}`}</p>;
    }
  };

  const renderLocation = () => {
    if (editing) {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form.Control
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => set_location(e.target.value)} // Update location
            style={{ width: "50%" }}
          />
        </div>
      );
    } else {
      return <p>{`${location}`}</p>; // Display location
    }
  };

  const editButton = () => {
    if (editing) {
      return (
        <button
          style={{ margin: "10px" }}
          onClick={save}
          className="edit-button"
        >
          &#10003; Save
        </button>
      );
    } else {
      return (
        <button onClick={() => setEditing(true)} className="edit-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
          </svg>
        </button>
      );
    }
  };

  return (
    <Authenticator loginMechanism={["email"]}>
      {({ signOut, user }) => (
        <>
          <SiteNav user={user} signOut={signOut} />
          <div className="profile-container">
          

            <div style={{ textAlign: "center" }}>
            <Image
                src={profilePic}
                roundedCircle
                className="profile-image"
            />

              <h3>{renderName(user.username)}</h3>
              <h4>Location: {renderLocation()}</h4>
              <h4>Hobbies:</h4>
              {renderHobbies()}
              <h4>Mode of Transport:</h4>
              {renderModeOfTransport()}
              <h4>Bio:</h4>
              {renderBio()}
              <div style={{ textAlign: "center" }}>
                <div>{editButton()}</div>
                <Button
                  variant="danger"
                  onClick={deleteAccount}
                  style={{ marginTop: "20px" }}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
          <SiteFooter />
        </>
      )}
    </Authenticator>
  );
  
}
