import React from "react";

import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { FormControl, FormLabel } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface FormDatePickerProps extends DatePickerProps<AdapterDayjs> {
  control: UseFormReturn<FieldValues>["control"];
  register: UseFormReturn<FieldValues>["register"];
  required?: boolean;
  name: string;
  label: string;
}

const FormDatePicker = ({ control, register, name, label, required, ...restProps }: FormDatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        {...register(name, {
          required: required && { message: `${label} is required`, value: true }
        })}
        render={({ field, fieldState: { error } }) => {
          // const valueData = {};
          const { ref } = field;
          // if (field?.value && typeof field?.value === "string") {
          //   valueData.value = dayjs(convertWithTimezone(field.value));
          // }
          return (
            <FormControl error={!!error}>
              <FormLabel sx={{ mr: 2 }} required={required} aria-readonly>
                {label}
              </FormLabel>
              <DatePicker
                format='DD/MM/YYYY'
                {...field}
                //   {...valueData}
                slotProps={{
                  textField: {
                    variant: "standard",
                    // disabled: restProps?.disabled,
                    fullWidth: true,
                    error: !!error,
                    // helperText: error?.message,
                    size: "small",
                    inputRef: ref,
                    required
                  }
                }}
                name={register?.name}
                {...restProps}
              />
            </FormControl>
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default FormDatePicker;
