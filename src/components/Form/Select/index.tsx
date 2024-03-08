import React from "react";
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import isFunction from "lodash/isFunction";

import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import { Checkbox, FormLabel } from "@mui/material";

interface FormSelectProps<T> extends SelectProps {
  control: UseFormReturn<FieldValues>["control"];
  register: UseFormReturn<FieldValues>["register"];
  options: T[];
  name: string;
  label: string;
  required?: boolean;
  placeholder: string;
  multiple?: boolean;
  labelAccessor: string;
  valueAccessor: string;
  handleOnChange?: (value: string) => void;
}

const FormSelect = <T,>({
  control,
  register,
  options = [],
  name,
  label,
  required,
  placeholder,
  multiple = false,
  labelAccessor = "label",
  valueAccessor = "value",
  handleOnChange,
  ...restProps
}: FormSelectProps<T>) => {
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
            <FormLabel sx={{ mr: 2 }} required={required} aria-readonly>
              {label}
            </FormLabel>
            <Select
              variant='standard'
              labelId='demo-select-medium-label'
              id='demo-select-medium'
              multiple={multiple}
              label={label}
              {...field}
              // eslint-disable-next-line no-nested-ternary
              value={value ? cloneDeep(value) : multiple ? [] : ""}
              onChange={(event) => {
                onChange(event.target.value);
                if (isFunction(handleOnChange)) {
                  handleOnChange(event?.target?.value);
                }
              }}
              renderValue={
                multiple
                  ? (selected) => {
                      const selectedOptions = options?.filter(
                        (option) => selected.indexOf(get(option, valueAccessor)) > -1
                      );
                      if (selectedOptions?.length) {
                        return <div>{selectedOptions.map((item: any) => item[labelAccessor]).join(", ")}</div>;
                      }
                      return null;
                    }
                  : undefined
              }
              {...restProps}
              sx={{
                "& .MuiSelect-select .notranslate::after": placeholder
                  ? {
                      content: `"${placeholder}"`,
                      opacity: 0.42
                    }
                  : {}
              }}
            >
              {options?.map((item) => (
                <MenuItem
                  key={get(item, valueAccessor)}
                  value={get(item, valueAccessor)}
                  divider={true}
                  style={{ height: "40px" }}
                >
                  {multiple && <Checkbox checked={(value || []).indexOf(get(item, valueAccessor)) > -1} />}
                  {get(item, labelAccessor)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }}
    />
  );
};

export default FormSelect;
