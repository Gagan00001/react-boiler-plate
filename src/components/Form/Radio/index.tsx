import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import cloneDeep from "lodash/cloneDeep";

import MUIRadio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import MUIRadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import MUIFormControlLabel from "@mui/material/FormControlLabel";
// import FormHelperText from "@mui/material/FormHelperText";

interface FormRadioGroupProps<T> extends RadioGroupProps {
  control: UseFormReturn<FieldValues>["control"];
  register: UseFormReturn<FieldValues>["register"];
  required?: boolean;
  name: string;
  label?: string;
  options: T[];
  labelAccessor: string;
  valueAccessor: string;
}

const FormRadioGroup = <T,>({
  control,
  register,
  name,
  options,
  label,
  required,
  labelAccessor = "label",
  valueAccessor = "value",
  ...restProps
}: FormRadioGroupProps<T>) => {
  return (
    <Controller
      control={control}
      {...register(name, {
        required: required && { message: `${label} is required`, value: true }
      })}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value } = field;
        return (
          <FormControl error={!!error}>
            {label && (
              <FormLabel sx={{ mr: 2 }} required={required} aria-readonly>
                {label}
              </FormLabel>
            )}
            <MUIRadioGroup
              row
              {...restProps}
              {...field}
              value={value ? cloneDeep(value) : ""}
              onChange={(event) => {
                onChange(event.target.value);
              }}
              sx={{ marginTop: "4px" }}
            >
              {options?.map((item: any) => (
                <MUIFormControlLabel
                  key={item[valueAccessor]}
                  value={item[valueAccessor]}
                  control={<MUIRadio />}
                  label={item[labelAccessor]}
                />
              ))}
            </MUIRadioGroup>
            {/* <FormHelperText id='select-helper-text' sx={{ marginLeft: "4px" }}>
              {error}
            </FormHelperText> */}
          </FormControl>
        );
      }}
    />
  );
};

export default FormRadioGroup;
