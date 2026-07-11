import React, { useState } from 'react';
import AlertContext from './AlertContext';

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);

  // Magic Alert Function with 2-second decay auto-cleanup wrapper
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });

    // Automatically clear out the alert state after exactly 2 seconds flat
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;