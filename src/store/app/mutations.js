export function toggleLeftDrawer (state, payload) {
  state.drawer.leftOpen = !state.drawer.leftOpen
}

export function toggleRightDrawer (state, payload) {
  state.drawer.rightOpen = !state.drawer.rightOpen
}
