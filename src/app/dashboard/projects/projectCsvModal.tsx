import { useCallback, useState } from "react";
import styled from "styled-components";

import { downloadFile } from "src/lib/utils";
import { errorMessages } from "src/lib/constants";
import useSnackbar from "src/hooks/useSnackbar";

import { useAppDispatch, useAppSelector } from "src/redux";
import { projectCsvUpload } from "src/redux/slices/projectSlice";

import LoadingScreen from "src/components/Loader";
import RightModal from "src/components/Modal/rightModal";
import FileUploadDialogBox from "src/components/FileUpload";
import PopupDialog from "src/components/Modal/centerModal";
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
};
const ProjectCSVModal = ({ open, setOpen }: ProjectCSVModalProps) => {
  const [cancelDialog, setCancellationDialog] = useState(false);
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
    if (loading) {
      setCancellationDialog(true);
    } else {
      setOpen(false);
    }
  }, [loading, setOpen]);

  const handleConfirmClose = useCallback(() => {
    setCancellationDialog(false);
    setOpen(false);
  }, [setOpen]);

  const handleCancelClose = useCallback(() => {
    setCancellationDialog(false);
  }, []);

  const handleProjectMasterStructureDownload = useCallback(() => {
    downloadFile({ fileName: "projectsMasterStructure.csv" });
  }, []);

  const handleFileOnSelect = useCallback(
    (files: File[]) => {
      const errorDescription = "Please, recheck the file details and try again";
      dispatch(projectCsvUpload({ file: files[0] }))
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
    [dispatch, setOpen, showSnackbar]
  );

  return (
    <>
      <RightModal open={open} toggleOpen={handleClose} heading='Upload CSV' icon='uploadDarkIcon'>
        {loading && <LoadingScreen />}
        <CsvModalContent>
          <FileUploadDialogBox onSelected={handleFileOnSelect} count={1} formats='.csv' error={error} />
          {error?.isError && error?.name === errorMessages.PROJECT_CSV_HEADERS_MISMATCH && (
            <HeaderMismatchErrorContainer handleStructureDownload={handleProjectMasterStructureDownload} />
          )}
          {error?.isError && error?.errorTitle === "Invalid Input Detected!" && (
            <InvalidErrorContainer error={error?.name} />
          )}
          {(!error?.isError || (error?.isError && error?.name === errorMessages.PROJECT_CSV_UPLOAD_MISMATCH)) && (
            <DownloadMasterStructureContainer handleStructureDownload={handleProjectMasterStructureDownload} />
          )}
        </CsvModalContent>
      </RightModal>
      {cancelDialog && (
        <PopupDialog
          open={cancelDialog}
          onConfirm={handleConfirmClose}
          onCancel={handleCancelClose}
          dialogDetails={{
            dialogTitle: "Cancel Upload CSV",
            dialogDesc: "It appears that a file is currently being uploaded. Cancelling the upload may lost data."
          }}
          dialogOptionals={{ dialogAdditionalDesc: "Are you sure you want to cancel the process?" }}
        />
      )}
    </>
  );
};

export default ProjectCSVModal;
