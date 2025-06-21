import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatMenuCard = ({ title, description, to }) => {
  const navigate = useNavigate();

  return (
    <div
      className="border border-white border-3 rounded-4 shadow-lg p-5 mb-5 w-50 bg-info d-flex justify-content-between align-items-center"
      onClick={() => navigate(to)}
      style={{ cursor: 'pointer' }}
    >
      <div>
        <h3 className="fs-5 fw-bold mb-1">{title}</h3>
        <span className="fs-5 mb-1">{description}</span>
      </div>

      <div
        className="bg-white rounded-circle d-flex justify-content-center align-items-center"
        style={{ width: '50px', height: '50px' }}
      >

       <i className="bi bi-chevron-right" style={{ color: '#0dcaf0', fontSize: '20px' }}></i>

      </div>
    </div>
  );
};

export default ChatMenuCard;