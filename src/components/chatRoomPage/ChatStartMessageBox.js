import React from 'react';
import { formatChatStartTime } from '../../utils/comnUtils';

const ChatStartMessageBox = ({startDate}) => {
  return (
      <div className="p-3">
         <div className="text-center text-white">
           <h4>{formatChatStartTime(startDate)}</h4>

          <span className="text-secondary">Tip. "q"를 입력하면 채팅을 종료할 수 있습니다. </span>
         </div>
          <div className="text-center text-white mt-1">
           <span>익명의 상대와 1:1 채팅이 시작되었습니다!</span>
          </div>
      </div>
  );
};

export default ChatStartMessageBox;