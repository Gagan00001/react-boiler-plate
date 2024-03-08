/* eslint-disable no-unused-expressions */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
import { useCallback, useState } from "react";
import styled from "styled-components";
import FileUploadDialogBox from "src/components/FileUpload";
import PopupDialog from "src/components/Modal/centerModal";
import RightModal from "src/components/Modal/rightModal";
import { useAppDispatch, useAppSelector } from "src/redux";
import { addContentFileRequest, getS3FileUploadURL, uploadDocsToS3 } from "src/redux/slices/projectSlice";
import useSnackbar from "src/hooks/useSnackbar";
import FormRadioGroup from "src/components/Form/Radio";
import FormTextInput from "src/components/Form/TextInput";
import { SubmitHandler, useForm } from "react-hook-form";

import MudraButton from "src/components/Mudra/Button";
import { IconAlignment, Size, Variant, Width } from "src/components/Mudra/Button/buttonPropsEnum";

const defaultFormats = {
  IMAGE: ".png,.jpg,.jpeg",
  VIDEO: ".mp4",
  DOCUMENT: ".pdf"
};
const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;
const CsvModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  padding: 20px 24px;
  overflow-y: auto;
  max-height: 390px;
`;

const ModalButtonContent = styled.div`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 8px 8px 0px 0px;
  background: #fff;
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.05);
`;

type UploadDocModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type DocContentValus = {
  docType?: "IMAGE" | "VIDEO" | "DOCUMENT";
  title?: string;
  desc?: string;
};
const UploadDocModal = ({ open, setOpen }: UploadDocModalProps) => {
  const [fileUploadDet, setFileUploadDet] = useState<{ file?: File; cancelDialog: boolean }>({
    file: undefined,
    cancelDialog: false
  });
  const { showSnackbar } = useSnackbar();
  const [error] = useState<{
    name: string;
    isError: boolean;
    errorTitle: string;
    errorDescription: string;
  } | null>(null);
  const { data } = useAppSelector((state) => state.projects.projectDetails);
  const dispatch = useAppDispatch();
  const { control, register, handleSubmit, formState, reset, watch } = useForm<DocContentValus>({
    defaultValues: {
      docType: "IMAGE"
    }
  });
  // const { data: projectTypesInfo } = useAppSelector((state) => state.projects.projectTypes);

  const handleSubmitData: SubmitHandler<DocContentValus> = useCallback(
    (formData) => {
      const fileFinalLoc = `projects/${data?.projectId}`;
      fileUploadDet.file &&
        dispatch(
          getS3FileUploadURL({
            body: {
              type: "PROJECT_DOC",
              projectId: data?.projectId ?? "",
              docList: fileUploadDet.file ? [`${fileUploadDet.file.name}`] : []
            },
            params: ["PROJECT_DOC", "PUT"]
          })
        )
          .unwrap()
          .then((res) => {
            fileUploadDet.file &&
              dispatch(
                uploadDocsToS3({
                  docList: [fileUploadDet.file],
                  uploadURLs: res
                })
              )
                .unwrap()
                .then(() => {
                  fileUploadDet.file &&
                    dispatch(
                      addContentFileRequest({
                        projectId: data?.projectId ?? "",
                        name: formData.title ?? "",
                        description: formData.desc ?? "",
                        contentType: formData.docType ?? "IMAGE",
                        filePath: `${fileFinalLoc}/${fileUploadDet.file.name}`
                      })
                    )
                      .then(() => {
                        reset();
                        setFileUploadDet({ file: undefined, cancelDialog: false });
                        setOpen(false);
                        showSnackbar({
                          type: "success",
                          message: "Document Added Successfully!"
                        });
                        reset();
                      })
                      .catch(() => {});
                })
                .catch(() => {});
          });
    },
    [data?.projectId, dispatch, fileUploadDet.file, reset, setOpen, showSnackbar]
  );

  const handleClose = useCallback(() => {
    if (formState.isDirty || fileUploadDet.file) {
      setFileUploadDet((prev) => {
        return { ...prev, cancelDialog: true };
      });
    } else {
      setOpen(false);
    }
  }, [fileUploadDet.file, formState.isDirty, setOpen]);

  const handleConfirmClose = useCallback(() => {
    setFileUploadDet(() => {
      return { cancelDialog: false };
    });
    setOpen(false);
  }, [setOpen]);

  const handleCancelClose = useCallback(() => {
    setFileUploadDet((prev) => {
      return { ...prev, cancelDialog: false };
    });
  }, []);

  const handleFileOnSelect = useCallback((files: File[]) => {
    setFileUploadDet((prev) => {
      return { ...prev, file: files[0] };
    });
  }, []);

  return (
    <>
      <RightModal open={open} toggleOpen={handleClose} heading='Add Document/Media' icon='plusIcon'>
        {/* {loading && <LoadingScreen />} */}
        <FormContent>
          <form>
            <CsvModalContent>
              <FormRadioGroup<any>
                name='docType'
                defaultValue='IMAGE'
                options={[
                  {
                    docTypeId: "DOCUMENT",
                    docType: "Document"
                  },
                  {
                    docTypeId: "IMAGE",
                    docType: "Image"
                  },
                  {
                    docTypeId: "VIDEO",
                    docType: "Video"
                  }
                ]}
                control={control}
                register={register}
                required={true}
                valueAccessor='docTypeId'
                labelAccessor='docType'
              />
              <FileUploadDialogBox
                onSelected={handleFileOnSelect}
                count={1}
                formats={defaultFormats[watch("docType") ?? "IMAGE"]}
                error={error}
                showSelected
                filenamePrefix={data?.projectType.projectType}
              />
              <FormTextInput
                name='title'
                label='Title'
                placeholder='eg: Khushaal Bachpan Abhiyan Deck'
                control={control}
                register={register}
                required={true}
              />
              <FormTextInput
                name='desc'
                label='Description'
                placeholder='eg: Khushaal Bachpan Abhiyan aims to improve the Pre School education and Nutritional status of Children aged 0 to 5 years.'
                control={control}
                register={register}
                multiline={true}
                required={true}
              />
            </CsvModalContent>
          </form>
          <ModalButtonContent>
            <MudraButton
              type='button'
              variant={Variant.Secondary}
              iconAlignment={IconAlignment.LeftAligned}
              icon='uploadDarkIcon'
              width={Width.Full}
              label={"Upload"}
              onClick={() => {}}
            />
            <MudraButton
              onClick={handleSubmit(handleSubmitData)}
              variant={Variant.Primary}
              label='Submit'
              size={Size.Medium}
              width={Width.Full}
            />
          </ModalButtonContent>
        </FormContent>
      </RightModal>
      {fileUploadDet.cancelDialog && (
        <PopupDialog
          open={fileUploadDet.cancelDialog}
          onConfirm={handleConfirmClose}
          onCancel={handleCancelClose}
          dialogDetails={{
            dialogTitle: "Cancel Add Documents",
            dialogDesc: "It appears that you are adding some document. Cancelling the process may cause loss of data."
          }}
          dialogOptionals={{ dialogAdditionalDesc: "Are you sure you want to cancel the process?" }}
        />
      )}
    </>
  );
};

export default UploadDocModal;
