import React from 'react';
import ChatMenuCard from '../components/chatPage/ChatMenuCard';

const ChatPage = () => {

  return (
    <div className="bg-light text-white d-flex flex-column justify-content-center align-items-center py-5 mt-5">

      <ChatMenuCard
        title="1:1 랜덤 채팅"
        description="간단한 명령으로 랜덤한 상대와 1:1 채팅을 할 수 있습니다."
        to="/chatRoom"
      />

      <ChatMenuCard
        title="단체 채팅"
        description="채팅방을 만들어서 여러 사람과 함께 채팅을 할 수 있습니다."
        to="/groupChatPage"
      />

      <ChatMenuCard
        title="아카이브"
        description="저장한 대화 내용을 확인 할 수 있는 공간입니다."
        to="/chatArchive"
      />

    </div>
  );
};

export default ChatPage;