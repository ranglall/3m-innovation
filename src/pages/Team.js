import React from "react";
import "./Team.css";
import { FaLinkedin } from "react-icons/fa"; // npm install react-icons

//import headshots
import breannaHeadshot from "../images/breanna_headshot.jpg";
import dominicHeadshot from "../images/dominic_headshot.jpg";

const teamMembers = [
  {
    name: "Martin Grinnel",
    title: "Finance Intern",
    description: "School",
    img: "https://source.unsplash.com/300x300/?portrait,woman",
    linkedin: "https://linkedin.com/in/ryan-samuel"
  },
  {
    name: "Breanna Ranglall",
    title: "R&D Intern",
    description: "Senior at the University of St. Thomas pursuing a B.S. in Computer Science & Data Science",
    img: breannaHeadshot,
    linkedin: "https://www.linkedin.com/in/ranglall/"
  },
  {
    name: "Aleah Anderson",
    title: "IT Strategy Intern",
    description: "School",
    img: "https://source.unsplash.com/300x300/?portrait,woman",
    linkedin: "https://linkedin.com/in/nora-hazel"
  },
  {
    name: "Dominic Debo",
    title: "CBG Fiels Sales Intern",
    description: "Senior at the University of Toledo pursuing a B.B.A in Professional Sales",
    img: dominicHeadshot,
    linkedin: "https://linkedin.com/in/dominic-debo"
  },
  {
    name: "Olivia Hanson",
    title: "CBG Marketing Intern",
    description: "School",
    img: "https://source.unsplash.com/300x300/?portrait,woman",
    linkedin: "https://linkedin.com/in/sophie-carter"
  }
];

export default function Team() {
  return (
    <div className="team-container">
      <h1>Meet the Team</h1>
      <p className="subheader">
        As 3M Summer 2025 interns, we started as strangers and were handed the thrilling challenge of reimagining a 3M product with total creative freedom.      </p>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.img} alt={member.name} className="team-img" />
            <h2>{member.name}</h2>
            <h3>{member.title}</h3>
            <p>{member.description}</p>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="linkedin-icon" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
