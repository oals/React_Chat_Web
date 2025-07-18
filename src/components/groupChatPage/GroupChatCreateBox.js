
import React from 'react';
import { useState } from 'react';
import { groupChatCreate } from '../../utils/api';
import { useAlert } from '../../components/AlertProvider';
;
const GroupChatCreateBox = ({ isShowGroupChatCreateBoxOpenCallBack, groupChatRoomCreateCompleteCallBack }) => {

  const {alert} = useAlert()
  const [groupChatRoomTitleTitle, setGroupChatRoomTitleTitle] = useState("");
  const [groupChatRoomTopic, setGroupChatRoomTopic] = useState("자유");

  return (
    <div
      className="position-fixed top-50 start-50 translate-middle p-3 border rounded shadow d-flex flex-column justify-content-between"
      style={{ zIndex: 1051, width: '700px', height: '700px', backgroundColor: '#111418' }}
    >
      <div>
        <h4 className="mb-4 text-center text-white py-3 rounded shadow-sm" style={{backgroundColor: '#283039'}}>
          <i className="bi bi-chat-dots me-2"></i>채팅방 생성
        </h4>
        <div className="mb-4">
          <label htmlFor="chatTitle" className="form-label fw-bold text-white">
            📌 채팅방 제목
          </label>
          <input
            type="text"
            className="form-control shadow-sm rounded-3 px-3 py-2 custom-input border-dark"
            id="chatTitle"
            placeholder="예: 이야기 할 사람"
            value={groupChatRoomTitleTitle}
            onChange={(e) => setGroupChatRoomTitleTitle(e.target.value)}
             style={{
               backgroundColor: '#283039',
               borderTopRightRadius: '0.75rem',
               borderBottomRightRadius: '0.75rem',
               color: '#ffffff',
               paddingLeft: '0.75rem'
             }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="chatTopic" className="form-label fw-bold text-white">
            🗂️ 주제 선택
          </label>
          <select
            className="form-select shadow-sm rounded-3 px-3 py-2 border-dark"
            id="chatTopic"
            value={groupChatRoomTopic}
            onChange={(e) => setGroupChatRoomTopic(e.target.value)}
            style={{
              backgroundColor: '#283039',
              borderTopRightRadius: '0.75rem',
              borderBottomRightRadius: '0.75rem',
              color: '#ffffff',
              paddingLeft: '0.75rem'
            }}
          >
            <option value="자유">자유</option>
            <option value="취미">취미</option>
            <option value="자기개발">자기개발</option>
            <option value="운동">운동</option>
            <option value="취업">취업</option>
          </select>
        </div>
      </div>

      <div>
        <div className="text-center ">
          <button className="btn  w-100 text-white"
           style={{backgroundColor: '#283039'}}
            onClick={ async () => {
              await groupChatCreate(groupChatRoomTitleTitle, groupChatRoomTopic)
              await groupChatRoomCreateCompleteCallBack()
              alert('채팅방이 생성되었습니다.')

            }}
          >채팅방 생성</button>
        </div>
        <div className="text-center mt-2">
          <button className="btn w-100 text-white"
           style={{backgroundColor: '#283039'}}
            onClick={() => isShowGroupChatCreateBoxOpenCallBack()}
          >닫기</button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatCreateBox;