import React from "react";
import PiramalLogo from "./piramalLogo";
import "./styles.scss";

// eslint-disable-next-line no-shadow
export enum MudraLoaderSize {
  small = "small",
  medium = "medium",
  large = "large",
  xl = "xl",
  xxl = "xxl"
}

interface IMudraLoader {
  size?: MudraLoaderSize;
}

const MudraLoader: React.FunctionComponent<IMudraLoader> = ({ size }) => {
  return (
    <div data-testid='mudra_loader' className={`mudra-loader ${size || ""}`}>
      <PiramalLogo className={`mudra-loader-icon ${size || ""}`} />
      <div className={`spinner ${size || ""}`} data-testid='mudra_loader_spinner' />
    </div>
  );
};

export default MudraLoader;
