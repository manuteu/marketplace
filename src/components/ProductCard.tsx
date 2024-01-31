import React from 'react'
import { Box, Button as ButtonNativeBase, HStack, IButtonProps, Image, Text, VStack, View } from 'native-base'
import Tenis from '@assets/image_tenis.png'
import User from '@assets/user.png'

export default function ProductCard() {
  return (
    <Box w='47%'>
      <Image w='fit-content' h={32} alt='Product Image' rounded='md' source={Tenis} />
      <Box position='absolute' w='full' p={1} flexDirection='row' justifyContent='space-between' >
        <Image borderWidth={1} borderColor='gray.100' alt='Product Image' rounded='full' source={User} />
        <Box py={1} px={3} bg='gray.600' rounded='full'>
          <Text fontFamily='bold' fontSize='xs' color='gray.100' right={0} textTransform='uppercase'>USADO</Text>
        </Box>
      </Box>
      <VStack mt={1}>
        <Text fontFamily='regular' fontSize='sm' color='gray.600' >Tênis Vermelho</Text>
        <HStack style={{ gap: 2 }} mt={-1}>
          <Text fontFamily='bold' fontSize='xs' color='gray.700' mt={1}>R$</Text>
          <Text fontFamily='bold' fontSize='md' color='gray.700'>59,90</Text>
        </HStack>
      </VStack>
    </Box>
  )
}