import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-form">
        <h1>Contact</h1>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Your name" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Your email" />

          <label htmlFor="message">Message</label>
          <textarea id="message" rows="4" placeholder="Your message"></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;