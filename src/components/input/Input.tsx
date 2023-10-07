import React, {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import TextEditor from "./textEditor";
type Option = {
  value: string;
  label: string;
};

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  typee: "text" | "password" | "number";
  isError: boolean;
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  isError: boolean;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  isError: boolean;
};

type Props = InputProps | TextareaProps | SelectProps;

const InputComponent: React.FC<Props> = ({
  typee,
  isError,
  options,
  ...props
}: any) => {
  switch (typee) {
    case "text":
    case "password":
    case "number":
      return (
        <input
          className={`my-3 w-full rounded-sm border ${
            isError ? "border-red-500" : "border-green-600"
          }`}
          type={typee}
          {...(props as InputProps)}
        />
      );
    case "textarea":
      return (
        <TextEditor
          className={`my-3 h-[50vh] w-full rounded-sm border md:h-[300px] ${
            isError ? "md:border-red-500" : "md:border-green-600"
          }`}
          {...props}
        />
      );
    case "select":
      return (
        <select
          {...(props as SelectProps)}
          className={`my-3 w-full rounded-sm border ${
            isError ? "border-red-500" : "border-green-600"
          }`}
        >
          {options?.map((option: Option, index: number) => (
            <option key={index.toString()} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    default:
      return null;
  }
};

export default InputComponent;
