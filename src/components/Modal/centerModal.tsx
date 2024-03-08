import React from "react";
import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import styled from "styled-components";

import SvgIcon from "../SvgIcon";
import MudraTypography from "../Mudra/Typography";
import MudraButton from "../Mudra/Button";
import { IconAlignment, Variant, Width } from "../Mudra/Button/buttonPropsEnum";

type PopupDialogProps = {
  open: any;
  onConfirm: () => void;
  onCancel: () => void;
  dialogDetails: {
    dialogTitle: string;
    dialogDesc: string;
    confirmLabel?: string;
    cancelLabel?: string;
  };
  dialogOptionals?: {
    dialogAdditionalDesc?: string;
  };
};
const ModalContainer = styled.div`
  display: flex;
  width: 480px;
  flex-direction: column;
  border-radius: 16px;
  background: #fff;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  border-bottom-color: ${({ theme }) => theme.colors.neutral[10]};
  border-bottom-width: 2px;
  padding: 24px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  row-gap: 16px;
`;

const ModalButtonContent = styled.div`
  display: flex;
  padding: 12px 24px;
  justify-content: flex-end;
  gap: 8px;
`;

const ModalHeading = styled.div`
  display: flex;
  align-items: center;
`;
const PopupDialog = ({
  open,
  onConfirm,
  onCancel,
  dialogDetails: { dialogDesc, cancelLabel = "No", confirmLabel = "Yes, Cancel anyway", dialogTitle },
  dialogOptionals
}: PopupDialogProps) => {
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction='up' ref={ref} {...props} />;
  });

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onCancel}
      aria-describedby='alert-dialog-slide-description'
      style={{ borderRadius: "16px" }}
    >
      <ModalContainer>
        <ModalHeader>
          <ModalHeading>
            <MudraTypography size={16} weight='bold' style={{ color: "#010812" }}>
              {dialogTitle}
            </MudraTypography>
          </ModalHeading>
          <SvgIcon name='closeIcon' width={24} height={24} onClick={onCancel} style={{ cursor: "pointer" }} />
        </ModalHeader>
        <ModalContent>
          <MudraTypography size={14} weight='regular' textColor='neutral100' style={{ color: "#010812" }}>
            {dialogDesc}
          </MudraTypography>
          <MudraTypography size={14} weight='regular' textColor='neutral100' style={{ color: "#010812" }}>
            {dialogOptionals?.dialogAdditionalDesc ?? ""}
          </MudraTypography>
        </ModalContent>
        <ModalButtonContent>
          <MudraButton
            type='button'
            variant={Variant.Secondary}
            iconAlignment={IconAlignment.LeftAligned}
            width={Width.Auto}
            label={cancelLabel}
            onClick={onCancel}
          />
          <MudraButton
            type='button'
            variant={Variant.Primary}
            iconAlignment={IconAlignment.LeftAligned}
            width={Width.Auto}
            label={confirmLabel}
            onClick={onConfirm}
          />
        </ModalButtonContent>
      </ModalContainer>
    </Dialog>
  );
};

export default PopupDialog;
