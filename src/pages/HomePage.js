import React from 'react';
import { FaReact } from 'react-icons/fa';

const HomePage = () => {

  return (
    <div>
      <div className="bg-info text-white d-flex flex-column justify-content-center align-items-center min-vh-100">
           <div className="border border-3 p-5">
                <FaReact style={{ fontSize: '10rem', color: '#FFFFFF' }} />
                <h1 className=" d-flex justify-content-center m-3">Chat-X</h1>
           </div>
           <h1 className=" d-flex justify-content-center pt-5">Welcome to Chat-X! </h1>
           <div className="w-100 mx-auto text-center position-relative">
           </div>
       </div>
       <div className="bg-light text-white d-flex flex-column justify-content-center align-items-center min-vh-100 ">
            <div className="text-center">
                <FaReact style={{ fontSize: '5rem', color: '#61DBFB' }} />
                <h4 className=" d-flex justify-content-center m-3 text-info">랜덤 채팅</h4>
                <h5 className=" d-flex justify-content-center m-3 text-info">시작하기 버튼을 클릭하면 지금 즉시 랜덤채팅을 시작할 수 있습니다.</h5>
                <h5 className=" d-flex justify-content-center m-3 text-info"> 완벽한 프라이버시가 존중되는 공간에서 낯선 상대와 1:1 대화를 나눠보세요.</h5>
            </div>

            <div className="text-center mt-5">
                <FaReact style={{ fontSize: '5rem', color: '#61DBFB' }} />
                <h4 className=" d-flex justify-content-center m-3 text-info">그룹 채팅</h4>
               <h5 className="text-info">관심사별로 구성된 그룹 채팅방에서 여러 사람들과 자유롭게 이야기해보세요.</h5>
               <h5 className="text-info">주제 기반 소통으로 새로운 사람들과 지식과 취미를 나눌 수 있어요.</h5>
            </div>

            <div className="text-center mt-5">
                  <FaReact style={{ fontSize: '5rem', color: '#61DBFB' }} />
                  <h4 className=" d-flex justify-content-center m-3 text-info">아카이브</h4>
                  <h5 className=" d-flex justify-content-center m-3 text-info">이전 대화 내용을 저장하고 다시 확인할 수 있는 공간입니다.</h5>
                  <h5 className=" d-flex justify-content-center m-3 text-info"> 나만의 이야기 기록을 한 눈에 정리하고 필요할 때마다 꺼내보세요.</h5>
            </div>
       </div>
    </div>
  );
};

export default HomePage;