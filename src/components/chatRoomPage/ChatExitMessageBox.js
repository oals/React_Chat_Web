import React, { useState, useEffect } from 'react';

const ChatExitMessageBox = ({isReMatching, setIsShowChatSavePopupOpenCallBack}) => {

   const [endTime, setEndTime] = useState('');

   useEffect(() => {
     const now = new Date();
     const formatted = now.toISOString().slice(0, 19).replace("T", " ");
     setEndTime(formatted);
   }, []);

  return (
        <div className="text-center border border-info m-3 p-3" style={{height: "150px"}} >
           <span>익명의 상대와 1:1 채팅이 종료되었습니다.</span>
           <br/>
           <span>{endTime}</span>
           <br/>
           <div>
            <button
                onClick={isReMatching}
               className="btn btn-info text-light m-3"
               style={{ minWidth: '80px' }}
               >
               다시 매칭
            </button>
            <button
              onClick={() => setIsShowChatSavePopupOpenCallBack()}
              className="btn btn-info text-light m-3"
              style={{ minWidth: '80px' }}>
              대화 저장
            </button>

           </div>
      </div>
  );
};

export default ChatExitMessageBox;