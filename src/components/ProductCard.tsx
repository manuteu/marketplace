import React from 'react'
import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base'
import Tenis from '@assets/image_tenis.png'
import User from '@assets/user.png'
import { InterfacePressableProps } from 'native-base/lib/typescript/components/primitives/Pressable/types'

export type ProductCardProps = InterfacePressableProps & {
  title: string;
  value: string;
  state: 'new' | 'used';
  status: 'active' | 'disabled';
  userPhoto: string | undefined;
}

export default function ProductCard({ title, value, state, status = 'active', userPhoto, ...rest }: ProductCardProps) {
  return (
    <Pressable {...rest}>
      <Image w='auto' h={120} resizeMethod='resize' alt='Product Image' rounded='md' source={Tenis} />
      <Box position='absolute' w='full' p={1} flexDirection='row' justifyContent='space-between' >
        <Image borderWidth={1} borderColor='gray.100' alt='Product Image' rounded='full' source={User} />
        <Box px={2} h={17} alignItems='center' flexDirection='row' bg={state === 'new' ? 'blue.500' : 'gray.600'} rounded='full'>
          <Text fontFamily='bold' fontSize='2xs' color='gray.100' right={0} textTransform='uppercase'>{state === 'new' ? 'NOVO' : 'USADO'}</Text>
        </Box>
      </Box>
      {status === 'disabled' && (
        <>
          <Box rounded='md' position='absolute' opacity={40} top={0} w='100%' h={120} bgColor='gray.700' />
          <Text position='absolute' fontFamily='bold' fontSize='xs' top={95} left={2} color='gray.100'>ANÚNCIO DESATIVADO</Text>
        </>
      )}
      <VStack mt={1}>
        <Text fontFamily='regular' fontSize='sm' color={status === 'active' ? 'gray.600' : 'gray.400'} >{title}</Text>
        <HStack style={{ gap: 2 }} mt={-1}>
          <Text fontFamily='bold' fontSize='xs' color={status === 'active' ? 'gray.700' : 'gray.400'} mt={1}>R$</Text>
          <Text fontFamily='bold' fontSize='md' color={status === 'active' ? 'gray.700' : 'gray.400'}>{value}</Text>
        </HStack>
      </VStack>
    </Pressable>
  )
}