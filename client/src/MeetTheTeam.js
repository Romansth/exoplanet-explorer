import React from 'react';
import './MeetTheTeam.css'; // Importing the CSS for glowing circle effect

export function MeetTheTeam () {
    const teamMembers = [
        {
          name: 'Rojan Upreti',
          college: "William Paterson 26'",
          photo: 'assets/team/rojan.JPEG',
        },
        {
          name: 'Roman Shrestha',
          college: "Vassar College 26'",
          photo: 'assets/team/roman.JPEG',
        },
        {
          name: 'Rupesh Shrestha',
          college: "Caldwell University 28'",
          photo: 'assets/team/rupesh.JPEG',
        },
        {
          name: 'Saurav Ghimire',
          college: "Caldwell University 26'",
          photo: 'assets/team/saurav.JPEG',
        },
        
        {
          name: 'Sudip Pyakurel',
          college: "Caldwell University 26'",
          photo: 'assets/team/sudip.JPEG',
        },
        
      ];
  return (
    <div className="team-container">
      <h1>Meet the Team</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <div className="photo-circle">
              <img src={member.photo} alt={member.name} className="team-photo" />
            </div>
            <h3>{member.name}</h3>
            <p><h4>{member.college}</h4></p>
          </div>
        ))}
      </div>
    </div>
  );
};

