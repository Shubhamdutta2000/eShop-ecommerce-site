import { Alert } from '@material-ui/lab';
import React from 'react';

const Message = ({ varient, children }) => {
  return (
    <Alert className="mb-3" severity={varient}>
      {children}
    </Alert>
  );
};

export default Message;
