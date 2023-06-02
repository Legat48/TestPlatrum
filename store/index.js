export const state = () => ({
  dialogOpen: true,
  dialogComponent: ''
})

export const getters = {
  getDialogOpen (state) {
    return state.dialogOpen
  },
  getDialogComponent (state) {
    return state.dialogComponent
  }
}

export const mutations = {
  toggleDialogOpen (state) {
    state.dialogOpen ? state.dialogOpen = false : state.dialogOpen = true
  },
  setDialogComponent (state, value) {
    state.dialogComponent = value
  }
}

export const actions = {}
