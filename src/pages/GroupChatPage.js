import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAlert } from '../components/AlertProvider';
import Pagination from '../components/Pagination';
import GroupChatCreateBox from '../components/groupChatPage/GroupChatCreateBox';
import GroupChatRoomBox from '../components/groupChatPage/GroupChatRoomBox';
import { getGroupChatRoom, joinGroupChatRoom} from '../utils/api';

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

  useEffect(() => {
    groupChatRoomTopicRef.current = groupChatRoomTopic;
  }, [groupChatRoomTopic]);


  const fetchGroupChatRoom = useCallback(async (page) => {
    try {

      const res = await getGroupChatRoom(page, groupChatRoomTopicRef.current);
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
              <GroupChatCreateBox
                isShowGroupChatCreateBoxOpenCallBack={() => setIsGroupChatCreateBoxOpen(false)}
              />
            )}

             {isGroupChatBoxOpen && (
               <GroupChatRoomBox
                    groupChatRoom={groupChatRoom}
                    isShowGroupChatBoxOpenCallBack={() => setIsGroupChatBoxOpen(false)}
                />
             )}

            <div className="w-75">
            <div className="w-100 mb-3">
              <div className="w-100 mb-3">
              <div className="d-flex justify-content-between align-items-center gap-2">
                <div className="d-flex flex-wrap gap-1">
                  {groupChatRoomTopics.map((topic) => (
                    <button
                      key={topic}
                      className={`btn white-nowrap px-3 ${
                        groupChatRoomTopic === topic ? 'btn-primary' : 'btn-outline-primary'
                      }`}
                      style={{ whiteSpace: 'nowrap' }}
                      onClick={() => {
                        setGroupChatRoomTopic(topic)
                      }}
                    >
                      {topic}
                    </button>
                  ))}
                   <button className="btn btn-primary active white-nowrap px-3" style={{ whiteSpace: 'nowrap' }}>
                     접속중인 방
                   </button>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary active white-nowrap px-3"
                    onClick={() => setIsGroupChatCreateBoxOpen(true)}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    방 생성
                  </button>


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
                    <th scope="col" className="text-center">참여인원</th>
                    <th scope="col" className="text-center">#</th>
                  </tr>
                </thead>
                <tbody>
                     {groupChatRooms.map((groupChatRoom, index) => (
                      <tr
                        key={groupChatRoom.groupChatRoomId}
                      >
                          <th scope="row" className="text-center">{totalCount - ((currentPage - 1) * 10) - index} </th>

                          <td className=" fw-semibold" style={{ cursor: 'pointer' }}
                           onClick={() => {
                                 setIsGroupChatCreateBoxOpen(true)
                           }}
                            >{groupChatRoom.groupChatRoomTitle}
                           </td>

                          <td className="text-center">{groupChatRoom.groupChatRoomTopic}</td>

                          <td className="text-center">{groupChatRoom.groupChatRoomCreateDate.replace("T"," ")}</td>

                          <td className="text-center">
                           {groupChatRoom.currentParticipants}/{groupChatRoom.groupChatRoomMaxParticipants}
                          </td>
                          <td className="text-center">
                          <button
                            className={'btn btn-primary active'}
                             onClick={() => {
                               setGroupChatRoom(groupChatRoom)

                               if (groupChatRoom.joinGroupChatRoom == false) {
                                joinGroupChatRoom(groupChatRoom.groupChatRoomId)
                               }

                               setIsGroupChatBoxOpen(true)
                             }}
                            >
                            참가
                            </button>
                          </td>
                        </tr>

                     ))}


                </tbody>
              </table>
            </div>

           <Pagination
             totalPages={Math.ceil(totalCount / 10)}
             onPageChange={(page) => {

             }}
           />

           </div>
  );
};

export default GroupChatPage;