import React from 'react';

function OurStory() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        textAlign: 'center',
        flexDirection: 'column',
        padding: '0 20px',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to the Home Page!</h1>
      <p style={{ fontSize: '1.5rem', maxWidth: '700px' }}>
        We are five interns from different backgrounds—Finance, R&D, IT, Sales, and Marketing—united by a shared passion to challenge the status quo. Together, we set out to create something meaningful: Autoguard’s innovative refillable and customizable air filters. This project became more than just an internship—it became our chance to make a real impact on how engines are cared for. By blending creativity, technology, and teamwork, we’re proud to introduce a solution that empowers drivers to protect their engines smarter and more sustainably. This is just the beginning of our journey, and we’re excited to drive innovation forward.
      </p>
    </div>
  );
}

export default OurStory;