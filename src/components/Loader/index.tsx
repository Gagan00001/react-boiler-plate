import React from "react";
import { styled } from "styled-components";
import MudraLoader, { MudraLoaderSize } from "../Mudra/Loader";
import MudraTypography from "../Mudra/Typography";

const LoaderContainer = styled.div<{ showWhiteBackground?: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  background-color: ${({ theme, showWhiteBackground }) =>
    // eslint-disable-next-line prettier/prettier
    (showWhiteBackground ? theme.colors.neutral[0] : "rgba(0, 0, 0, 0.15)")};
`;

const LoaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  justify-content: center;
  align-items: center;
`;

export type LoadingScreenProps = {
  title?: string;
  description?: string;
  showWhiteBackground?: boolean;
  // children: ReactNode;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ title, description, showWhiteBackground }) => {
  return (
    <LoaderContainer showWhiteBackground={showWhiteBackground}>
      <MudraLoader size={MudraLoaderSize.xl} />
      <LoaderTextContainer>
        <MudraTypography weight='bold' textColor='neutral80'>
          {title}
        </MudraTypography>
        <MudraTypography>{description}</MudraTypography>
      </LoaderTextContainer>
    </LoaderContainer>
  );
};

export default LoadingScreen;
