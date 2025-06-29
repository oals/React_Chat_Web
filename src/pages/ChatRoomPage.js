import React from 'react';
import { useState, useRef, useEffect } from 'react';
import ChatMessage from '../components/chatRoomPage/ChatMessage';
import MatchingWaitBox from '../components/chatRoomPage/MatchingWaitBox';
import ChatArchiveSaveBox from '../components/chatArchivePage/ChatArchiveSaveBox';
import ChatExitMessageBox from '../components/chatRoomPage/ChatExitMessageBox';
import ChatStartMessageBox from '../components/chatRoomPage/ChatStartMessageBox';
import { connectChat, connectMatching, disconnectChat, disconnectMatching } from '../stomp/stompManager';
import { matchStart, matchCancel, chatSend, chatSave } from '../utils/api';
import { useMember } from '../contexts/MemberContext';
import { useAlert } from '../components/AlertProvider';

const ChatRoomPage = () => {

 const { memberId } = useMember();
 const [message, setMessage] = useState('');
 const [messageList, setMessageList] = useState([]);
 const [chatRoomId, setChatRoomId] = useState(null);
 const [isExit, setIsExit] = useState(false);
 const scrollRef = useRef(null);
 const [isShowChatSavePopup, setIsShowChatSavePopup] = useState(false);
 const [isMatching, setIsMatching] = useState(false);
 const [isChatArchiveSave, setIsChatArchiveSave] = useState(false);
 const isMatchingRef = useRef(isMatching);
 const { alert } = useAlert();
 const [chatStartTime, setChatStartTime] = useState(null);

  useEffect(() => {
    const cleanup = () => {
      if (!isMatchingRef.current) {
         matchCancel();
      }
      disconnectMatching();
      disconnectChat();

    };
    window.addEventListener('beforeunload', cleanup);
    return () => {
      cleanup();
      window.removeEventListener('beforeunload', cleanup);
    };
  }, []);

  useEffect(() => {
     const start = async () => {
        try {
        await connectMatching(memberId, async (chatRoomDto) => {
          setIsMatching(true);
          setChatRoomId(chatRoomDto.chatRoomId);
          alert('매칭이 완료 되었습니다')
          setChatStartTime(new Date().toISOString().slice(0, 19).replace("T", " "))

          await connectChat(`/topic/chat/${chatRoomDto.chatRoomId}`, memberId, (msg) => {
             if (msg.chatMessage.toLowerCase() === 'q') {
                setIsExit(true)
                alert('대화가 종료 되었습니다')
             } else {
                setMessageList((prev) => [
                  ...prev,
                  {senderId : msg.memberId, sender: 'other', text: msg.chatMessage },
                ]);
              }
            });
          });
          await matchStart();
          } catch (err) {
            console.error('연결 실패 또는 매칭 시작 실패:', err);
          }
        }
    if (!isMatching) start();

  }, [memberId, isMatching, alert]);

  useEffect(() => {
   if (scrollRef.current) {
     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
   }
 }, [messageList]);

  useEffect(() => {
    isMatchingRef.current = isMatching;
  }, [isMatching]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {

   if (message.trim() === '') return;

    if (message.toLowerCase() === 'q') {
        setIsExit(true)
        alert('대화가 종료 되었습니다')
    }

    chatSend(chatRoomId, message);

    setMessageList((prev) => [
      ...prev,
      { sender: 'me', text: message }
    ]);

    setMessage('');
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-light text-dark border border-3 rounded  w-75 d-flex flex-column justify-content-between" style={{ maxWidth: '1000px', height: '700px' }}>

        {isMatching && (
          <ChatStartMessageBox
            startDate={chatStartTime}
          />
        )}

        {!isMatching && (
          <MatchingWaitBox
            isMatching={isMatching}
          />
        )}

        <div ref={scrollRef} className="bg-white p-3" style={{ height: '620px', overflowY: 'auto' }}>

          <ChatMessage messages={messageList} />

        </div>

        {isShowChatSavePopup && (
          <ChatArchiveSaveBox
            showChatSavePopupOpenCallBack={() => setIsShowChatSavePopup(false)}
            chatSaveCallBack={(chatArchiveTitle) => {
              if (!isChatArchiveSave) {
                chatSave(chatArchiveTitle, JSON.stringify(messageList))
                setIsChatArchiveSave(true)
                setIsShowChatSavePopup(false)
                alert('저장 되었습니다')
              } else {
                alert('이미 저장된 대화 입니다')
              }

            }}
          />
        )}

        {isExit && (
          <ChatExitMessageBox
            isReMatching={() => {
              setMessageList([])
              disconnectChat();
              setIsExit(false)
              setIsMatching(false)
              setIsChatArchiveSave(false)
            }}
            setIsShowChatSavePopupOpenCallBack={() => setIsShowChatSavePopup(true)}
          />
        )}

        {(isMatching) && (
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
              disabled={!isMatching || isExit}
            />
            <button
              onClick={handleSend}
              className="btn btn-info text-light"
              style={{ minWidth: '80px' }}
              disabled={isExit}
            >
              전송
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoomPage;