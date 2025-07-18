import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAlert } from '../components/AlertProvider';
import Pagination from '../components/Pagination';
import GroupChatCreateBox from '../components/groupChatPage/GroupChatCreateBox';
import GroupChatRoomBox from '../components/groupChatPage/GroupChatRoomBox';
import { getGroupChatRoom, joinGroupChatRoom, groupChatJoinMessage} from '../utils/api';

const GroupChatPage = () => {

  const { alert } = useAlert();
  const [isGroupChatCreateBoxOpen, setIsGroupChatCreateBoxOpen] = useState(false)
  const [groupChatRoom, setGroupChatRoom] = useState(null);
  const [isGroupChatBoxOpen, setIsGroupChatBoxOpen] = useState(false)
  const [groupChatRooms, setGroupChatRooms] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [groupChatRoomTopic, setGroupChatRoomTopic] = useState('전체');
  const groupChatRoomTopics = ['전체', '자유', '취미', '자기개발', '운동', '취업'];
  const groupChatRoomTopicRef = useRef(groupChatRoomTopic);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    groupChatRoomTopicRef.current = groupChatRoomTopic;
  }, [groupChatRoomTopic]);

  const fetchGroupChatRoom = useCallback(async (page,searchText = '') => {
    try {
      const res = await getGroupChatRoom(page, groupChatRoomTopicRef.current, searchText);
      const data = await res.json();

      setGroupChatRooms(data.groupChatRoomList);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error('그룹 채팅 가져오기 실패 :', error);
    }
  }, []);

   useEffect(() => {
     fetchGroupChatRoom(1);
   }, [fetchGroupChatRoom, groupChatRoomTopic]);

return (
    <div className="d-flex flex-column justify-content-start align-items-center min-vh-100 pt-5" style={{backgroundColor: '#111418'}}>
      {isGroupChatCreateBoxOpen && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
            style={{ opacity: 0.5, zIndex: 1060 }}
          ></div>

          <div style={{ zIndex: 1061 }} className="position-fixed top-50 start-50 translate-middle">
            <GroupChatCreateBox
              groupChatRoomCreateCompleteCallBack={ async () => {
                await fetchGroupChatRoom(1)
                setCurrentPage(1)
                setIsGroupChatCreateBoxOpen(false)
              }
              }
              isShowGroupChatCreateBoxOpenCallBack={() => {
                setIsGroupChatCreateBoxOpen(false)
              }
              }
            />
          </div>
        </>
      )}
      {isGroupChatBoxOpen && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
            style={{ opacity: 0.5, zIndex: 1060 }}
          ></div>

          <div style={{ zIndex: 1061 }} className="position-fixed top-50 start-50 translate-middle">
            <GroupChatRoomBox
              groupChatRoom={groupChatRoom}
              initGroupChatRoomList={() => fetchGroupChatRoom(currentPage)}
              isShowGroupChatBoxOpenCallBack={() => setIsGroupChatBoxOpen(false)}
            />
          </div>
        </>
      )}

      <div className="w-75 d-flex flex-column justify-content-start align-items-start">
        <div>
            <h4 className="text-white"> 그룹채팅 </h4>
        </div>

        <div className="w-50  py-3 ">
          <label className="w-100">
            <div className="input-group" style={{ height: '48px', borderRadius: '0.75rem', backgroundColor: '#283039' }}>
              <span className="input-group-text border-0" style={{ backgroundColor: '#283039', color: '#9caaba', borderTopLeftRadius: '0.75rem', borderBottomLeftRadius: '0.75rem' }}>
               <i class="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-0 text-white custom-input"
                style={{
                  backgroundColor: '#283039',
                  borderTopRightRadius: '0.75rem',
                  borderBottomRightRadius: '0.75rem',
                  color: '#ffffff',
                  paddingLeft: '0.75rem'
                }}
                 onChange={(e) => setSearchText(e.target.value)}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter') {
                     fetchGroupChatRoom(1, searchText)
                   }
                 }}
                placeholder="채팅방을 검색해보세요."
              />
            </div>
          </label>
        </div>
        <div className="mt-3">
            <h4 className="text-white"> 카테고리 </h4>
        </div>

          <div className="d-flex justify-content-between align-items-end w-100">
             <div className="d-flex flex-wrap gap-2">
               {groupChatRoomTopics.map((topic) => (
                 <button
                   key={topic}
                   className={`d-flex align-items-center justify-content-center px-3 py-1 rounded-pill border-0 ${
                     groupChatRoomTopic === topic
                       ? 'bg-light text-dark'
                       : 'bg-dark text-white bg-opacity-75'
                   }`}
                   style={{
                     height: '32px',
                     backgroundColor: groupChatRoomTopic === topic ? '' : '#283039',
                     fontSize: '0.875rem',
                     fontWeight: '500',
                     lineHeight: 'normal',
                     whiteSpace: 'nowrap'
                   }}
                   onClick={() => {
                     setCurrentPage(1);
                     setSearchText('');
                     setGroupChatRoomTopic(topic);
                   }}
                 >
                   {topic}
                 </button>
               ))}
             </div>

            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-md active white-nowrap border-0 px-3 text-white"
                onClick={() => setIsGroupChatCreateBoxOpen(true)}
                style={{ whiteSpace: 'nowrap', backgroundColor : '#283039' }}
              >
                방 생성
              </button>

              <button
                className="btn btn-md active white-nowrap border-0 text-white"
                onClick={() => {
                  alert('새로고침');
                  fetchGroupChatRoom(currentPage);
                }}
                style={{ whiteSpace: 'nowrap', backgroundColor : '#283039' }}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
           </div>


       <div className="w-100">
        <div className="table-responsive rounded-4 overflow-hidden border border-dark mt-3">
          <table className=" mb-0 text-white w-100" >
            <thead>
              <tr className="custom-table-header">
                <th style={{ width: '10%' }} className="px-4 py-3 text-sm fw-medium text-center">번호</th>
                <th style={{ width: '40%' }} className="px-4 py-3 text-sm fw-medium text-center">제목</th>
                <th style={{ width: '20%' }} className="px-4 py-3 text-sm fw-medium text-center">카테고리</th>
                <th style={{ width: '10%' }} className="px-4 py-3 text-sm fw-medium text-center">인원</th>
                <th style={{ width: '20%' }} className="px-4 py-3 text-sm fw-medium text-secondary text-center">입장</th>
              </tr>
            </thead>
            <tbody>
            {groupChatRooms.length === 0 ? (
               <tr>
                 <td colSpan="5" className="text-center py-5 text-muted ">
                   <i className="bi bi-emoji-frown text-white" style={{ fontSize: '2rem' }}></i><br />
                   <span className="text-white">참여 가능한 그룹 채팅방이 없습니다.</span>
                 </td>
               </tr>
             ) : (
               groupChatRooms.map((room, index) => (
                 <tr
                   key={room.groupChatRoomId}
                   className="align-middle"
                   style={{ borderBottom: '0.5px solid #3b4754' }}
                 >

                   <td className="text-center fw-bold p-3  text-secondary" style={{ width: '10%' }}>
                     {totalCount - ((currentPage - 1) * 10) - index}
                   </td>

                   <td
                     style={{ cursor: 'pointer', width: '40%' }}
                     className="fw-semibold text-white"
                     onClick={ async () => {
                       setGroupChatRoom(room);
                       await joinGroupChatRoom(room.groupChatRoomId, room.groupChatRoomTopic);
                       await groupChatJoinMessage(room.groupChatRoomId);
                       setIsGroupChatBoxOpen(true);
                     }}
                   >
                     {room.groupChatRoomTitle}
                   </td>

                   <td className="text-center" style={{ width: '20%' }}>
                     <span className="badge bg-dark">
                       {room.groupChatRoomTopic.trim() === '' ? '자유' : room.groupChatRoomTopic}
                     </span>
                   </td>

                   <td className="text-center text-white" style={{ width: '10%' }}>
                     {room.currentParticipants}명
                   </td>

                   <td className="text-center" style={{ width: '20%' }}>
                     <button
                       className="btn btn-outline-secondary btn-sm px-4 rounded-pill custom-hover-white"
                       onClick={ async () => {
                         setGroupChatRoom(room);
                         await joinGroupChatRoom(room.groupChatRoomId, room.groupChatRoomTopic);
                         await groupChatJoinMessage(room.groupChatRoomId);
                         setIsGroupChatBoxOpen(true);
                       }}
                     >
                       입장
                     </button>
                   </td>


                 </tr>
               ))
             )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center mt-3">
          {totalCount !== 0 && (
                 <Pagination
                   currentPage={currentPage}
                   totalPages={Math.ceil(totalCount / 10)}
                   onPageChange={(page) => {
                     setCurrentPage(page)
                     fetchGroupChatRoom(page)
                   }}
                 />
               )}
        </div>
      </div>
     </div>
    </div>
  );
};

export default GroupChatPage;