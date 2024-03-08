import React from "react";
import styled from "styled-components";
import MudraTypography from "../Mudra/Typography";

const SampleDataWrapper = styled.div`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.royalBlue[10]};
  padding: 16px;
`;

const ErrorInfoWrapper = styled.div`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.texasYellow[10]};
  padding: 16px;
`;

type StructureDownloadActionProps = {
  handleStructureDownload: () => void;
};

const HeaderMismatchErrorContainer = ({ handleStructureDownload }: StructureDownloadActionProps) => {
  return (
    <ErrorInfoWrapper>
      <MudraTypography size={12} weight='regular' textColor='neutral70'>
        To resolve the issue, consider the following steps:
      </MudraTypography>
      <MudraTypography size={12} weight='regular' textColor='neutral70'>
        1. Confirm that the table is correctly structured with headers the data in subsequent rows.
      </MudraTypography>
      <MudraTypography size={12} weight='regular' textColor='neutral70'>
        2.
        <MudraTypography
          size={12}
          weight='regular'
          style={{ display: "inline", margin: "0px 4px", textDecoration: "underline", cursor: "pointer" }}
          textColor='piramalOrange100'
          id='projectMasterStructure'
          onClick={handleStructureDownload}
        >
          Download master structure
        </MudraTypography>
        for correct format
      </MudraTypography>
      <MudraTypography size={12} weight='regular' textColor='neutral70'>
        3. Ensure that there are no blank columns or rows within the table range.
      </MudraTypography>
      <MudraTypography size={12} weight='regular' textColor='neutral70'>
        4. Check for any special characters or invalid symbols in the table headers or data.
      </MudraTypography>
    </ErrorInfoWrapper>
  );
};

const InvalidErrorContainer = ({ error }: { error: string }) => {
  return (
    <ErrorInfoWrapper>
      <MudraTypography size={12} weight='regular' textColor='neutral70'>
        To resolve the issue, consider the following:
      </MudraTypography>
      <MudraTypography size={12} weight='regular' textColor='neutral70'>
        1. Check the specified cells for typos or incorrect data.
      </MudraTypography>
      <MudraTypography size={12} weight='regular' textColor='neutral70'>
        2. Ensure that numeric values are entered in numerical cells, and text values in text cells.
      </MudraTypography>
      <MudraTypography size={12} weight='regular' textColor='neutral70'>
        3. Verify that dates are formatted correctly.
      </MudraTypography>
      <MudraTypography size={12} weight='regular' textColor='neutral70'>
        {`4. ${error}`}
      </MudraTypography>
    </ErrorInfoWrapper>
  );
};
const DownloadMasterStructureContainer = ({ handleStructureDownload }: StructureDownloadActionProps) => {
  return (
    <SampleDataWrapper>
      <MudraTypography size={12} weight='regular' textColor='neutral70'>
        Need to upload master data file in CSV or XLSX format.
        <MudraTypography
          size={12}
          weight='regular'
          style={{ display: "inline", margin: "0px 4px", textDecoration: "underline", cursor: "pointer" }}
          textColor='piramalOrange100'
          id='projectMasterStructure'
          onClick={handleStructureDownload}
        >
          Download master structure
        </MudraTypography>
        for correct format
      </MudraTypography>
    </SampleDataWrapper>
  );
};

export { HeaderMismatchErrorContainer, InvalidErrorContainer, DownloadMasterStructureContainer };
