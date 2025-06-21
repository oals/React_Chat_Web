import React from 'react';
import { useState } from 'react';

const ChatArchiveSaveBox = ({callBack}) => {

  const [chatTitle, setChatTitle] = useState("");

  return (
    <div className="position-fixed top-50 start-50 translate-middle p-4 bg-white border rounded shadow" style={{ zIndex: 1050, width: '500px' }}>
            <h5 className="mb-3">💾 대화 저장</h5>

              <input
                type="text"
                className="form-control mb-3 px-4 py-2 rounded-3 shadow-sm border border-secondary-subtle focus-ring focus-ring-primary"
                placeholder="ex) 재밌는 사람과 대화"
                value={chatTitle}
                onChange={(e) => setChatTitle(e.target.value)}
                style={{
                  fontSize: '15px',
                  backgroundColor: '#f9f9f9',
                  transition: 'all 0.2s ease-in-out',
                }}
              />

            <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-primary">
               저장
             </button>
             <button className="btn btn-secondary" onClick={() => callBack(false)}>
               닫기
             </button>

            </div>
          </div>
  );
};

export default ChatArchiveSaveBox;