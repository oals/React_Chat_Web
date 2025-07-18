import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ChatMessage from '../chatRoomPage/ChatMessage';
import { connectChat, disconnectChat } from '../../stomp/stompManager';
import { useMember } from '../../contexts/MemberContext';
import { groupChatSend, groupChatRoomExit, getGroupChatRoomMemberCount } from '../../utils/api';

const GroupChatRoomBox = ({ groupChatRoom, isShowGroupChatBoxOpenCallBack, initGroupChatRoomList }) => {

  const scrollRef = useRef(null);
  const { memberId } = useMember();
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    const cleanup = async () => {
      await groupChatRoomExit(groupChatRoom.groupChatRoomId,groupChatRoom.groupChatRoomTopic)
      initGroupChatRoomList()
      disconnectChat();
    };
    window.addEventListener('beforeunload', cleanup);
    return () => {
      cleanup();
      window.removeEventListener('beforeunload', cleanup);
    };
  }, []);

  useEffect(() => {

    const selectGroupChatRoomMemberCount = async () => {
      try {
        const res = await getGroupChatRoomMemberCount(groupChatRoom.groupChatRoomId, groupChatRoom.groupChatRoomTopic);
        const memberCount = await res.json();
        groupChatRoom.currentParticipants = memberCount;
        setMemberCount(memberCount)
      } catch (err) {
        console.error('연결 실패 또는 매칭 시작 실패:', err);
      }
    };

    selectGroupChatRoomMemberCount();

  }, []);

  useEffect(() => {
    let isSubscribed = true; // cleanup용 플래그

    const start = async () => {
      try {
        await connectChat(`/topic/groupChat/${groupChatRoom.groupChatRoomId}`, memberId, (msg) => {
          if (!isSubscribed) return;

          if (msg.joinNotice) {
            groupChatRoom.currentParticipants++
            setMemberCount(groupChatRoom.currentParticipants)
          } else if (msg.exitNotice) {
            groupChatRoom.currentParticipants--
            setMemberCount(groupChatRoom.currentParticipants)
          }

          setMessageList((prev) => [
            ...prev,
            { senderId: msg.memberId, sender: 'other', text: msg.chatMessage, isJoinNotice: msg.joinNotice, isExitNotice: msg.exitNotice },
          ]);
        });

      } catch (err) {
        console.error('연결 실패 또는 매칭 시작 실패:', err);
      }
    };

    start();

    return () => {
      isSubscribed = false;
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
      className="position-fixed top-50 start-50 translate-middle p-2 border-dark rounded shadow "
      style={{ zIndex: 1051, width: '700px', height: '750px', backgroundColor: '#111418'}}
    >
      <div className="d-flex justify-content-between align-items-center w-100 px-3 py-2 border-bottom border-dark" style={{ backgroundColor: '#111418', borderRadius: '0 0 0px 0px' }}>

        <div className="text-dark fw-semibold" style={{ whiteSpace: 'nowrap', fontSize: '1.1rem' }}>
          <span className={`badge bg-${groupChatRoom.groupChatRoomTopic === '' ? 'secondary' : 'dark'} `}>
            {groupChatRoom.groupChatRoomTopic.trim() === '' ? '자유' : groupChatRoom.groupChatRoomTopic}
          </span>
        </div>

        <div className="text-center flex-grow-1 fw-bold" style={{ fontSize: '1.2rem', color: '#ffffff' }}>
          {groupChatRoom.groupChatRoomTitle}
        </div>

        <div className="d-flex justify-content-end align-items-center gap-2">
          <div className="d-flex justify-content-end align-items-center gap-3">
            <div className="text-muted text-end mb-1" style={{ whiteSpace: 'nowrap', fontSize: '0.85rem',color: '#ffffff'}}>
            <span style={{fontSize:'20px'}}>👥</span>
             <span className="text-white"> {memberCount}명 </span>
            </div>
            <button className="btn btn-sm bg-dark rounded-circle" title="나가기"
              onClick={() => {
                isShowGroupChatBoxOpenCallBack()
              }}
            >
              <i className="bi bi-box-arrow-right text-white "></i>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="p-3"
        style={{ height: '640px', overflowY: 'auto',backgroundColor: '#111418' }}
      >
        <div className="d-flex justify-content-center my-1">
          <div className="bg-dark text-white px-3 py-1 rounded-pill small">
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
          className="form-control flex-grow-1 rounded-3 shadow-sm border border-0  custom-input"
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
        />
        <button
          onClick={() => {
            handleSend();
          }}
          className="btn btn-dark text-light"
          style={{ minWidth: '80px' }}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default GroupChatRoomBox;