import React from "react";

export type MudraPopupProps = {
  isOpen: boolean;
  targetRef?: React.RefObject<HTMLElement>;
  style?: React.CSSProperties;
  zIndex?: number;
  onClose: () => void;
  children: React.ReactNode;
  childStyle?: React.CSSProperties;
};
