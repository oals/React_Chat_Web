import React from 'react';

const ChatStartMessageBox = ({startDate}) => {

  return (
      <div className="p-3">
         <div className="text-center border border-info">
            <span>익명의 상대와 1:1 채팅이 시작되었습니다!</span>
             <br/>
             <span>{startDate}</span>
         </div>

          <div className="text-center border border-info mt-3">
            <span>Tip. "q"를 입력하면 채팅을 종료할 수 있습니다. </span>
          </div>


      </div>
  );
};

export default ChatStartMessageBox;