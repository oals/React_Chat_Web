import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ChatMessage from '../chatRoomPage/ChatMessage';
import ChatStartMessageBox from '../chatRoomPage/ChatStartMessageBox';
import { getChatArchiveMessage } from '../../utils/api';

const ChatArchiveBox = ({ chatArchiveId, chatArchiveOpenCallBack }) => {
  const scrollRef = useRef(null);
  const [chatArchiveCreateDate, setChatArchiveCreateDate] = useState(null)
  const [chatArchiveJson, setChatArchiveJson] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getChatArchiveMessage(chatArchiveId);
        const archiveObj = await res.json();

        setChatArchiveCreateDate(archiveObj.data.chatArchiveCreateDate)
        setChatArchiveJson(JSON.parse(archiveObj.data.chatArchiveJson))

      } catch (error) {
        console.error('채팅 아카이브 메세지 가져오기 실패:', error);
      }
    };

    if (chatArchiveId) {
      fetchData();
    }
  }, [chatArchiveId]);


  return (
    <div className=" position-fixed top-50 start-50 translate-middle p-3 border border-dark rounded shadow" style={{ zIndex: 1051, width: '700px', height: '700px',  backgroundColor: '#111418' }}>
      <div
        ref={scrollRef}
        className="border border-dark p-2"
        style={{ height: '600px', overflowY: 'auto', backgroundColor: '#111418' }}
      >
        <ChatStartMessageBox
          startDate={chatArchiveCreateDate ? chatArchiveCreateDate.replace("T", " ").split(".")[0] : ''}
        />

        {chatArchiveJson && (
          <ChatMessage messages={chatArchiveJson} />
        )}

      </div>

      <div className="d-flex justify-content-center gap-2 pt-3 ">
        <button className="btn btn-dark" onClick={() => chatArchiveOpenCallBack(false)}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default ChatArchiveBox;