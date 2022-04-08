import { ReactNode, useRef } from 'react'
import { Button, FormControl, FormErrorMessage, FormLabel, Icon, InputGroup } from '@chakra-ui/react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { FiFile } from 'react-icons/fi'

export const FileUpload = ({register, accept, multiple, children}) => {
  const inputRef = useRef(null)

  const handleClick = () => inputRef.current?.click()

  return (
      <InputGroup onClick={handleClick}>
        <input
          type={'file'}
          multiple={multiple || false}
          hidden
          accept={accept}
          {...rest}
          ref={(e) => {
            ref(e)
            inputRef.current = e
          }}
        />
        <>
          {children}
        </>
      </InputGroup>
  )
}
