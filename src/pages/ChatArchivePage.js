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
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
            style={{ opacity: 0.5, zIndex: 1060 }}
          ></div>

          <div style={{ zIndex: 1061 }} className="position-fixed top-50 start-50 translate-middle">
            <ChatArchiveBox
              chatArchiveId={chatArchiveId}
              chatArchiveOpenCallBack={() => setIsChatArchiveOpen(false)}
            />
          </div>
        </>
      )}

      <div className="w-50">
        <div className="w-25 mb-3">
          <div className="d-flex gap-2">
            <button
              className={`btn ${!chatArchivesOption ? 'btn-info active text-white' : 'btn-outline-info custom-hover-white'}`}
              onClick={() => {
                setCurrentPage(1)
                setChatArchivesOption(false)
              }}
            >
              전체
            </button>

            <button
              className={`btn ${chatArchivesOption ? 'btn-info active text-white' : 'btn-outline-info custom-hover-white'}`}
              onClick={() => {
                setCurrentPage(1)
                setChatArchivesOption(true)
              }}
            >
              즐겨찾기
            </button>
          </div>
        </div>

        <div className="container p-0">
          <div className="row">
            {chatArchives.length === 0 ? (
              <tr className="d-flex justify-content-center">
                <td colSpan="5" className="text-center py-5 text-muted">
                  <i className="bi bi-emoji-frown text-info" style={{ fontSize: '2rem' }}></i><br />
                  <span className="text-info">{chatArchivesOption ? '즐겨찾기한 아카이브가 존재하지 않습니다.' : '저장된 아카이브가 존재하지 않습니다.'} </span>
                </td>
              </tr>
            ) : (
              chatArchives.map((chatArchive, index) => (
                <div className="col-md-4 d-flex justify-content-center mb-4" key={chatArchive.chatArchiveId}>
                  <div className="card shadow-sm" style={{ width: "100%", maxWidth: "35rem" }}>
                    <div className="card-body">
                      <div className="d-flex align-items-center gap-1">
                        <i
                          className={chatArchive.chatArchiveBookmarks ? "bi bi-star-fill" : "bi bi-star"}
                          style={{
                            color: chatArchive.chatArchiveBookmarks ? "gold" : "inherit",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setChatArchiveBookmarks(chatArchive.chatArchiveId);
                            handleToggleBookmark(chatArchive.chatArchiveId);
                            if (!chatArchive.chatArchiveBookmarks) {
                              alert("즐겨찾기가 완료되었습니다");
                            }
                          }}
                        ></i>

                        <h6
                          className="card-title mb-0 text-info fw-semibold"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setChatArchiveId(chatArchive.chatArchiveId);
                            setIsChatArchiveOpen(true);
                          }}
                        >
                          {chatArchive.chatArchiveTitle}
                        </h6>
                      </div>

                      <p className="card-text text-secondary mb-2 fw-semibold">
                        {chatArchive.chatArchiveDate.replace("T", " ")}
                      </p>

                      <div className="d-flex justify-content-start">

                        <button
                          className="btn btn-danger btn-sm d-flex align-items-center gap-2"
                          onClick={async () => {
                            await delChatArchive(chatArchive.chatArchiveId);
                            await fetchChatArchive(currentPage);
                            alert("삭제되었습니다");
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
      {totalCount !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalCount / 12)}
          onPageChange={(page) => {
            setCurrentPage(page)
            fetchChatArchive(page)
          }}
        />
      )}
    </div>
  );
};

export default ChatArchivePage;