import React from "react";

import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { FormControl, FormLabel, Input, InputProps } from "@mui/material";

const ariaLabel = { "aria-label": "description" };

interface FormTextInputProps extends InputProps {
  control: UseFormReturn<FieldValues>["control"];
  register: UseFormReturn<FieldValues>["register"];
  required?: boolean;
  name: string;
  label: string;
  placeholder: string;
}

const TextInput = ({ control, register, name, label, required, placeholder, ...restProps }: FormTextInputProps) => {
  return (
    <Controller
      control={control}
      {...register(name, {
        required: required && { message: `${label} is required`, value: true }
      })}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl error={!!error}>
            <FormLabel sx={{ mr: 2 }} required={required} aria-readonly>
              {label}
            </FormLabel>
            <Input placeholder={placeholder} fullWidth inputProps={ariaLabel} {...restProps} {...field} />
          </FormControl>
        );
      }}
    />
  );
};

export default TextInput;
