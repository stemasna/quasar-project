import {api} from "boot/axios";

export async function getMyChats ({ commit }) {
  const { data } = await api.get('chats', {
    params: {
      sort: '-updatedAt'
    }
  })
  commit('setChats', data)
}

export async function createChat({ commit, getters, dispatch }, userId) {
  try {
    const { details } = getters
    const {data:createdChat} = await api.post('chats', { participantsIds: [userId, details._id] })
    console.debug({createdChat})
    commit('addChat', createdChat)
    return createdChat
  } catch (e) {
    console.debug({ e })
  }
}
