import React, { useEffect } from "react";
import "./Notification.css";

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      {message}
      <button className="notification-close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Notification;