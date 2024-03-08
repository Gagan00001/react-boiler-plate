import { createTheme } from "@mui/material/styles";
import colors from "./colors";

const { piramalBlue, valentineRed, neutral, emeraldGreen, piramalOrange } = colors;

const muiTheme = createTheme({
  palette: {
    primary: {
      main: piramalBlue[100]
    },
    secondary: {
      main: piramalBlue[100]
    }
  },
  typography: {
    fontFamily: "Nunito"
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "16px"
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "width": "100%",
          "& .MuiFormLabel-root": {
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "20px",
            fontFamily: "NunitoBold",
            color: piramalBlue[100]
          },
          "& .MuiFormLabel-asterisk": {
            color: valentineRed[100]
          },
          "& .MuiInputBase-formControl": {
            marginTop: "2px"
          }
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          "& .MuiTypography-root": {
            fontFamily: "Nunito",
            paddingBottom: "0",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "20px",
            color: neutral[80]
          }
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          "color": piramalBlue[100],
          "&.Mui-checked": {
            color: piramalBlue[100]
          },
          "&:hover": {
            backgroundColor: "transparent"
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            whiteSpace: "normal",
            wordBreak: "break-word"
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: "Nunito",
          fontWeight: 400,
          lineHeight: "20px",
          fontSize: "14px",
          color: neutral[80]
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "Nunito",
          fontWeight: 400,
          lineHeight: "20px",
          fontSize: "14px",
          color: neutral[80]
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        message: {
          fontFamily: "nunito",
          fontWeight: 400,
          lineHeight: "20px",
          fontSize: "14px",
          color: emeraldGreen[140]
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          maxHeight: "342px",
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px"
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "cursor": "pointer",
          "backgroundColor": neutral[0],
          "& th": {
            backgroundColor: piramalBlue[10]
          },
          "&:hover": {
            backgroundColor: "inherit"
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "Nunito",
          fontWeight: 400,
          lineHeight: "20px",
          fontSize: "14px",
          color: neutral[100],
          textAlign: "left",
          borderBottom: `1.4px solid ${piramalBlue[10]}`,
          background: neutral[0]
        }
      }
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          "& :hover": {
            color: piramalBlue[100],
            opacity: 1
          }
        },
        icon: {
          opacity: 1,
          color: piramalBlue[100]
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[0],
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px"
        },
        spacer: {
          display: "none"
        },
        selectLabel: {
          fontFamily: "Nunito",
          fontWeight: 400,
          lineHeight: "20px",
          fontSize: "14px",
          color: neutral[60],
          textAlign: "left"
        },
        select: {
          fontFamily: "NunitoBold",
          fontWeight: 700,
          lineHeight: "20px",
          fontSize: "14px",
          color: piramalBlue[140],
          textAlign: "left",
          paddingTop: "6px"
        },
        selectIcon: {
          color: piramalBlue[140]
        },
        displayedRows: {
          fontFamily: "Nunito",
          fontWeight: 400,
          lineHeight: "20px",
          fontSize: "14px",
          color: neutral[60],
          textAlign: "right",
          flexGrow: 1
        },
        actions: {
          color: piramalBlue[140]
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[0]
        },
        indicator: {
          backgroundColor: piramalOrange[100],
          height: "4px",
          borderRadius: "10px"
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "textTransform": "capitalize",
          "minWidth": "120px",
          "color": neutral[70],
          "fontFamily": "NunitoRegular",
          "fontSize": "14px",
          "fontWeight": 400,
          "lineHeight": "20px",
          "&.Mui-selected": {
            color: neutral[100],
            fontFamily: "NunitoBold",
            fontWeight: 700
          }
        }
      }
    }
  }
});

export default muiTheme;
