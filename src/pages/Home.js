import React from 'react';

function Home() {
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
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to Autoguard!</h1>
      <p style={{ fontSize: '1.5rem', maxWidth: '700px' }}>
        Autoguard delivers next-generation engine protection with filters that are replaceable, customizable, and refillable. Designed for performance and flexibility, our filters help optimize airflow and engine efficiency while giving drivers more control over maintenance. Built to meet the needs of modern vehicles, Autoguard keeps your engine protected—your way.
      </p>
    </div>
  );
}

export default Home;