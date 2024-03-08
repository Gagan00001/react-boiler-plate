import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "src/redux";
import {
  notificationInitialState,
  resetNotificationMessage,
  setNotificationMessage
} from "src/redux/slices/notificationSlice";

const useSnackbar = () => {
  const snackbarMessageData = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();
  const showSnackbar = useCallback(
    ({ message, type }: notificationInitialState) => {
      dispatch(setNotificationMessage({ message, type }));
    },
    [dispatch]
  );

  const hideSnackbar = useCallback(() => {
    dispatch(resetNotificationMessage());
  }, [dispatch]);

  return { snackbarMessageData, showSnackbar, hideSnackbar };
};

export default useSnackbar;
