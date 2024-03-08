import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useTheme } from "styled-components";
import { Alert, AlertColor } from "@mui/material";

const colorMap: { [key in AlertColor]: string } = {
  success: "emeraldGreen",
  error: "valentineRed",
  info: "darkLavender",
  warning: "texasYellow"
};
interface NotificationProps extends SnackbarProps {
  message?: string;
  type?: AlertColor | undefined;
  hideSnackbar?: () => void;
  button?: boolean;
}

const SnackBar = ({ message, type, hideSnackbar }: NotificationProps) => {
  const theme = useTheme();
  const backgroundColor = type ? theme.colors[colorMap[type]][10] : theme.colors.emeraldGreen[10];
  const borderColor = type ? theme.colors[colorMap[type]][40] : theme.colors.emeraldGreen[40];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={!!(type && message)}
      autoHideDuration={1000}
      onClose={hideSnackbar}
      TransitionComponent={Slide}
      TransitionProps={{ dir: "down" }}
      sx={{
        "& .MuiPaper-root": {
          minWidth: "300px",
          backgroundColor,
          border: `1px solid ${borderColor}`
        }
      }}
    >
      <Alert
        //   onClose={hideSnackbar}
        severity={type}
        variant='standard'
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
