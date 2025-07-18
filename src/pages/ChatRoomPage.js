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

const ChatRoomPage = ({matchCancelCallBack}) => {

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

          const now = new Date();
          setChatStartTime(now);

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
  <div style={{ width:  isMatching ? '750px' : '900px', height: '700px',}}>
     {!isMatching ? (
        <MatchingWaitBox
          isMatching={isMatching}
          matchCancelCallBack={()=>{
              matchCancelCallBack()}
          }
        />
      ) : (

    <div className="d-flex w-100 justify-content-center align-items-center" style={{backgroundColor: '#111418'  }}>
      <div className="text-dark w-100 d-flex flex-column justify-content-between border border-dark" style={{ maxWidth: '750px', minHeight: '700px'}}>

        <div>
        </div>

        <ChatStartMessageBox
           startDate={chatStartTime}
        />


        <div ref={scrollRef} className="p-3" style={{ height: '500px', overflowY: 'auto' }}>

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
       <div
         className="position-fixed w-50 translate-middle"
         style={{ top: '80%', left: '40%' }}
        >
           <ChatExitMessageBox
             matchCancelCallBack={()=> matchCancelCallBack()}
             isReMatching={() => {
               setMessageList([])
               disconnectChat();
               setIsExit(false)
               setIsMatching(false)
               setIsChatArchiveSave(false)
             }}
             setIsShowChatSavePopupOpenCallBack={() => setIsShowChatSavePopup(true)}
           />
        </div>

        )}

          <div className="d-flex align-items-center gap-1">
            <input
              type="text"
              className="form-control flex-grow-1 rounded-3 shadow-sm custom-input border-dark"
              placeholder="대화를 시작해보세요."
              value={message}
              onChange={handleChange}
              style={{
                  backgroundColor: '#283039',
                  borderTopRightRadius: '0.75rem',
                  borderBottomRightRadius: '0.75rem',
                  color: '#ffffff',
                  paddingLeft: '0.75rem'
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
              className="btn btn-dark text-light"
              style={{ minWidth: '80px' }}
              disabled={isExit}
            >
              전송
            </button>
          </div>
      </div>
    </div>
        )}
    </div>
  );
};

export default ChatRoomPage;