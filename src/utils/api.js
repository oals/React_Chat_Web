import { apiClient } from './apiClient';

const BASE_API_URL = process.env.REACT_APP_API_URL;
const BASE_MATCH_URL = process.env.REACT_APP_MATCH_URL;

export function matchStart() {
  return apiClient(`${BASE_MATCH_URL}/api/match/start`, {
    method: 'POST',
    credentials: 'include'
  });
}

export function matchCancel() {
  return apiClient(`${BASE_MATCH_URL}/api/match/cancel`, {
    method: 'DELETE',
    credentials: 'include'
  });
}

export function chatSend(chatRoomId, chatMessage) {
  return apiClient(`${BASE_API_URL}/api/chat/send`, {
    method: 'POST',
    credentials: 'include',
    body: {
        'chatRoomId' : chatRoomId,
        'chatMessage' : chatMessage,
    }
  });
}

export function fireBaseAuthing(idToken) {
  return apiClient(`${BASE_API_URL}/api/auth/fireBase`, {
    method: 'POST',
    credentials: 'include',
    headers:{
        'Authorization': `Bearer ${idToken}`,}
      });
}

export function clearCookie() {
  return apiClient(`${BASE_API_URL}/api/cookie/clear`, {
    method: 'DELETE',
    })
}

export function getMemberId() {
  return apiClient(`${BASE_API_URL}/api/cookie/getMemberId`, {
    method: 'GET',
    credentials: 'include'
    })
}





