type Option = {
  [key: string]: any;
};

type OptionsParserParams = {
  labelKey: string;
  valueKey: string;
  options: Option[];
};

type ParsedOption = {
  label: string;
  value: any;
  [key: string]: any;
};

const optionsParser = ({ labelKey, valueKey, options }: OptionsParserParams): ParsedOption[] => {
  return options.map((option) => ({
    label: option[labelKey],
    value: option[valueKey],
    ...option
  }));
};

export default optionsParser;
