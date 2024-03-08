/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import isFunction from "lodash/isFunction";
import Image from "next/image";

import { thumbnailForFileSelection } from "src/lib/utils";

import SvgIcon from "../SvgIcon";
import MudraTypography from "../Mudra/Typography";
import MudraButton from "../Mudra/Button";
import { IconAlignment, Variant, Width } from "../Mudra/Button/buttonPropsEnum";

const FileUploadContainer = styled.div`
  display: flex;
  height: 200px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 12px;
  border: 1px dashed #365069;
`;

const SelectedUploadContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 20px;
  border: 1px solid #ebeef0;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ErrorDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 24px;
`;

// const ButtonGroupContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: stretch;
//   gap: 8px;
// `;

type errorInfo = { name: string; isError: boolean; errorTitle: string; errorDescription: string };

type FileUploadDialogBoxProps = {
  onSelected?: (e: File[]) => void;
  count: number;
  formats: string;
  error: errorInfo | null;
  showSelected?: boolean;
  filenamePrefix?: string;
};

const FileUploadDialogBox = ({
  onSelected,
  count = 1,
  formats,
  filenamePrefix,
  error,
  showSelected = false
}: FileUploadDialogBoxProps) => {
  const drop = useRef<HTMLDivElement>(null);
  const handleDragOver = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const [preview, setPreviewImage] = useState<string | null>(null);
  const [selectedFileDetails, setSelectedFileDetails] = useState<{ addedType?: string; addedName?: string }>();

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // this is required to convert FileList object to array
      const files = e.dataTransfer ? [...e.dataTransfer.files] : [];

      // check if the provided count prop is less than uploaded count of files
      if (count && count < files.length) {
        // eslint-disable-next-line no-console
        console.log(`Only ${count} file${count !== 1 ? "s" : ""} can be uploaded at a time`);
        return;
      }

      if (
        formats &&
        files.some(
          (file) => !formats.split(",")?.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase()))
        )
      ) {
        // eslint-disable-next-line no-console
        console.log(`Only following file formats are acceptable: ${formats}`);
      }

      if (files && files.length) {
        onSelected?.(files);
        setSelectedFileDetails({ addedType: files?.[0].type, addedName: files?.[0].name });
        setPreviewImage(
          ["image/png", "image/jpeg", "image/jpg"].includes(files[0].type) ? URL.createObjectURL(files[0]) : null
        );
      }
    },
    [count, formats, onSelected]
  );

  const handleChange = useCallback(
    (selectorFiles: FileList | null) => {
      if (isFunction(onSelected)) {
        onSelected(selectorFiles ? [...selectorFiles] : []);
        setPreviewImage(
          ["image/png", "image/jpeg", "image/jpg"].includes(selectorFiles?.[0].type)
            ? URL.createObjectURL(selectorFiles?.[0])
            : null
        );
        setSelectedFileDetails({ addedType: selectorFiles?.[0].type, addedName: selectorFiles?.[0].name });
      }
    },
    [onSelected]
  );

  useEffect(() => {
    drop?.current?.addEventListener("dragover", handleDragOver);
    drop?.current?.addEventListener("drop", handleDrop);
    return () => {
      drop?.current?.removeEventListener("dragover", handleDragOver);
      drop?.current?.removeEventListener("drop", handleDrop);
    };
  }, [handleDrop]);

  return (
    <>
      {showSelected && selectedFileDetails?.addedType ? (
        <SelectedUploadContainer>
          {preview ? (
            <Image src={preview} alt={"Image preview"} height={90} width={90} />
          ) : (
            <SvgIcon name={thumbnailForFileSelection(selectedFileDetails?.addedType)} width={72} height={90} />
          )}
          <RowContainer>
            {!!filenamePrefix && (
              <MudraTypography size={12} weight='regular' textColor='piramalBlue100'>
                {`${filenamePrefix} |`}
              </MudraTypography>
            )}
            <MudraTypography size={12} weight='regular' textColor='royalBlue100'>
              {selectedFileDetails?.addedName}
            </MudraTypography>
          </RowContainer>
        </SelectedUploadContainer>
      ) : !error?.isError ? (
        <FileUploadContainer ref={drop}>
          <SvgIcon height={28} width={28} name='uploadDarkIcon' />
          <MudraTypography size={14} textColor='neutral80' weight='bold'>
            Drag & Drop file here
          </MudraTypography>
          <MudraTypography size={16} textColor='piramalBlue40'>
            OR
          </MudraTypography>
          <input
            id='files'
            type='file'
            style={{ display: "none" }}
            onChange={(e) => handleChange(e.target.files)}
            accept={formats}
          />
          <MudraButton
            type='button'
            variant={Variant.Primary}
            iconAlignment={IconAlignment.LeftAligned}
            width={Width.Full}
            label='Add More'
            style={{ gap: 4, padding: "8px" }}
            onClick={() => document.getElementById("files")?.click()}
            icon='plusWhiteIcon'
          />
        </FileUploadContainer>
      ) : (
        <ParentContainer>
          <SelectedUploadContainer>
            <SvgIcon name='uploadDocFailed' width={72} height={100} />
            <ErrorDetail>
              <MudraTypography size={16} weight='bold' textColor='neutral80'>
                {error.errorTitle}
              </MudraTypography>
              <MudraTypography size={14} textColor='neutral60' weight='regular'>
                {error.errorDescription}
              </MudraTypography>
            </ErrorDetail>
          </SelectedUploadContainer>
          <input
            id='files'
            type='file'
            style={{ display: "none" }}
            onChange={(e) => handleChange(e.target.files)}
            accept={formats}
          />
          <MudraButton
            type='button'
            width={Width.Full}
            variant={Variant.Secondary}
            iconAlignment={IconAlignment.LeftAligned}
            icon={() => <SvgIcon name={"uploadDarkIcon"} width={16} height={16} style={{ marginRight: "12px" }} />}
            label='Reupload'
            onClick={() => {
              document.getElementById("files")?.click();
            }}
          />
        </ParentContainer>
      )}
    </>
  );
};

export default FileUploadDialogBox;

// <ParentContainer>
//   <SelectedUploadContainer>
//     <SvgIcon name='uploadDoc' width={72} height={100} />
//     <RowContainer>
//       <MudraTypography size={12} textColor='royalBlue100'>
//         {selectedFiles[0].name}
//       </MudraTypography>
//       <Delete onClick={() => setSelectedFiles(undefined)} />
//     </RowContainer>
//   </SelectedUploadContainer>
//   <ButtonGroupContent>
//     <MudraButton
//       type='button'
//       variant={MudraButtonVariant.Primary}
//       width={MudraButtonWidth.Full}
//       label='Submit'
//       onClick={() => {
//         setError(true);
//       }}
//     />
//     <input
//       id='files'
//       type='file'
//       style={{ display: "none" }}
//       onChange={(e) => handleChange(e.target.files)}
//       accept={formats}
//     />
//     <MudraButton
//       type='button'
//       iconAlignment={MudraButtonIconAlignment.LeftAligned}
//       icon={() => <SvgIcon name={"uploadDarkIcon"} width={16} height={16} style={{ marginRight: "12px" }} />}
//       variant={MudraButtonVariant.Secondary}
//       width={MudraButtonWidth.Full}
//       label='Reupload'
//       onClick={() => {
//         document.getElementById("files")?.click();
//       }}
//     />
//   </ButtonGroupContent>
// </ParentContainer>
