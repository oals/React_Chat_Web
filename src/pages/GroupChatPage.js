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
  const groupChatRoomTopics = ['전체', '자유', '취미', '운동', '취업'];
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
      console.error('그룹 채팅 가져오기 실패:', error);
    }
  }, []);

   useEffect(() => {
     fetchGroupChatRoom(1);
   }, [fetchGroupChatRoom, groupChatRoomTopic]);


  return (
         <div className="d-flex flex-column justify-content-start align-items-center min-vh-100 pt-5 bg-light">


    {isGroupChatCreateBoxOpen && (
      <>
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
          style={{ opacity: 0.5, zIndex: 1060 }}
        ></div>

        <div style={{ zIndex: 1061 }} className="position-fixed top-50 start-50 translate-middle">
           <GroupChatCreateBox
             groupChatRoomCreateCompleteCallBack={()=> {
               fetchGroupChatRoom(1)
               setIsGroupChatCreateBoxOpen(false)
              }
             }
             isShowGroupChatCreateBoxOpenCallBack={() => {
                 setIsGroupChatCreateBoxOpen(false)}
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
               isShowGroupChatBoxOpenCallBack={() => setIsGroupChatBoxOpen(false)}
           />

        </div>
      </>
    )}



            <div className="w-75">
            <div className="w-100">
              <div className="w-100 mb-3">
              <div className="d-flex justify-content-between align-items-end gap-2">
                <div className="d-flex flex-wrap gap-1">
                  {groupChatRoomTopics.map((topic) => (
                    <button
                      key={topic}
                      className={`btn white-nowrap px-3 ${
                        groupChatRoomTopic === topic ? 'btn-primary' : 'btn-outline-primary'
                      }`}
                      style={{ whiteSpace: 'nowrap' }}
                      onClick={() => {
                        setSearchText("")
                        setGroupChatRoomTopic(topic)
                      }}
                    >
                      {topic}
                    </button>
                  ))}



                </div>

              <div>

                <div className="d-flex gap-2 mb-2 justify-content-end">
                  <button
                    className="btn btn-primary active white-nowrap px-3"
                    onClick={() => setIsGroupChatCreateBoxOpen(true)}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    방 생성
                  </button>

                  <button
                    className="btn btn-primary active white-nowrap"
                    onClick={() => {
                      alert('새로고침');
                      fetchGroupChatRoom(currentPage);
                    }}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>


                <div className="input-group" style={{ minWidth: '600px' }}>
                 <input
                   type="text"
                   className="form-control"
                   placeholder="검색어를 입력하세요"
                   aria-label="Search"
                   value={searchText}
                   onChange={(e) => setSearchText(e.target.value)}
                   onKeyDown={(e) => {
                     if (e.key === 'Enter') {
                       fetchGroupChatRoom(1,searchText)
                     }
                   }}
                 />

                 <button
                   className="btn btn-outline-secondary"
                   type="button"
                   onClick={() => {
                     fetchGroupChatRoom(1,searchText)
                   }}
                 >
                   <i className="bi bi-search"></i>
                 </button>
                </div>
              </div>


              </div>
              </div>
            </div>

              <table className="table table-bordered table-hover bg-white shadow">
                <thead >
                  <tr>
                    <th scope="col" className="text-center">#</th>
                    <th scope="col">제목</th>
                    <th scope="col" className="text-center">주제</th>
                    <th scope="col" className="text-center">생성날짜</th>
                    <th scope="col" className="text-center">#</th>
                  </tr>
                </thead>
                <tbody>

                {groupChatRooms.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        참여 가능한 그룹 채팅방이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    groupChatRooms.map((groupChatRoom, index) => (
                      <tr
                        key={groupChatRoom.groupChatRoomId}
                      >
                          <th scope="row" className="text-center">{totalCount - ((currentPage - 1) * 10) - index} </th>

                          <td className=" fw-semibold" style={{ cursor: 'pointer' }}>
                            {groupChatRoom.groupChatRoomTitle}
                           </td>

                          <td className="text-center">{groupChatRoom.groupChatRoomTopic === "" ? '자유' : groupChatRoom.groupChatRoomTopic}</td>

                          <td className="text-center">{groupChatRoom.groupChatRoomCreateDate.replace("T"," ")}</td>

                          <td className="text-center">
                          <button
                            className="btn btn-primary active"
                             onClick={ async () => {
                               setGroupChatRoom(groupChatRoom)
                               joinGroupChatRoom(groupChatRoom.groupChatRoomId)
                               groupChatJoinMessage(groupChatRoom.groupChatRoomId)
                               setIsGroupChatBoxOpen(true)
                             }}
                            >
                            참가
                            </button>
                          </td>
                        </tr>

                     ))

                  )}

                </tbody>
              </table>
            </div>

            {totalCount !== 0 && (
             <Pagination
               totalPages={Math.ceil(totalCount / 10)}
               onPageChange={(page) => {
                   setCurrentPage(page)
                   fetchGroupChatRoom(page)
               }}
             />
            )}


           </div>
  );
};

export default GroupChatPage;