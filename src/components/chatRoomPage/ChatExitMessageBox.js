import React from 'react';

const ChatExitMessageBox = ({callBack}) => {

  return (
        <div className="text-center border border-info m-3 p-3" style={{height: "150px"}} >
           <span>익명의 상대와 1:1 채팅이 종료되었습니다.</span>
           <br/>
           <span>2025-06-23 21:53:23</span>
           <br/>
           <div>
            <button
               className="btn btn-info text-light m-3"
               style={{ minWidth: '80px' }}>
               다시 매칭
            </button>
            <button
              onClick={() => callBack(true)}
              className="btn btn-info text-light m-3"
              style={{ minWidth: '80px' }}>
              대화 저장
            </button>

           </div>
      </div>
  );
};

export default ChatExitMessageBox;