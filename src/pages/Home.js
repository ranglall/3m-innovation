import React from 'react';
import './Home.css';
import AutoGuardPackage from "../images/AutoGuardPackage.png";


const Home = () => {
  return (
    <div className="home-container">
      <div className="content-left">
        <div className="tag">NEW | Refillable Car Air Filter</div>
        <h1>AutoGuard</h1>
        <p className="description">
                  Autoguard delivers next-generation engine protection with filters that are replaceable, customizable, and refillable. Designed for performance and flexibility, our filters help optimize airflow and engine efficiency while giving drivers more control over maintenance. Built to meet the needs of modern vehicles, Autoguard keeps your engine protected, your way.
</p>
           <button className="pricing-button">VIEW PRICE</button>

        
        <div className="stats-section">
          <div className="stat">
            <div className="stat-number">20%</div>
            <div className="stat-label">Less Waste</div>
            <div className="stat-desc">than traditional air filters, by weight</div>
          </div>
          
          <div className="stat">
            <div className="stat-number">42%</div>
            <div className="stat-label">More Microparticle Capture</div>
            <div className="stat-desc">than the MERV 12 minimum requirements </div>
          </div>
          
          <div className="stat">
            <div className="stat-number">75%</div>
            <div className="stat-label">Less Space</div>
            <div className="stat-desc">when storing and disposing</div>
          </div>
        </div>
        
        <div className="source-section">
          <div className="source-header">Breathe Easy, Drive Clean — Refill After Refill:</div>
          <div className="source-item">✔ CERTIFIED Asthma & Allergy Friendly</div>
          <div className="source-item">✔ Remove over 95% pollen</div>
          <div className="source-item">✔ Remove 50% microparticles</div>
          <div className="source-item">✔ Lasts up to 12 months</div>
        </div>
        
        <div className="footer-text">
          Uses Filtrete Refillable Air Filter Technology        </div>
      </div>
      
      <div className="image-right">
          <img src={AutoGuardPackage} alt="Descriptive Alt Text" />
        </div>
      </div>
  );
};

export default Home;