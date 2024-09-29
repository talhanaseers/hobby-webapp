import React, { useEffect, useRef } from "react";
import "./Matchmaking.css"; // Ensure you load the correct CSS
import { FaTrashAlt, FaHeart } from "react-icons/fa"; // Import icons from react-icons

function Matchmaking() {
  const matchData = {
    matchPic: "https://via.placeholder.com/80",
    coverPic: "https://via.placeholder.com/375x500",
    name: "Zack Corbin",
    age: 21,
    location: "Lawrence, KS",
    description: "Grab this box and swipe in your desired direction!",
    bio: "I love eating pizza and coding! In my free time, I enjoy playing basketball, cooking new recipes, and exploring new technologies.",
    interests: { Sports: 1, Technology: 2, Cooking: 2, Travel: 3 },
  };

  const interestColors = { 1: "#f7ca02", 2: "#2b1f99", 3: "#751326" };
  const matchPageRef = useRef(null);

  useEffect(() => {
    const matchPage = matchPageRef.current;
    let isDragging = false;
    let offsetX, offsetY;
    let initialX, initialY;

    const setInitialPosition = () => {
      initialX = matchPage.offsetLeft;
      initialY = matchPage.offsetTop;
    };

    const onMouseDown = (e) => {
      isDragging = true;
      offsetX = e.clientX - matchPage.offsetLeft;
      offsetY = e.clientY - matchPage.offsetTop;
      matchPage.style.cursor = "grabbing";
      matchPage.style.transition = "none";
      matchPage.classList.add("no-interaction");
    };

    const onMouseMove = (e) => {
      if (isDragging) {
        matchPage.style.left = `${e.clientX - offsetX}px`;
        matchPage.style.top = `${e.clientY - offsetY}px`;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      matchPage.style.cursor = "grab";
      matchPage.style.transition = "all 0.5s ease";
      matchPage.style.left = `${initialX}px`;
      matchPage.style.top = `${initialY}px`;
      matchPage.classList.remove("no-interaction");
    };

    setInitialPosition();

    matchPage.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      matchPage.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="matchmaking-container">
      {/* Trashcan Icon */}
      <div className="trash-icon">
        <FaTrashAlt />
      </div>

      {/* Heart Icon */}
      <div className="heart-icon">
        <FaHeart />
      </div>

      <div className="matchmaking-page" ref={matchPageRef}>
        <div className="header">
          <div className="name">
            {matchData.name}, {matchData.age}
          </div>
          <div className="match-pic">
            <img src="/ZackC1.jpg" alt="Zack's profile" />
          </div>
          <div className="location">
            <strong>{matchData.location}</strong>
          </div>
          <div className="description">{matchData.description}</div>
        </div>
        <div className="cover-photo">
          <img src="/ZackC.jpg" alt="Zack's profile" />
          <div className="interests">
            {Object.keys(matchData.interests).map((interest, index) => (
              <button
                key={index}
                className="interest-btn"
                style={{
                  backgroundColor:
                    interestColors[matchData.interests[interest]],
                  color: "white",
                }}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
        <div className="description-box">
          <p>{matchData.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default Matchmaking;
