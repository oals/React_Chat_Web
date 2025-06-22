import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let matchingClient = null;
let chatClient = null;

let matchingSubscribed = false;
let chatSubscribed = false;

const BASE_API_URL = process.env.REACT_APP_API_URL;
const BASE_MATCH_URL = process.env.REACT_APP_MATCH_URL;

export const connectMatching = (userId, onMatchReceived) => {
    return new Promise((resolve, reject) => {
     if (matchingClient && matchingSubscribed) {
        resolve();
        return;
      }

      const socket = new SockJS(`${BASE_MATCH_URL}/ws`);
      matchingClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {

           if (!matchingSubscribed) {
             matchingClient.subscribe(`/topic/match/${userId}`, (msg) => {
               const data = JSON.parse(msg.body);
               onMatchReceived(data);
             });
             matchingSubscribed = true;
           }
            resolve();
        },
        onStompError: (f) => console.error('💥 에러:', f),
        onWebSocketError: (err) => console.error('❌ WebSocket 에러:', err),
      });
      matchingClient.activate();

    });
};

export const connectChat = (chatRoomId, memberId , onMatchReceived) => {
    return new Promise((resolve, reject) => {
     if (chatClient && chatSubscribed) {
        resolve();
        return;
      }

      const socket = new SockJS(`${BASE_API_URL}/ws`);
      chatClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
           if (!chatSubscribed) {
             chatClient.subscribe(`/topic/chat/${chatRoomId}`, (msg) => {
               const parsed = JSON.parse(msg.body);
               if (String(parsed.senderId) !== String(memberId)) {
                 onMatchReceived(parsed.chatMessage);
               }
             });
             chatSubscribed = true;
           }
            resolve();
        },
        onStompError: (f) => console.error('💥 에러:', f),
        onWebSocketError: (err) => console.error('❌ WebSocket 에러:', err),
      });
      chatClient.activate();

    });
};


export const disconnectMatching = () => {
  if (matchingClient?.active) {
    console.log('🔌 매칭 stomp 연결 해제됨');
    matchingClient.deactivate();
    matchingSubscribed = null;
    matchingClient = null;
  }
};

export const disconnectChat = () => {
  if (chatClient?.active) {
    console.log('🔌 채팅 stomp 연결 해제됨');
    chatClient.deactivate();
    chatSubscribed = null;
    chatClient = null;
  }
};