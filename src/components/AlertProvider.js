import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const alert = useCallback((message, timeout = 1600) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, timeout);
  }, []);

  return (
    <AlertContext.Provider value={{ alert }}>
      {children}
      <div className="position-fixed top-0 start-50 translate-middle-x p-3" style={{ zIndex: 1055 }}>
        {alerts.map(({ id, message }) => (
          <FadeOutAlert key={id} message={message} />
        ))}
      </div>
    </AlertContext.Provider>
  );
};

const FadeOutAlert = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <div
      className={`alert alert-info alert-dismissible fade ${visible ? 'show' : ''}`}
      role="alert"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingRight: '1rem',
        paddingLeft: '1rem'
      }}
    >
      {message}
    </div>
  );
};
