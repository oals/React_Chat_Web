// MessageList.js
import React from 'react';

const ChatMessage = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, index) => {
        if (msg.sender === 'me') {
          return (
            <div key={index} className="d-flex justify-content-end mb-2">
              <div className="bg-info text-white p-2 rounded-pill">
                {msg.text}
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className="d-flex justify-content-start mb-2">
              <div className="bg-light text-dark p-2 rounded-pill">
                {msg.text}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ChatMessage;