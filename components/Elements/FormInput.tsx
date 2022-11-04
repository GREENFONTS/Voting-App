import React, { Dispatch, SetStateAction } from "react";
import {FormControl, FormLabel, Input} from "@chakra-ui/react";

interface Props{
  label: string,
  type?: string,
  value: string,
  name: string,
  onChange: Dispatch<SetStateAction<string>>
}
const FormInput: React.FC<Props> = ({label, type="text",name, value, onChange}) => {
  return (
    <FormControl isRequired mt="2">
      <FormLabel htmlFor={label}>{label}</FormLabel>
      <Input
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
};

export default FormInput;
