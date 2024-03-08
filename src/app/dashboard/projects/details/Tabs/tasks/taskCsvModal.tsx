import { useCallback, useState } from "react";
import styled from "styled-components";

import { downloadFile } from "src/lib/utils";
import { errorMessages } from "src/lib/constants";
import useSnackbar from "src/hooks/useSnackbar";

import { useAppDispatch, useAppSelector } from "src/redux";
import { tasksCsvUpload } from "src/redux/slices/taskSlice";

import LoadingScreen from "src/components/Loader";
import RightModal from "src/components/Modal/rightModal";
import FileUploadDialogBox from "src/components/FileUpload";
import {
  DownloadMasterStructureContainer,
  HeaderMismatchErrorContainer,
  InvalidErrorContainer
} from "src/components/CsvErrorsContainer";

const CsvModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  gap: 20px;
  padding: 28px;
`;

type ProjectCSVModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
};
const TaskCSVModal = ({ open, setOpen, projectId }: ProjectCSVModalProps) => {
  const { showSnackbar } = useSnackbar();
  const [error, setError] = useState<{
    name: string;
    isError: boolean;
    errorTitle: string;
    errorDescription: string;
  } | null>(null);
  const { loading } = useAppSelector((state) => state.projects.csvUpload);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleTaskMasterStructureDownload = useCallback(() => {
    downloadFile({ fileName: "tasksMasterStructure.csv" });
  }, []);

  const handleFileOnSelect = useCallback(
    (files: File[]) => {
      const errorDescription = "Please, recheck the file details and try again";
      dispatch(tasksCsvUpload({ file: files[0], projectId }))
        .then((res) => {
          const response = res.payload as string;
          // eslint-disable-next-line promise/always-return
          if (response === "Successfully uploaded") {
            showSnackbar({ message: "Projects uploaded successfully!", type: "success" });
            setOpen(false);
          } else if (response === errorMessages.PROJECT_CSV_HEADERS_MISMATCH) {
            setError({
              name: response,
              isError: true,
              errorTitle: "Invalid Table Validation!",
              errorDescription: "Please, review the file structure and try again"
            });
          } else if (response === errorMessages.PROJECT_CSV_UPLOAD_MISMATCH) {
            setError({
              name: response,
              isError: true,
              errorTitle: "Upload failed!",
              errorDescription
            });
          } else {
            setError({
              name: response,
              isError: true,
              errorTitle: "Invalid Input Detected!",
              errorDescription
            });
          }
        })
        .catch((err) => {
          setError({
            name: err,
            isError: true,
            errorTitle: "Upload failed!",
            errorDescription
          });
        });
    },
    [dispatch, projectId, setOpen, showSnackbar]
  );

  return (
    <>
      <RightModal open={open} toggleOpen={handleClose} heading='Upload CSV' icon='uploadDarkIcon'>
        {loading && <LoadingScreen />}
        <CsvModalContent>
          <FileUploadDialogBox onSelected={handleFileOnSelect} count={1} formats='.csv' error={error} />
          {error?.isError && error?.name === errorMessages.PROJECT_CSV_HEADERS_MISMATCH && (
            <HeaderMismatchErrorContainer handleStructureDownload={handleTaskMasterStructureDownload} />
          )}
          {error?.isError && error?.errorTitle === "Invalid Input Detected!" && (
            <InvalidErrorContainer error={error?.name} />
          )}
          {(!error?.isError || (error?.isError && error?.name === errorMessages.PROJECT_CSV_UPLOAD_MISMATCH)) && (
            <DownloadMasterStructureContainer handleStructureDownload={handleTaskMasterStructureDownload} />
          )}
        </CsvModalContent>
      </RightModal>
    </>
  );
};

export default TaskCSVModal;
