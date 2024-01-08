import React from 'react'
import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

type Props = IButtonProps & {
  title: string;
  textColor?: string;
}

export default function Button({ title, textColor, ...rest }: Props) {
  return (
    <ButtonNativeBase
      w='full'
      h={11}
      rounded='sm'
      _pressed={{
        bg: 'gray.300'
      }}
      {...rest}
    >
      <Text
        color={textColor}
        fontFamily='bold'
        fontSize='sm'
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}