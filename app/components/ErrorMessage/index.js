import React from 'react';

const ErrorMessage = () => (
  <div className="alert alert-danger" role="alert">
    {'Something went wrong. It seems like we can\'t reach our API.'}
  </div>
);

export default ErrorMessage;
