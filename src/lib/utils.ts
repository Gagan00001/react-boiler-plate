import dayjs from "dayjs";
import { IconType } from "src/components/SvgIcon/iconTypes";
import { dateFormats } from "./constants";

const dateFormatter = (date: string = "", format: string = dateFormats.startsWithDate): string => {
  return dayjs(date).format(format);
};

const format = (str: string, ...values: any[]) => {
  Object.keys(values)?.forEach((arg: any) => {
    // eslint-disable-next-line no-param-reassign
    str = str.replace(`{${arg}}`, values[arg]);
  });
  return str;
};

const downloadFile = ({ filePath, fileName }: { filePath?: string; fileName: string }) => {
  const link = document.createElement("a");
  link.href = filePath || `/assets/csv/${fileName}`;
  link.download = fileName;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const thumbnailForFileSelection = (type?: string): IconType => {
  const strictType = type?.split("/")[1];
  switch (strictType) {
    case "pdf":
      return "pdfUpload";
    case "jpeg":
      return "uploadDoc";
    case "png":
      return "uploadDoc";
    case "mp4":
      return "uploadDoc";
    default:
      return "uploadDoc";
  }
};

export { dateFormatter, format, downloadFile, thumbnailForFileSelection };
