import { configureStore } from "@reduxjs/toolkit";

import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import TaskReducer from "./slices/taskSlice";
import NotificationReducer from "./slices/notificationSlice";
import ProjectsReducer from "./slices/projectSlice";
import MastersReducer from "./slices/masterSlice";
import CollaboratorsReducer from "./slices/collaboratorSlice";

export const store = configureStore({
  reducer: {
    tasks: TaskReducer,
    notification: NotificationReducer,
    projects: ProjectsReducer,
    masters: MastersReducer,
    collaborators: CollaboratorsReducer
  }
});

export type storeType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
