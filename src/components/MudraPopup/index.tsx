import React, { useRef, useEffect } from "react";
import { PopupContainer, PopupContent } from "./styles";
import { MudraPopupProps } from "./types";

const MudraPopup: React.FC<MudraPopupProps> = ({ isOpen, style, zIndex, onClose, children, childStyle }) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <PopupContainer isOpen={isOpen} ref={popupRef} style={style} zIndex={zIndex}>
      <PopupContent style={childStyle}>{children}</PopupContent>
    </PopupContainer>
  );
};

MudraPopup.defaultProps = {
  style: { top: 0, left: 0 }
};

export default MudraPopup;
