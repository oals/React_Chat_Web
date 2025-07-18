import React from 'react';
import { useState, useEffect } from 'react';
import { formatTime } from '../../utils/comnUtils';
import { disconnectMatching } from '../../stomp/stompManager';

const MatchingWaitBox = ({isMatching, matchCancelCallBack}) => {

  const [seconds, setSeconds] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }, []);


  return (
     <div
        className="d-flex justify-content-start align-items-center flex-column p-5"
        style={{ minHeight: '100%', backgroundColor: '#111418' }}
      >
        <div className="d-flex justify-content-between w-75 mb-5 " style={{marginTop : '10%'}}>
            <div className="d-flex flex-column justify-content-center align-items-center gap-4 w-100">
               <div className="d-flex justify-content-center align-items-center w-75 bg-dark border rounded border-dark">
                 <p className="text-white fw-bold mt-3">00</p>
               </div>
               <div className="flex items-center justify-center"><p className="text-white text-sm font-normal leading-normal">Hours</p></div>
             </div>
             <div className="d-flex flex-column justify-content-center align-items-center gap-4 w-100">
               <div className="d-flex justify-content-center align-items-center w-75 bg-dark border rounded border-dark">
                 <p className="text-white font-bold mt-3">{formatTime(seconds).split(':')[0]}</p>
               </div>
               <div className="flex items-center justify-center"><p className="text-white text-sm font-normal leading-normal">Minutes</p></div>
             </div>
             <div className="d-flex flex-column justify-content-center align-items-center gap-4 w-100">
               <div className="d-flex justify-content-center align-items-center w-75  bg-dark border rounded border-dark">
                 <p className="text-white font-bold mt-3">{formatTime(seconds).split(':')[1]}</p>
               </div>
               <div className="flex items-center justify-center"><p className="text-white text-sm font-normal leading-normal">Seconds</p></div>
           </div>
        </div>

        <div className="mt-3 mb-4">
            <span className="fw-semibold text-white">다른 사용자를 기다리고 있습니다...</span>
        </div>
        <div className="spinner-border text-secondary mb-1" role="status">
             <span className="visually-hidden">Loading...</span>
         </div>


        <div className="mt-5 w-100 d-flex justify-content-center align-items-center">
            <button
              className="btn btn-dark w-75 text-light p-3"
              onClick={async () => {
                try {
                  disconnectMatching();
                  matchCancelCallBack();
                } catch (err) {
                  console.error('매칭 종료 중 오류 발생:', err);
                }
              }}

            >
              매칭 취소
            </button>
          </div>
      </div>
  );
};

export default MatchingWaitBox;