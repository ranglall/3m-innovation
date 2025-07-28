import React from 'react';
import './OurStory.css';

function OurStory() {
  return (
    <div className="our-story-container">
      <header className="story-header">
        <h1>Our Story</h1>
        <div className="header-decoration"></div>
      </header>
      
      <div className="story-content">
        <div className="diagonal-pattern"></div>
        
        <div className="story-text">
          <div className="story-paragraph">
            <p>We are five interns from different backgrounds—Finance, R&D, IT, Sales, and Marketing—united by a shared passion to challenge the status quo.</p>
          </div>
          
          <div className="story-paragraph">
            <p>Together, we set out to create something meaningful: Autoguard's innovative refillable and customizable air filters. This project became more than just an internship, it became our chance to make a real impact on how engines are cared for.</p>
          </div>
          
          <div className="story-paragraph">
            <p>By blending creativity, technology, and teamwork, we're proud to introduce a solution that empowers drivers to protect their engines smarter and more sustainably.</p>
          </div>
          
          <div className="story-paragraph">
            <p>This is just the beginning of our journey, and we're excited to drive innovation forward now and for the rest of our careers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurStory;