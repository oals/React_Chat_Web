import { apiClient } from './apiClient';

const BASE_API_URL = process.env.REACT_APP_API_URL;
const BASE_MATCH_URL = process.env.REACT_APP_MATCH_URL;

export function matchStart() {
  return apiClient(`${BASE_MATCH_URL}start`, {
    method: 'POST',
    credentials: 'include'
  });
}

export function matchCancel() {
  return apiClient(`${BASE_MATCH_URL}cancel`, {
    method: 'DELETE',
    credentials: 'include'
  });
}

export function chatSend(chatRoomId, chatMessage) {
  return apiClient(`${BASE_API_URL}chat/send`, {
    method: 'POST',
    credentials: 'include',
    body: {
        'chatRoomId' : chatRoomId,
        'chatMessage' : chatMessage,
    }
  });
}

export function fireBaseAuthing(idToken) {
  return apiClient(`${BASE_API_URL}/auth/fireBase`, {
    method: 'POST',
    credentials: 'include',
    headers:{
        'Authorization': `Bearer ${idToken}`,}
      });
}

export function clearCookie() {
  return apiClient(`${BASE_API_URL}/cookie/clear`, {
    method: 'DELETE',
    credentials: 'include'
    })
}

export function getMemberId() {
  return apiClient(`${BASE_API_URL}/cookie/getMemberId`, {
    method: 'GET',
    credentials: 'include'
    })
}

export function chatSave(chatArchiveTitle, chatArchiveJson) {
  return apiClient(`${BASE_API_URL}/chat/save`, {
    method: 'POST',
    credentials: 'include',
     body: {
         'chatArchiveTitle' : chatArchiveTitle,
         'chatArchiveJson' : chatArchiveJson,
     }
    })
}

export function getChatArchive(isBookmarks,page) {
  return apiClient(`${BASE_API_URL}/chat/getChatArchive?chatArchiveBookmarks=${isBookmarks}&page=${page}`, {
    method: 'GET',
    credentials: 'include',
    })
}

export function setChatArchiveBookmarks(chatArchiveId) {
  return apiClient(`${BASE_API_URL}/chat/setChatArchiveBookmarks`, {
    method: 'POST',
    credentials: 'include',
    body: {
             'chatArchiveId' : chatArchiveId,
         }
    })
}

export function delChatArchive(chatArchiveId) {
  return apiClient(`${BASE_API_URL}/chat/delChatArchive`, {
    method: 'DELETE',
    credentials: 'include',
    body: {
             'chatArchiveId' : chatArchiveId,
         }
    })
}

export function getChatArchiveMessage(chatArchiveId) {
  return apiClient(`${BASE_API_URL}/chat/getChatArchiveMessage?chatArchiveId=${chatArchiveId}`, {
    method: 'GET',
    credentials: 'include',
    })
}

export function groupChatCreate(groupChatRoomTitle, groupChatRoomTopic) {
  return apiClient(`${BASE_API_URL}/groupChat/create`, {
    method: 'POST',
    credentials: 'include',
     body: {
             'groupChatRoomTitle' : groupChatRoomTitle,
             'groupChatRoomTopic' : groupChatRoomTopic,
     }
    })
}

export function getGroupChatRoom(page, groupChatRoomTopic, searchText = '') {
  return apiClient(`${BASE_API_URL}/groupChat/getGroupChatRoomList?page=${page}&groupChatRoomTopic=${groupChatRoomTopic}&searchText=${searchText}`, {
    method: 'GET',
    credentials: 'include',
    })
}

export function joinGroupChatRoom(groupChatRoomId) {
  return apiClient(`${BASE_API_URL}/groupChat/join`, {
    method: 'POST',
    credentials: 'include',
    body: {
              'groupChatRoomId' : groupChatRoomId
         }
    })
}

export function groupChatSend(groupChatRoomId, chatMessage) {
  return apiClient(`${BASE_API_URL}/groupChat/send`, {
    method: 'POST',
    credentials: 'include',
    body: {
        'groupChatRoomId' : groupChatRoomId,
        'chatMessage' : chatMessage,
    }
  });
}

export function groupChatJoinMessage(groupChatRoomId) {
  return apiClient(`${BASE_API_URL}/groupChat/joinMessage`, {
    method: 'POST',
    credentials: 'include',
    body: {
        'groupChatRoomId' : groupChatRoomId
    }
  });
}

export function groupChatRoomExit(groupChatRoomId) {
  return apiClient(`${BASE_API_URL}/groupChat/exit`, {
    method: 'DELETE',
    credentials: 'include',
    body: {
        'groupChatRoomId' : groupChatRoomId,
    }
   })
}

export function getGroupChatRoomMemberCount(groupChatRoomId) {
  return apiClient(`${BASE_API_URL}/groupChat/memberCount?groupChatRoomId=${groupChatRoomId}`, {
    method: 'GET',
    credentials: 'include',
   })
}