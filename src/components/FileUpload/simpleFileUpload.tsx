import styled from "styled-components";

import SvgIcon from "../SvgIcon";
import MudraTypography from "../Mudra/Typography";
import MudraButton from "../Mudra/Button";
import { IconAlignment, Variant, Width } from "../Mudra/Button/buttonPropsEnum";

const FileUploadContainer = styled.div`
  display: flex;
  height: 200px;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 12px;
  border: ${({ theme }) => `1.5px dashed ${theme.colors.piramalOrange[100]}`};
  background-color: ${({ theme }) => theme.colors.piramalOrange[10]};
`;

type SimpleFileUploadProps = {
  handleButtonClick: () => void;
};
const FileUpload = ({ handleButtonClick }: SimpleFileUploadProps) => {
  return (
    <>
      <FileUploadContainer>
        <SvgIcon height={40} width={40} name='uploadOrangeIcon' />
        <MudraTypography
          size={16}
          textColor='neutral80'
          onClick={() => document.getElementById("files")?.click()}
          style={{ cursor: "pointer" }}
        >
          Upload CSV file
        </MudraTypography>
        <input
          id='files'
          type='file'
          style={{ display: "none" }}
          // onChange={(e) => handleChange(e.target.files)}
          // accept={formats}
        />
        <MudraTypography size={12} textColor='neutral70' style={{ textAlign: "center" }}>
          Upload master data file in CSV or XLSX format.
          <MudraTypography
            size={12}
            weight='regular'
            style={{ display: "inline", margin: "0px 4px", textDecoration: "underline", cursor: "pointer" }}
            textColor='piramalOrange100'
            // id='projectMasterStructure'
            // onClick={handleStructureDownload}
          >
            Download sample file
          </MudraTypography>
        </MudraTypography>
      </FileUploadContainer>
      <MudraTypography size={14} textColor='neutral60' weight='bold' style={{ textAlign: "center" }}>
        OR
      </MudraTypography>
      <MudraButton
        type='button'
        variant={Variant.Secondary}
        width={Width.Full}
        label='Add Manually'
        style={{ gap: 4, padding: "8px" }}
        onClick={handleButtonClick}
        iconAlignment={IconAlignment.LeftAligned}
        icon={() => <SvgIcon name={"plusIcon"} width={20} height={20} style={{ marginRight: "12px" }} />}
      />
    </>
  );
};

export default FileUpload;
