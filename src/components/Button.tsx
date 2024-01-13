import React from 'react'
import { Button as ButtonNativeBase, HStack, IButtonProps, Text } from 'native-base'
import { Feather, } from '@expo/vector-icons';
import { ColorType } from 'native-base/lib/typescript/components/types';

type Props = IButtonProps & {
  title: string;
  textColor?: ColorType;
  iconName?: keyof typeof Feather.glyphMap;
  iconColor?: string;
}

export default function Button({ title, textColor, iconName, iconColor, ...rest }: Props) {
  return (
    <ButtonNativeBase
      // w='1/2'
      h={11}
      borderRadius={6}
      _pressed={{
        bg: 'gray.300'
      }}
      {...rest}
    >
      <HStack alignItems='center' style={{ gap: 4 }}>
        {iconName && (
          <Feather name={iconName} size={20} color={iconColor} />
        )}
        <Text
          color={textColor}
          fontFamily='bold'
          fontSize='sm'
        >
          {title}
        </Text>
      </HStack>
    </ButtonNativeBase>
  )
}