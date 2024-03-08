import { Variant, Size, Width, IconAlignment, State } from "./buttonPropsEnum";

const VariantConfig: Record<Variant, string> = {
  Primary: "primary",
  Secondary: "secondary",
  Ghost: "ghost"
};

const SizeConfig: Record<Size, string> = {
  Small: "small",
  Medium: "medium",
  Large: "large",
  XL: "xl"
};

const WidthConfig: Record<Width, string> = {
  Auto: "auto",
  Full: "full",
  Half: "half",
  Square: "square",
  Circle: "circle"
};

const IconAlignmentConfig: Record<IconAlignment, string> = {
  None: "none",
  LeftAligned: "left-aligned",
  RightAligned: "right-aligned",
  Single: "single"
};

const StateConfig: Record<State, string> = {
  Enabled: "enabled",
  Disabled: "disabled"
};

export { VariantConfig, SizeConfig, IconAlignmentConfig, StateConfig, WidthConfig };
