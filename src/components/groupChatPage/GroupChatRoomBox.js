
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ChatMessage from '../chatRoomPage/ChatMessage';
import ChatStartMessageBox from '../chatRoomPage/ChatStartMessageBox';
import { connectChat, connectMatching, disconnectChat, disconnectMatching } from '../../stomp/stompManager';
import { useMember } from '../../contexts/MemberContext';
import { groupChatSend} from '../../utils/api';

const GroupChatRoomBox = ({ groupChatRoom, isShowGroupChatBoxOpenCallBack }) => {

 const scrollRef = useRef(null);
 const { memberId } = useMember();
 const [message, setMessage] = useState('');
 const [messageList, setMessageList] = useState([]);

 useEffect(() => {
     let isSubscribed = true; // cleanup용 플래그

     const start = async () => {
       try {
         await connectChat(`/topic/groupChat/${groupChatRoom.groupChatRoomId}`, memberId, (msg,senderId) => {
           if (!isSubscribed) return;

           setMessageList((prev) => [
                ...prev,
                {senderId : senderId, sender: 'other', text: msg },
           ]);
         });

       } catch (err) {
         console.error('연결 실패 또는 매칭 시작 실패:', err);
       }
     };

     start();

     return () => {
       isSubscribed = false;
       // connectChat이 웹소켓이라면 disconnect 로직도 여기에 추가!
     };

 }, [groupChatRoom, memberId]);

  useEffect(() => {
   if (scrollRef.current) {
     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
   }
  }, [messageList]);

 const handleChange = (e) => {
    setMessage(e.target.value);
  };

 const handleSend = () => {

   if (message.trim() === '') return;

    groupChatSend(groupChatRoom.groupChatRoomId, message);

    setMessageList((prev) => [
      ...prev,
      { sender: 'me', text: message }
    ]);

    setMessage('');
  };

  return (
   <div
     className="position-fixed top-50 start-50 translate-middle p-2 bg-white border rounded shadow"
     style={{ zIndex: 1051, width: '700px', height: '750px' }}
   >
   <div className="d-flex justify-content-between align-items-center w-100 px-3 py-2" style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6', borderRadius: '0 0 0px 0px' }}>

     <div className="text-primary fw-semibold" style={{ whiteSpace: 'nowrap', fontSize: '0.9rem' }}>
       #{groupChatRoom.groupChatRoomTopic}
     </div>

     <div className="text-center flex-grow-1 fw-bold" style={{ fontSize: '1.2rem', color: '#343a40' }}>
       {groupChatRoom.groupChatRoomTitle}
     </div>

   <div className="d-flex justify-content-end align-items-center gap-2">
    <div className="d-flex justify-content-end align-items-center gap-3">
      <div className="text-muted text-end" style={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}>
        👥 {groupChatRoom.currentParticipants} / {groupChatRoom.groupChatRoomMaxParticipants}
      </div>
      <button className="btn btn-sm btn-outline-danger" title="나가기"
       onClick={() => isShowGroupChatBoxOpenCallBack()}
      >
        <i className="bi bi-box-arrow-right"></i>
      </button>
    </div>
   </div>
   </div>


     <div
         ref={scrollRef}
         className="bg-white p-3"
         style={{ height: '640px', overflowY: 'auto' }}
     >
       <div className="d-flex justify-content-center my-1">
         <div className="bg-light text-secondary px-3 py-1 rounded-pill small">
            채팅방에 입장하셨습니다
         </div>
       </div>

         <ChatMessage messages={
            messageList
         } />
     </div>

        <div className="d-flex align-items-center gap-1">
           <input
             type="text"
             className="form-control flex-grow-1 rounded-3 shadow-sm border focus-ring focus-ring-primary"
             placeholder="대화를 시작해보세요."
              value={message}
             onChange={handleChange}
              style={{
                 fontSize: '15px',
                 backgroundColor: '#f9f9f9',
                 transition: 'all 0.2s ease-in-out',
               }}
             onKeyDown={(e) => {
                 if (e.key === 'Enter') {
                    handleSend();
                 }
               }}
           />
          <button
              onClick={ () => {
                handleSend();
              }}
            className="btn btn-info text-light"
            style={{ minWidth: '80px' }}
          >
          전송
          </button>

         </div>





</div>
  );
};

export default GroupChatRoomBox;