import React, { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import TextEditor from './textEditor'
type Option = {
  value: string
  label: string
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  typee: 'text' | 'password' | 'number',
  isError: boolean
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    isError: boolean
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[],
  isError: boolean
}


type Props = InputProps | TextareaProps | SelectProps

const InputComponent: React.FC<Props> = ({ typee, isError, options, ...props }: any) => {
  switch (typee) {
    case 'text':
    case 'password':
    case 'number':
      return <input className={`w-full rounded-sm my-3 border ${isError ? 'border-red-500' : 'border-green-600'}`} type={typee} {...props as InputProps} />
    case 'textarea':
    return <TextEditor className={`w-full rounded-sm my-3 md:h-[300px] h-[50vh] border ${isError ? 'md:border-red-500' : 'md:border-green-600'}`} {...props}/>
    case 'select':
      return (
        <select {...props as SelectProps} className={`w-full rounded-sm my-3 border ${isError ? 'border-red-500' : 'border-green-600'}`}>
          {options?.map((option: Option, index: number) => (
            <option key={index.toString()} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )
    default:
      return null
  }
}

export default InputComponent
