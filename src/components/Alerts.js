// Alerts.js
import React from 'react';


const Alerts = ({ type, message }) => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
    
  );
};

export default Alerts;
