import React from "react";
import Image, { ImageProps } from "next/image";
import { IconType } from "./iconTypes";

type SvgIconProps = {
  name: IconType;
  alt?: string;
  width: number;
  height: number;
} & Omit<ImageProps, "src" | "width" | "height" | "alt">;

const SvgIcon = ({ name, alt = "app-icon", width, height, ...restProps }: SvgIconProps) => {
  return <Image src={`/assets/images/${name}.svg`} alt={alt} width={width} height={height} {...restProps} />;
};

export default SvgIcon;
