import React from "react";
import "./styles.scss";

export interface IMudraDivider {
  dashed?: boolean;
  vertical?: boolean;
  color?: string;
}

const MudraDivider: React.FunctionComponent<IMudraDivider> = ({ dashed, vertical, color }) => {
  return (
    <div
      data-testid='mudra_divider'
      style={{
        borderStyle: dashed ? "dashed" : "",
        borderColor: color || ""
      }}
      className={`mudra-divider ${vertical ? "vertical" : ""}`}
    />
  );
};

export default MudraDivider;
