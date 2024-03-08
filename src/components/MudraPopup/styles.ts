import { css, styled } from "styled-components";
import { MudraPopupProps } from "./types";

export const PopupContainer = styled.div<Partial<MudraPopupProps>>`
  position: relative;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 9;
  ${({ zIndex }) => css`
    ${zIndex &&
    css`
      z-index: ${zIndex};
    `}
  `}
`;

// Define the Popup content with styles
export const PopupContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 0 1px rgb(0 0 0 / 40%);
  border-radius: 0.5rem;
  gap: 0.75rem;
  z-index: 1;
  right: 0;
  top: 0.5rem;
  ${({ theme: { colors } }) => css`
    background-color: ${colors.neutral[0]};
  `}
`;
