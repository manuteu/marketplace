import React from 'react'
import { IInputProps, Input as NativeBaseInput, FormControl } from 'native-base'

type Props = IInputProps & {
  errorMessage?: string | null;
}

export default function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl
      isInvalid={invalid}
      mb={4}
    >
      <NativeBaseInput
        bg="white"
        h={12}
        px={4}
        borderWidth={0}
        borderRadius={6}
        fontSize="md"
        color='gray.600'
        fontFamily='regular'
        placeholderTextColor='gray.400'
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.300'
        }}
        _focus={{
          bgColor: 'white',
          borderWidth: 1,
          borderColor: 'blue.300'
        }}
        _disabled={{ bg: 'gray.500' }}
        {...rest}
      />
      <FormControl.ErrorMessage _text={{ color: 'red.300' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}