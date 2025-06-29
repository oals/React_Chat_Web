
import React from 'react';
import { useState } from 'react';
import { groupChatCreate } from '../../utils/api';

const GroupChatCreateBox = ({ isShowGroupChatCreateBoxOpenCallBack, groupChatRoomCreateCompleteCallBack }) => {


  const [groupChatRoomTitleTitle, setGroupChatRoomTitleTitle] = useState("");
  const [groupChatRoomTopic, setGroupChatRoomTopic] = useState("");

  return (
    <div
      className="position-fixed top-50 start-50 translate-middle p-3 bg-white border rounded shadow d-flex flex-column justify-content-between"
      style={{ zIndex: 1051, width: '700px', height: '700px' }}
    >
      <div>
        <h4 className="mb-4 text-center bg-info text-white py-3 rounded shadow-sm">
          <i className="bi bi-chat-dots me-2"></i>채팅방 생성
        </h4>
        <div className="mb-4">
          <label htmlFor="chatTitle" className="form-label fw-bold">
            📌 채팅방 제목
          </label>
          <input
            type="text"
            className="form-control shadow-sm rounded-3 px-3 py-2 border-primary"
            id="chatTitle"
            placeholder="예: 이야기 할 사람"
            value={groupChatRoomTitleTitle}
            onChange={(e) => setGroupChatRoomTitleTitle(e.target.value)}
            style={{ backgroundColor: '#f9f9ff' }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="chatTopic" className="form-label fw-bold">
            🗂️ 주제 선택
          </label>
          <select
            className="form-select shadow-sm rounded-3 px-3 py-2 border-primary"
            id="chatTopic"
            value={groupChatRoomTopic}
            onChange={(e) => setGroupChatRoomTopic(e.target.value)}
            style={{ backgroundColor: '#f9f9ff' }}
          >
            <option value="자유">주제를 선택하세요</option>
            <option value="자유">자유</option>
            <option value="취미">취미</option>
            <option value="자기개발">자기개발</option>
            <option value="운동">운동</option>
          </select>
        </div>
      </div>

      <div>
        <div className="text-center ">
          <button className="btn btn-outline-info custom-hover-white w-100"
            onClick={() => {
              groupChatCreate(groupChatRoomTitleTitle, groupChatRoomTopic)
              groupChatRoomCreateCompleteCallBack()
            }}
          >채팅방 생성</button>
        </div>
        <div className="text-center mt-2">
          <button className="btn btn-outline-info custom-hover-white w-100"
            onClick={() => isShowGroupChatCreateBoxOpenCallBack()}
          >닫기</button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatCreateBox;