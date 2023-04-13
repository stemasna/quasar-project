import {api} from "boot/axios";

export async function login ({ commit }, payload) {
  const { email, password } = payload
  const { data } = await api.post('auth', undefined, {
    headers: {
      Authorization: 'Basic ' + btoa(email + ':' + password)
    }
  })
  // The btoa() method creates a Base64-encoded ASCII string from a binary string
  // (i.e., a string in which each character in the string is treated as a byte of binary data).
  commit('setToken', data.token)
  commit('setDetails', data.user)
  return data.user

}

export async function logout ({ commit }) {
  commit('setToken', null)
  commit('setDetails', {})
}
