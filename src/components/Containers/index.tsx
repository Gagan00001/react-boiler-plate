import styled, { CSSProperties } from "styled-components";
import MudraDivider from "../Mudra/Divider";
import MudraTypography from "../Mudra/Typography";
import MudraList from "../Mudra/List";

const PageContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral[10]};
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 60px;
`;

const TableContainer = styled.div`
  flex: 1;
  margin: 20px;
`;

const BoxWrapper = styled.div<{ bottomBorder?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: ${({ bottomBorder }) => (bottomBorder ? 0 : 8)}px;
  border-bottom-right-radius: ${({ bottomBorder }) => (bottomBorder ? 0 : 8)}px;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border-bottom: ${({ bottomBorder }) => (bottomBorder ? 1 : 0)}px solid ${({ theme }) => theme.colors.piramalBlue[10]};
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-self: stretch;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  box-shadow:
    0px 0px 1px 0px rgba(0, 0, 0, 0.4),
    0px 6px 6px -6px rgba(0, 0, 0, 0.16);
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
`;

const SectionHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TitleSubtitleHeading = styled(SectionHeading)`
  justify-content: center;
  align-items: center;
`;

const InternalScreenContainer = styled.div`
  display: flex;
  margin: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  max-height: 342px;
  overflow-y: auto;
  position: relative;
`;

const FormContainer = styled.div`
  max-height: 398px;
  overflow-y: auto;
  margin: 20px;
`;

const RowContainer = styled.div<{ gap?: number }>`
  display: flex;
  justify-content: space-between;
  gap: ${({ gap }) => gap ?? 40}px;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
`;

const ModalFooterButtonContainer = styled.div`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 8px 8px 0px 0px;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.05);
`;

type StyledBoxWithHeadingProps = {
  children: React.ReactNode;
  heading?: string;
  includeTopMargin?: boolean;
  childContainerStyles?: CSSProperties;
};

type InformationBlockProps = {
  label: string;
  value?: any;
};
type TitleSubtitleBlockProps = {
  title: string;
  subtitle?: any;
};
type InformationArrayBlockProps = {
  label: string;
  values?: string[];
};
const StyledBox = ({ children, heading, includeTopMargin = true }: StyledBoxWithHeadingProps) => {
  return (
    <BoxWrapper style={includeTopMargin ? { marginTop: "32px" } : {}}>
      {heading && (
        <SectionHeading>
          <MudraTypography size={14} weight='bold' textColor='neutral100'>
            {heading}
          </MudraTypography>
          <MudraDivider />
        </SectionHeading>
      )}
      {children}
    </BoxWrapper>
  );
};

const ViewSectionContainer = ({ children, heading, childContainerStyles }: StyledBoxWithHeadingProps) => {
  return (
    <SectionWrapper>
      <BoxWrapper bottomBorder>
        {heading && (
          <MudraTypography size={14} weight='bold' textColor='neutral100'>
            {heading}
          </MudraTypography>
        )}
      </BoxWrapper>
      <BoxWrapper style={childContainerStyles}>{children}</BoxWrapper>
    </SectionWrapper>
  );
};

const InformationBlock = ({ label, value }: InformationBlockProps) => {
  return (
    <InfoBlock>
      <MudraTypography size={14} weight='regular' textColor='neutral50'>
        {label}
      </MudraTypography>
      <MudraTypography size={16} weight='regular' textColor='neutral100'>
        {value?.length ? value : "-"}
      </MudraTypography>
    </InfoBlock>
  );
};

const InformationArrayBlock = ({ label, values }: InformationArrayBlockProps) => {
  return (
    <InfoBlock>
      <MudraTypography size={14} weight='regular' textColor='neutral50'>
        {label}
      </MudraTypography>
      {values?.length ? (
        <MudraList
          listType='ordered'
          data={values}
          listStyleType='decimal'
          listStyles={{ marginLeft: "1rem" }}
          textColor='neutral100'
          size={16}
          weight='regular'
        />
      ) : (
        <MudraTypography size={16} weight='regular' textColor='neutral100'>
          -
        </MudraTypography>
      )}
      {/* <MudraList size={16} weight='regular' textColor='neutral100'>
        {value ?? "-"}
      </MudraTypography> */}
    </InfoBlock>
  );
};

const TitleSubtitleBlock = ({ title, subtitle }: TitleSubtitleBlockProps) => {
  return (
    <TitleSubtitleHeading>
      <MudraTypography size={24} weight='extraBold' textColor='neutral100'>
        {title}
      </MudraTypography>
      <MudraTypography size={16} weight='regular' textColor='neutral70'>
        {subtitle}
      </MudraTypography>
    </TitleSubtitleHeading>
  );
};

export {
  StyledBox,
  ViewSectionContainer,
  InformationBlock,
  InformationArrayBlock,
  TitleSubtitleBlock,
  InfoBlock,
  PageContainer,
  TableContainer,
  FormContainer,
  RowContainer,
  InternalScreenContainer,
  ModalContainer,
  ModalFooterButtonContainer
};
