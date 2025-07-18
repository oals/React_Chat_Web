import React from 'react';
import { useState } from 'react';

const ChatArchiveSaveBox = ({showChatSavePopupOpenCallBack, chatSaveCallBack}) => {

  const [chatArchiveTitle, setChatArchiveTitle] = useState("");

  return (
    <div className="position-fixed top-50 start-50 translate-middle p-4  rounded shadow" style={{ zIndex: 1050, minWidth: '500px',backgroundColor: '#111418'  }}>
      <h5 className="mb-3 text-white">💾 대화 저장</h5>
      <input
        type="text"
        className="form-control mb-3 px-4 py-2 rounded-3 shadow-sm custom-input border-dark"
        placeholder="ex) 재밌는 사람과 대화"
        value={chatArchiveTitle}
        onChange={(e) => setChatArchiveTitle(e.target.value)}
        style={{
            backgroundColor: '#283039',
            borderTopRightRadius: '0.75rem',
            borderBottomRightRadius: '0.75rem',
            color: '#ffffff',
            paddingLeft: '0.75rem'
        }}
      />

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-dark" onClick={() => chatSaveCallBack(chatArchiveTitle)}>
          저장
        </button>
        <button className="btn btn-dark" onClick={() => showChatSavePopupOpenCallBack()}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default ChatArchiveSaveBox;