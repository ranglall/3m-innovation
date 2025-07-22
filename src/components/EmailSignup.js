import { useState } from 'react';

function EmailSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <h2>Receive email alerts here:</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '0.5rem',
              width: '250px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              marginBottom: '1rem'
            }}
          />
          <br />
          <button type="submit" style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Submit
          </button>
        </form>
      ) : (
        <p>✅ Thank you! You’ll receive alerts at <strong>{email}</strong>.</p>
      )}
    </div>
  );
}

export default EmailSignup;