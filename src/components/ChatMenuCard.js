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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#0dcaf0"
          stroke="#0dcaf0"
          strokeWidth="1.5"
          className="bi bi-chevron-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      </div>
    </div>
  );
};

export default ChatMenuCard;