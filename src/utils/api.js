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
    credentials: 'include'
    })
}

export function getMemberId() {
  return apiClient(`${BASE_API_URL}/api/cookie/getMemberId`, {
    method: 'GET',
    credentials: 'include'
    })
}

export function chatSave(chatArchiveTitle, chatArchiveJson) {
  return apiClient(`${BASE_API_URL}/api/chat/save`, {
    method: 'POST',
    credentials: 'include',
     body: {
         'chatArchiveTitle' : chatArchiveTitle,
         'chatArchiveJson' : chatArchiveJson,
     }
    })
}

export function getChatArchive(isBookmarks,page) {
  return apiClient(`${BASE_API_URL}/api/chat/getChatArchive?chatArchiveBookmarks=${isBookmarks}&page=${page}`, {
    method: 'GET',
    credentials: 'include',
    })
}

export function setChatArchiveBookmarks(chatArchiveId) {
  return apiClient(`${BASE_API_URL}/api/chat/setChatArchiveBookmarks`, {
    method: 'POST',
    credentials: 'include',
    body: {
             'chatArchiveId' : chatArchiveId,
         }
    })
}

export function delChatArchive(chatArchiveId) {
  return apiClient(`${BASE_API_URL}/api/chat/delChatArchive`, {
    method: 'POST',
    credentials: 'include',
    body: {
             'chatArchiveId' : chatArchiveId,
         }
    })
}

export function getChatArchiveMessage(chatArchiveId) {
  return apiClient(`${BASE_API_URL}/api/chat/getChatArchiveMessage?chatArchiveId=${chatArchiveId}`, {
    method: 'GET',
    credentials: 'include',
    })
}

export function groupChatCreate(groupChatRoomTitle, groupChatRoomMaxParticipants, groupChatRoomTopic) {
  return apiClient(`${BASE_API_URL}/api/groupChat/create`, {
    method: 'POST',
    credentials: 'include',
     body: {
             'groupChatRoomTitle' : groupChatRoomTitle,
             'groupChatRoomMaxParticipants' : groupChatRoomMaxParticipants,
             'groupChatRoomTopic' : groupChatRoomTopic,
     }
    })
}

export function getGroupChatRoom(page, groupChatRoomTopic) {
  return apiClient(`${BASE_API_URL}/api/groupChat/getGroupChatRoomList?groupChatRoomTopic=${groupChatRoomTopic}`, {
    method: 'GET',
    credentials: 'include',
    })
}

export function joinGroupChatRoom(groupChatRoomId) {
  return apiClient(`${BASE_API_URL}/api/groupChat/join`, {
    method: 'POST',
    credentials: 'include',
    body: {
              'groupChatRoomId' : groupChatRoomId
         }
    })
}

export function groupChatSend(groupChatRoomId, chatMessage) {
  return apiClient(`${BASE_API_URL}/api/groupChat/send`, {
    method: 'POST',
    credentials: 'include',
    body: {
        'groupChatRoomId' : groupChatRoomId,
        'chatMessage' : chatMessage,
    }
  });
}

