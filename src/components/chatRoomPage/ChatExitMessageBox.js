import React, { useState, useEffect } from 'react';

const ChatExitMessageBox = ({isReMatching, setIsShowChatSavePopupOpenCallBack, matchCancelCallBack}) => {

   const [endTime, setEndTime] = useState('');

   useEffect(() => {
     const now = new Date();
     const formatted = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
     setEndTime(formatted);
   }, []);

  return (
        <div className="text-center border border-dark m-3 p-4 mb-5" style={{ minWidth : '500px' , height: "150px"}} >
           <span className="text-white">익명의 상대와 1:1 채팅이 종료되었습니다.</span>
           <br/>
           <span className="text-secondary">{endTime}</span>
           <br/>
           <div>
            <button
                onClick={isReMatching}
               className="btn btn-dark text-light m-2 mt-2"
               style={{ minWidth: '80px' }}
               >
               다시 매칭
            </button>

            <button
              onClick={() => setIsShowChatSavePopupOpenCallBack()}
              className="btn btn-dark text-light m-2 mt-2"
              style={{ minWidth: '80px' }}>
              대화 저장
            </button>
            <button
               onClick={()=>matchCancelCallBack()}
               className="btn btn-dark text-light m-2 mt-2"
               style={{ minWidth: '80px' }}
               >
               나가기
            </button>
           </div>
      </div>
  );
};

export default ChatExitMessageBox;