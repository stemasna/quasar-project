export function setCurrentChatId (state, payload) {
  state.currentChatId = payload
}

export function setCurrentChat (state, payload) {
  state.currentChat = payload
}

export function setChats (state, chats) {
  state.chats = chats
}

export function addChat (state, newChat) {
  state.chats = [newChat, ...(state?.chats || [])]
}
