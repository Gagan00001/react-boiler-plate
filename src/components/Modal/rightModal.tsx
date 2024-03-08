import React from "react";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import SvgIcon from "../SvgIcon";
import { IconType } from "../SvgIcon/iconTypes";
import MudraTypography from "../Mudra/Typography";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  flex: 0.3;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  box-shadow:
    0px 0px 1px 0px rgba(0, 0, 0, 0.4),
    0px 6px 6px -6px rgba(0, 0, 0, 0.16);
  padding: 16px 20px;
`;

const ModalHeading = styled.div`
  display: flex;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

type RightModalProps = {
  children: React.ReactNode;
  open: boolean;
  toggleOpen: () => void;
  heading: string;
  showIcon?: boolean;
  icon: IconType;
};

const RightModal = ({ children, open, toggleOpen, heading, icon, showIcon = true }: RightModalProps) => {
  return (
    <Modal
      open={open}
      onClose={toggleOpen}
      style={{
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <ModalContainer>
        <ModalHeader>
          <ModalHeading>
            {showIcon && <SvgIcon name={icon} width={20} height={20} />}
            <MudraTypography
              size={14}
              weight='bold'
              textColor='neutral100'
              style={showIcon ? { marginLeft: "12px" } : {}}
            >
              {heading}
            </MudraTypography>
          </ModalHeading>
          <SvgIcon name='closeIcon' width={24} height={24} onClick={toggleOpen} style={{ cursor: "pointer" }} />
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default RightModal;
