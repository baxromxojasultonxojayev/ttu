import { createSlice } from "@reduxjs/toolkit"

export const {
  actions: alertActions,
  reducer: alertReducer
} = createSlice({
  name: "alert",
  initialState: {
    alerts: [],
  },
  reducers: {
    addAlert(state, {payload}) {
      state.alerts.push(payload)
    },
    deleteAlert(state, {payload}) {
      state.alerts = state.alerts.filter(alert => alert.id !== payload)
    }
  }
})