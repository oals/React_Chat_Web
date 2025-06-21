import React from 'react';
import ChatArchive from '../models/ChatArchive'; // 또는 올바른 경로로
import { useState, useRef } from 'react';
import ChatMessage from '../components/chatRoomPage/ChatMessage';

const ChatArchivePage = () => {

   const [isChatArchiveOpen, setIsChatArchiveOpen] = useState(false);
   const scrollRef = useRef(null);

   const archivesData = [
     {
       archiveId: 3,
       archiveTitle: '재밌는 사람과 대화',
       archiveDate: '2025-06-19 02:23',
       isArchiveBookmarks: false,
     },
     {
       archiveId: 2,
       archiveTitle: '유익한 대화 기록',
       archiveDate: '2025-06-20 10:30',
       isArchiveBookmarks: true,
     },
     {
       archiveId: 1,
       archiveTitle: '마음에 남는 토크',
       archiveDate: '2025-06-21 15:45',
       isArchiveBookmarks: false,
     },

   ];

   // ChatArchive 인스턴스 배열 생성
   const chatArchives = [];
   for (let i = 0; i < archivesData.length; i++) {
     chatArchives.push(new ChatArchive(archivesData[i]));
   }

   return (
     <div className="mt-3 d-flex flex-column justify-content-center align-items-center">


      {isChatArchiveOpen && (
            <div className=" position-fixed top-50 start-50 translate-middle p-4 bg-white border rounded shadow" style={{ zIndex: 1051, width: '700px', height: '700px' }}>


              <div
                  ref={scrollRef}
                     className="bg-white p-3"
                     style={{ height: '600px', overflowY: 'auto' }}
                   >

                   <ChatMessage messages={[
                     { sender: 'me', text: '안녕하세요!' },
                     { sender: 'you', text: '반가워요 😊' },

                   ]} />
              </div>


              <div className="d-flex justify-content-center gap-2 pt-3">

                  <button className="btn btn-secondary" onClick={() => setIsChatArchiveOpen(false)}>
                      닫기
                  </button>

              </div>
            </div>
          )}


      <div className="d-flex justify-content-center flex-wrap gap-3 mt-5 mb-4 " style={{width:"1100px"}}>
        {chatArchives.map((chatArchive, index) => (
          <div
            key={index}
            className="border rounded shadow-sm p-3 bg-white"
            style={{ width: '250px', position: 'relative' }}
            onClick={() => setIsChatArchiveOpen(true)}
          >
            <h5
              style={{ cursor: 'pointer', color: '#007bff' }}
            >
              {chatArchive.archiveTitle}
            </h5>
            <p className="text-muted small mb-2">ID: {chatArchive.archiveId}</p>
            <p className="mb-2">저장 시간: {chatArchive.archiveDate}</p>
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
              }}
              onClick={() =>
                alert(
                  chatArchive.isArchiveBookmarks
                    ? '즐겨찾기 해제'
                    : '즐겨찾기 추가'
                )
              }
            >
              {chatArchive.isArchiveBookmarks ? (
                <i className="bi bi-star-fill" style={{ color: 'gold', fontSize: '1.5rem' }}></i>
              ) : (
                <i className="bi bi-star" style={{ fontSize: '1.5rem' }}></i>
              )}
            </div>
          </div>
        ))}
      </div>


       <nav aria-label="Page navigation example">
         <ul className="pagination">
           <li className="page-item">
             <button
               type="button"
               className="page-link"
               aria-label="Previous"
               onClick={() => alert('prev')}
             >
               <span aria-hidden="true">&laquo;</span>
             </button>
           </li>
           <li className="page-item">
             <button
               type="button"
               className="page-link"
               onClick={() => alert('1')}

             >
               1
             </button>
           </li>
           <li className="page-item">
             <button
               type="button"
               className="page-link"
                onClick={() => alert('2')}
             >
               2
             </button>
           </li>
           <li className="page-item">
             <button
               type="button"
               className="page-link"
                onClick={() => alert('3')}
             >
               3
             </button>
           </li>
           <li className="page-item">
             <button
               type="button"
               className="page-link"
               aria-label="Next"
            onClick={() => alert('next')}
             >
               <span aria-hidden="true">&raquo;</span>
             </button>
           </li>
         </ul>
       </nav>

     </div>
   );
};

export default ChatArchivePage;