import React from 'react';

const LoadingSpinner = ({ inline }) => (
  <div className="loading-spinner-div">
    <div align="center" className={`loading-spinner ${inline ? ' inline' : ''}`}></div>
  </div>
);

export default LoadingSpinner;
