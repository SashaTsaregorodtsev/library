import { FieldProps } from "formik";
import React from "react";
import Select from "react-select";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: Array<Option>;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
}

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
}: CustomSelectProps) => {
  const onChange = (option: Array<Option>) => {
    form.setFieldValue(
      field.name,
      isMulti ? option.map((item) => item.value) : option.values
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value?.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  );
};

export default CustomSelect;
