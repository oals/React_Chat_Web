import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useMember } from '../contexts/MemberContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAlert } from '../components/AlertProvider';
import ChatRoomPage from './ChatRoomPage';

const HomePage = () => {

  const { memberId } = useMember();
  const [isLogin, setIsLogin] = useState(false)
  const auth = getAuth();
  const {alert} = useAlert();
  const [isOpenRandomChat, setIsOpenRandomChat] = useState(false)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLogin(true)
    }
  });


  return (
     <div className="text-white d-flex flex-column justify-content-start align-items-center w-100 " style={{ backgroundColor: '#111418', height: '90vh' }}>

      {isOpenRandomChat && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
            style={{ opacity: 0.5, zIndex: 1061 }}
          ></div>

          <div className=" position-fixed top-50 start-50 translate-middle p-3 border border-dark rounded shadow" style={{ zIndex: 1062, backgroundColor: '#111418' }}>
            <ChatRoomPage
                matchCancelCallBack={()=>{ setIsOpenRandomChat(false) }}
            />
          </div>
        </>
      )}

      <div style={{ marginTop: '5%' }}>
        <h2>Chat-x</h2>
      </div>

       <div className="w-50" style={{ marginTop: '3%' }}>
         <strong>Chat-x</strong>는 새로운 대화를 시작할 수 있는 공간입니다. <br/>
         낯선 상대와 깊이 있는 대화를 나누며, 프라이버시가 존중되는 안전한 채팅 환경을 제공합니다. <br/>
         말이 통하는 사람, 지금 여기서 만나보세요.
       </div>

       <div className="w-50 d-flex justify-content-start" style={{ marginTop: '3%' }}>
         <h3>주요 기능</h3>
       </div>


       <div className="mt-3 w-50 d-flex justify-content-between">

         <div className="d-flex gap-3">

         <div
            className="link-offset-2 link-underline text-light link-underline-opacity-0"
            onClick={(e) => {
              if (!(memberId && isLogin)) {
                e.preventDefault();
                alert('로그인 후 이용 가능합니다.');
              } else{
                setIsOpenRandomChat(true)
              }
            }}
         >
           <div className="card text-white hover-scale" style={{ width: '18rem', backgroundColor: '#1b2127'}}>
             <div className="card-body d-flex flex-column">
               <div>
                 <span>
                  <i className="bi bi-chat-dots text-secondary" style={{fontSize: '1.2rem'}}></i>
                 </span>
               </div>
                <div className="mt-1">
                   <span className="fw-bold">랜덤 채팅</span>
                </div>
                <div className="mt-2">
                   <span style={{color: '#4e5761'}}>시작하기 버튼을 클릭하면 지금 즉시 랜덤채팅을 시작할 수 있습니다. <br /> 완벽한 프라이버시가 존중되는 공간에서 낯선 상대와 1:1 대화를 나눠보세요.</span>
                </div>
             </div>
           </div>
         </div>

         <Link
            to="/groupChatPage"
            className="link-offset-2 link-underline text-light link-underline-opacity-0"
            onClick={(e) => {
              if (!(memberId && isLogin)) {
                e.preventDefault();
                alert('로그인 후 이용 가능합니다.');
              }
            }}
            >
            <div className="card text-white hover-scale " style={{ width: '18rem', backgroundColor: '#1b2127'}}>
                 <div className="card-body d-flex flex-column">
                   <div>
                     <span>
                       <i className="bi bi-people text-secondary" style={{fontSize: '1.2rem'}}></i>
                     </span>
                   </div>
                    <div className="mt-1">
                       <span className="fw-bold">그룹 채팅</span>
                    </div>
                    <div className="mt-2">
                       <span style={{color: '#4e5761'}}>시작하기 버튼을 클릭하면 지금 즉시 랜덤채팅을 시작할 수 있습니다. <br /> 완벽한 프라이버시가 존중되는 공간에서 낯선 상대와 1:1 대화를 나눠보세요.</span>
                    </div>
                 </div>
            </div>
         </Link>


         <Link
            to="/chatArchive"
            className="link-offset-2 link-underline text-light link-underline-opacity-0"
            onClick={(e) => {
              if (!(memberId && isLogin)) {
                e.preventDefault();
                alert('로그인 후 이용 가능합니다.');
              }
            }}
          >
            <div className="card text-white hover-scale " style={{ width: '18rem', backgroundColor: '#1b2127'}}>
                 <div className="card-body d-flex flex-column">
                   <div>
                     <span>
                       <i className="bi bi-cloud text-secondary" style={{fontSize: '1.2rem'}}></i>
                     </span>
                   </div>
                    <div className="mt-1">
                       <span className="fw-bold">채팅 아카이브</span>
                    </div>
                    <div className="mt-2">
                       <span style={{color: '#4e5761'}}>이전 대화 내용을 저장하고 다시 확인할 수 있는 공간입니다. <br/> 나만의 이야기 기록을 한 눈에 정리하고 필요할 때마다 꺼내보세요.</span>
                    </div>
                 </div>
            </div>
         </Link>
         </div>
       </div>
     </div>
  );
};

export default HomePage;