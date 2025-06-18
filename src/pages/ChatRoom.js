import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatRoom = () => {

 const [message, setMessage] = useState('');
 const [messageList, setMessageList] = useState([
   { sender: 'me', text: '안녕하세요!' },
   { sender: 'you', text: '반가워요 😊' },
 ]);
 const [isExit, setIsExit] = useState(false);
 const navigate = useNavigate();
 const scrollRef = useRef(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {

   if (message.trim() === '')
    return;

    if (message.toLowerCase() === 'q') {
        setIsExit(true)
    } else {
       setMessageList((prev) => [
         ...prev,
         { sender: 'me', text: message }
       ]);
    }

    setMessage('');
  };


 useEffect(() => {
   if (scrollRef.current) {
     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
   }
 }, [messageList]);

  return (

    <div className="min-vh-100 d-flex justify-content-center align-items-center">
     <div
       className="bg-light text-dark border border-3 rounded  w-75 d-flex flex-column justify-content-between"
       style={{ maxWidth: '1000px', height: '800px' }}
     >
       <div className="p-3">
          <div className="text-center border border-info">
             <span>익명의 상대와 1:1 채팅이 시작되었습니다!</span>
              <br/>
              <span>2025-06-23 21:53:23</span>
          </div>

           <div className="text-center border border-info mt-3">
                <span>Tip. "q"를 입력하면 채팅을 종료할 수 있습니다. </span>
           </div>
       </div>



      <div
        ref={scrollRef}
        className="bg-white p-3"
        style={{ height: '620px', overflowY: 'auto' }}
      >


       <div>
         {messageList.map((msg, index) => {
           if (msg.sender === 'me') {
             return (
               <div key={index} className="d-flex justify-content-end mb-2">
                 <div className="bg-info text-white p-2 rounded-pill">{msg.text}</div>
               </div>
             );
           } else {
             return (
               <div key={index} className="d-flex justify-content-start mb-2">
                 <div className="bg-light text-dark p-2 rounded-pill">{msg.text}</div>
               </div>
             );
           }
         })}
       </div>


      </div>


       {isExit && (
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
                     className="btn btn-info text-light m-3"
                     style={{ minWidth: '80px' }}>
                     채팅 내용 저장하기
                   </button>
                  <button
                     onClick={() => navigate("/chat")}
                     className="btn btn-info text-light m-3"
                     style={{ minWidth: '80px' }}>
                     돌아가기
                   </button>

                </div>
           </div>
       )}

       <div>
       <div className="d-flex align-items-center gap-2">
         <input
           type="text"
           className="form-control flex-grow-1"
           placeholder="대화를 시작해보세요."
           value={message}
           onChange={handleChange}
           onKeyDown={(e) => {
               if (e.key === 'Enter') {
                 handleSend(); // Enter 누르면 전송
               }
             }}
           disabled={isExit}
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

       </div>
     </div>
    </div>

  );
};

export default ChatRoom;