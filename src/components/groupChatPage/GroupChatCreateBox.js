
import React from 'react';
import { useState } from 'react';
import { groupChatCreate } from '../../utils/api';

const GroupChatCreateBox = ({ isShowGroupChatCreateBoxOpenCallBack }) => {


  const [groupChatRoomTitleTitle, setGroupChatRoomTitleTitle] = useState("");
  const [groupChatRoomMaxParticipants, setGroupChatRoomMaxParticipants] = useState("");
  const [groupChatRoomTopic, setGroupChatRoomTopic] = useState("");

  return (
   <div
     className="position-fixed top-50 start-50 translate-middle p-3 bg-white border rounded shadow"
     style={{ zIndex: 1051, width: '700px', height: '700px' }}
   >
  <h4 className="mb-4 text-center">채팅방 생성</h4>


    <div className="mb-3">
      <label htmlFor="chatTitle" className="form-label">채팅방 제목</label>
      <input type="text" className="form-control" id="chatTitle" placeholder="제목을 입력하세요"
        value={groupChatRoomTitleTitle}
         onChange={(e) => setGroupChatRoomTitleTitle(e.target.value)}

       />
    </div>

    <div className="mb-3">
      <label htmlFor="participantCount" className="form-label">참여 인원</label>
      <input type="number" className="form-control" id="participantCount" placeholder="예: 10" min="2"
       value={groupChatRoomMaxParticipants}
        onChange={(e) => setGroupChatRoomMaxParticipants(e.target.value)}

      />
    </div>

    <div className="mb-3">
      <label htmlFor="chatTopic" className="form-label">주제</label>
      <select className="form-select" id="chatTopic"
       value={groupChatRoomTopic}
        onChange={(e) => setGroupChatRoomTopic(e.target.value)}

      >
        <option value="">주제를 선택하세요</option>
        <option value="자유">자유</option>
        <option value="취미">취미</option>
        <option value="자기개발">자기개발</option>
        <option value="운동">운동</option>
      </select>
    </div>


    <div className="text-center">
      <button className="btn btn-primary"
         onClick={() => {
           groupChatCreate(groupChatRoomTitleTitle,groupChatRoomMaxParticipants,groupChatRoomTopic)
           isShowGroupChatCreateBoxOpenCallBack()
         }}
      >채팅방 생성</button>
    </div>
    <div className="text-center mt-3">
      <button className="btn btn-primary"
       onClick={() => isShowGroupChatCreateBoxOpenCallBack()}
      >닫기</button>
    </div>

</div>
  );
};

export default GroupChatCreateBox;