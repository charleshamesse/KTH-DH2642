import React from 'react';

const LoadingSpinner = ({ inline }) => (
  <div align="center" className={`loading-spinner ${inline ? ' inline' : ''}`}></div>
);

export default LoadingSpinner;
