/* eslint-disable no-param-reassign */
import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

export type notificationInitialState = {
  message?: string;
  type?: AlertColor;
};

const initialState: notificationInitialState = {
  message: undefined,
  type: undefined
};

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    resetNotificationMessage: () => {
      return initialState;
    }
  }
});

export const { setNotificationMessage, resetNotificationMessage } = NotificationSlice.actions;
export default NotificationSlice.reducer;
