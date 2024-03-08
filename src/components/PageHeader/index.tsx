import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
import SvgIcon from "../SvgIcon";
import { IconType } from "../SvgIcon/iconTypes";
import StatusCell from "../StatusCell";
import MudraTypography from "../Mudra/Typography";
import MudraButton from "../Mudra/Button";
import { IconAlignment, Size, Variant, Width } from "../Mudra/Button/buttonPropsEnum";

const PageHeaderWrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
`;

const HeaderActionsWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const BackButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledDownloadButton = styled(MudraButton)``;

type PageHeaderPropsType = {
  headerLabel: string;
  showBackIcon?: boolean;
  backButtonAction?: () => void;
  showIcon?: boolean;
  showBadge?: boolean;
  badgeStatus?: boolean;
  primaryButtonIcon?: IconType;
  secondaryButtonIcon?: IconType;
  primaryButtonLabel?: string | undefined;
  secondaryButtonLabel?: string | undefined;
  primaryButtonAction?: () => void;
  secondaryButtonAction?: () => void;
  showDownloadButton?: boolean;
  downloadAction?: () => void;
};
const PageHeader = ({
  headerLabel,
  showBackIcon = false,
  backButtonAction,
  showIcon = false,
  showBadge = false,
  badgeStatus = true,
  primaryButtonIcon,
  secondaryButtonIcon,
  primaryButtonLabel,
  secondaryButtonLabel,
  primaryButtonAction,
  secondaryButtonAction,
  showDownloadButton = false,
  downloadAction
}: PageHeaderPropsType) => {
  let secondaryVariantButtonProps = {};
  let primaryVariantButtonProps = {};

  if (showIcon) {
    if (secondaryButtonIcon) {
      secondaryVariantButtonProps = {
        iconAlignment: IconAlignment.LeftAligned,
        icon: secondaryButtonIcon
      };
    }
    if (primaryButtonIcon) {
      primaryVariantButtonProps = {
        iconAlignment: IconAlignment.LeftAligned,
        icon: primaryButtonIcon
      };
    }
  }

  return (
    <PageHeaderWrapper>
      <BackButtonWrapper>
        {showBackIcon && (
          <SvgIcon name='backIcon' onClick={backButtonAction} width={20} height={20} style={{ cursor: "pointer" }} />
        )}
        <MudraTypography size={14} weight='bold' textColor='neutral100' style={{ textWrap: "nowrap" }}>
          {headerLabel}
        </MudraTypography>
        {showBadge && <StatusCell isActive={badgeStatus} />}
      </BackButtonWrapper>
      <HeaderActionsWrapper>
        {showDownloadButton && (
          <Tooltip title='This feature will come soon.'>
            <StyledDownloadButton
              onClick={downloadAction}
              variant={Variant.Secondary}
              label='Download'
              size={Size.Small}
              width={Width.Auto}
              iconAlignment={IconAlignment.LeftAligned}
              icon={() => <SvgIcon name='downloadIcon' width={20} height={20} style={{ marginRight: "6px" }} />}
              style={{ border: "none" }}
            />
          </Tooltip>
        )}
        {secondaryButtonLabel && (
          <MudraButton
            onClick={secondaryButtonAction}
            variant={Variant.Secondary}
            label={secondaryButtonLabel}
            size={Size.Small}
            width={Width.Auto}
            {...secondaryVariantButtonProps}
          />
        )}
        {primaryButtonLabel && (
          <MudraButton
            onClick={primaryButtonAction}
            variant={Variant.Primary}
            label={primaryButtonLabel}
            size={Size.Small}
            width={Width.Auto}
            {...primaryVariantButtonProps}
          />
        )}
      </HeaderActionsWrapper>
    </PageHeaderWrapper>
  );
};

export default PageHeader;
