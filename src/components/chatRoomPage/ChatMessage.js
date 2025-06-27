// MessageList.js
import React from 'react';

const ChatMessage = ({ messages }) => {

  const safeMessages = Array.isArray(messages) ? messages : [];

  return (
    <div>
      {safeMessages.map((msg, index) => {

      if (msg.isJoinNotice === true){
         return (
            <div key={index} className="d-flex justify-content-center my-1">
             <div className="bg-light text-secondary px-3 py-1 rounded-pill small">
                익명{msg.senderId}님이 입장하셨습니다.
             </div>
           </div>
       );

      } else if (msg.isExitNotice === true) {
         return (
            <div key={index} className="d-flex justify-content-center my-1">
                        <div className="bg-light text-secondary px-3 py-1 rounded-pill small">
                           익명{msg.senderId}님이 퇴장하셨습니다.
                        </div>
                      </div>
         );
      } else if (msg.sender === 'me') {
          return (
            <div key={index} className="d-flex justify-content-end mb-2">
              <div className="bg-info text-white p-2 rounded-pill">
                {msg.text}
              </div>
            </div>
          );
      } else {
          return (
          <div key={index} className="d-flex flex-column align-items-start mb-2">
            <div className="bg-white text-secondary px-2 py-1 rounded small">
              익명{msg.senderId}
            </div>
            <div
              className="px-3 py-2 rounded"
              style={{
                backgroundColor: '#e9ecef',
                color: '#212529',
                borderRadius: '15px 15px 15px 0px',
                maxWidth: '70%',
              }}
            >
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