import React from 'react';
import { useEffect, useRef } from 'react';
import ChatMessage from '../chatRoomPage/ChatMessage';
import ChatStartMessageBox from '../chatRoomPage/ChatStartMessageBox';
import { getChatArchiveMessage } from '../../utils/api';

const ChatArchiveBox = ({ chatArchiveId, chatArchiveOpenCallBack }) => {
   const scrollRef = useRef(null);

   useEffect(() => {
     try {
       const res = getChatArchiveMessage(chatArchiveId);
       console.log(res)
     } catch (error) {
       console.error('채팅 아카이브 메세지 가져오기 실패:', error);
     }
   }, [chatArchiveId]);

   return (
            <div className=" position-fixed top-50 start-50 translate-middle p-4 bg-white border rounded shadow" style={{ zIndex: 1051, width: '700px', height: '700px' }}>
              <div
                  ref={scrollRef}
                     className="bg-white border-top border-bottom border-3"
                     style={{ height: '600px', overflowY: 'auto' }}
                   >
                   <ChatStartMessageBox />

                   <ChatMessage messages={[
                     { sender: 'me', text: '안녕하세요!' },
                     { sender: 'you', text: '반가워요 😊' },

                   ]} />
              </div>


              <div className="d-flex justify-content-center gap-2 pt-3">

                  <button className="btn btn-secondary" onClick={() => chatArchiveOpenCallBack(false)}>
                      닫기
                  </button>

              </div>
            </div>
   );
};

export default ChatArchiveBox;