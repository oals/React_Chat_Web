import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import ChatArchiveBox from '../components/chatArchivePage/ChatArchiveBox';
import { getChatArchive, setChatArchiveBookmarks, delChatArchive } from '../utils/api';
import { useAlert } from '../components/AlertProvider';
import Pagination from '../components/Pagination';

const ChatArchivePage = () => {

   const [isChatArchiveOpen, setIsChatArchiveOpen] = useState(false);
   const [chatArchives, setChatArchives] = useState([]);
   const [totalCount, setTotalCount] = useState(0);
   const [chatArchiveId, setChatArchiveId] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const [chatArchivesOption, setChatArchivesOption] = useState(false);
   const { alert } = useAlert();

  const fetchChatArchive = useCallback(async (page) => {
    try {
      const res = await getChatArchive(chatArchivesOption, page);
      const data = await res.json();
      setChatArchives(data.chatArchiveDtoList);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error('채팅 아카이브 가져오기 실패:', error);
    }
  }, [chatArchivesOption]);

   useEffect(() => {
     fetchChatArchive(1);
   }, [chatArchivesOption, fetchChatArchive]);

  const handleToggleBookmark = (chatArchiveId) => {
    setChatArchives(prev =>
      prev.map(item =>
        item.chatArchiveId === chatArchiveId
          ? { ...item, chatArchiveBookmarks: !item.chatArchiveBookmarks }
          : item
      )
    );
  };

   return (
      <div className="d-flex flex-column justify-content-start align-items-center min-vh-100 pt-5 bg-light">

      {isChatArchiveOpen && (
        <ChatArchiveBox
            chatArchiveId={chatArchiveId}
            chatArchiveOpenCallBack={() => setIsChatArchiveOpen(false)}
        />
      )}

      <div className="w-75">
      <div className="w-25 align-self-start mb-2">
         <div className="d-flex gap-2">
           <button
             className={`btn ${!chatArchivesOption ? 'btn-primary active' : 'btn-outline-primary'}`}
             onClick={() => setChatArchivesOption(false)}
           >
             전체
           </button>

           <button
             className={`btn ${chatArchivesOption ? 'btn-primary active' : 'btn-outline-primary'}`}
             onClick={() => setChatArchivesOption(true)}
           >
             즐겨찾기
           </button>
         </div>

      </div>
        <table className="table table-bordered table-hover bg-white shadow">
          <thead >
            <tr>
              <th scope="col" className="text-center">#</th>
              <th scope="col">제목</th>
              <th scope="col">저장일시</th>
              <th scope="col" className="text-center">즐겨찾기</th>
              <th scope="col" className="text-center">삭제</th>
            </tr>
          </thead>
          <tbody>
           {chatArchives.map((chatArchive, index) => (
             <tr
               key={chatArchive.chatArchiveId}
             >
               <th scope="row" className="text-center">{totalCount - ((currentPage - 1) * 10) - index} </th>
               <td

                 className=" fw-semibold"
                 style={{ cursor: 'pointer' }}
                onClick={() => {
                    setChatArchiveId(chatArchive.chatArchiveId)
                    setIsChatArchiveOpen(true)
                }}


                >{chatArchive.chatArchiveTitle}</td>
               <td>{chatArchive.chatArchiveDate.replace("T"," ")}</td>
               <td className="text-center">
                 <i
                   className={chatArchive.chatArchiveBookmarks ? "bi bi-star-fill" : "bi bi-star"}
                   style={{ color: chatArchive.chatArchiveBookmarks ? 'gold' : 'inherit', fontSize: '1.5rem' }}
                   onClick={(e) => {
                     setChatArchiveBookmarks(chatArchive.chatArchiveId)
                     handleToggleBookmark(chatArchive.chatArchiveId);
                     if (!chatArchive.chatArchiveBookmarks) {
                        alert('즐겨찾기가 완료되었습니다')
                     }
                   }}
                 ></i>
               </td>
                 <td className="text-center">
                    <i
                       onClick={(e) => {
                         delChatArchive(chatArchive.chatArchiveId)
                          fetchChatArchive(currentPage)
                         alert('삭제되었습니다')
                       }}
                       class="bi bi-trash"
                       style={{ fontSize: '1.5rem' }}
                    ></i>
                 </td>
             </tr>
           ))}
          </tbody>
        </table>
      </div>

     <Pagination
       totalPages={Math.ceil(totalCount / 10)}
       onPageChange={(page) => {
       setCurrentPage(page)
         fetchChatArchive(page)
       }}
     />

     </div>
   );
};

export default ChatArchivePage;