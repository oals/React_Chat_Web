import React from 'react';
import { useState, useEffect } from 'react';
import { formatTime } from '../../utils/comnUtils';
import { useNavigate } from 'react-router-dom';
import { matchCancel } from '../../utils/api';
import { disconnect } from '../../stomp/stompManager';

const MatchingWaitBox = ({isMatching}) => {

  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, []);


  return (
     <div
        className="flex-grow-1 d-flex justify-content-center align-items-center"
        style={{ minHeight: '100%' }}
      >
        <div
          className="text-center border border-info p-4 rounded shadow"
          style={{ width: '500px' }}
        >
          <span className="fw-semibold">다른 사용자를 기다리고 있습니다.</span>
          <br />
          <span className="text-muted">{formatTime(seconds)}</span>
          <div className="mt-3">
            <button
              className="btn btn-info text-light"
              onClick={async () => {
                try {
                  await matchCancel();     // 매칭 취소 API 호출 (fetch 또는 axios 등)
                  disconnect();            // 웹소켓 연결 해제 (프로미스 반환 안 해도 괜찮음)
                  navigate('/chat');       // 이동
                } catch (err) {
                  console.error('매칭 종료 중 오류 발생:', err);
                }
              }}

            >
              매칭 취소
            </button>
          </div>
        </div>
      </div>
  );
};

export default MatchingWaitBox;