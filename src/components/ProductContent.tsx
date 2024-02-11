import React from 'react'
import { Box, HStack, Image, Text, VStack } from 'native-base'
import User from '@assets/user.png'
import PaymentMethodItem from './PaymentMethodItem'

export default function ProductContent() {

  const paymentMethods = ['invoice', 'pix', 'money', 'card', 'bankDeposit']
  return (
    <VStack p={6} pb={32}>
      <HStack alignItems='center' space={2}>
        <Image borderWidth={1} borderColor='blue.300' alt='Product Image' rounded='full' source={User} />
        <Text fontFamily='regular' fontSize='sm' color='gray.700' >Marcelin</Text>
      </HStack>

      <Box mt={6} px={2} h={17} w={43} alignItems='center' flexDirection='row' bg='gray.300' rounded='full'>
        <Text fontFamily='bold' fontSize='2xs' color='gray.600'>NOVO</Text>
      </Box>

      <HStack justifyContent='space-between' mt={1}>
        <Text fontFamily='bold' fontSize='lg' color='gray.700'>Bibicleta</Text>
        <HStack alignItems='center' space={1}>
          <Text fontFamily='bold' fontSize='xs' color='blue.300' mt={1}>R$</Text>
          <Text fontFamily='bold' fontSize='lg' color='blue.300'>120,00</Text>
        </HStack>
      </HStack>

      <Text mt={2} lineHeight='sm' fontFamily='regular' fontSize='sm' color='gray.600'>
        Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna matt
        is cursus. Mauris metus amet nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis in aliquam.
      </Text>

      <HStack mt={4} space={2}>
        <Text fontFamily='bold' fontSize='sm' color='gray.600' >Aceita troca?</Text>
        <Text fontFamily='regular' fontSize='sm' color='gray.600'>Sim</Text>
      </HStack>

      <VStack mt={4}>
        <Text mb={1} fontFamily='bold' fontSize='sm' color='gray.600' >Método de Pagamento:</Text>
        {paymentMethods.map((item: any, index: number) => (
          <PaymentMethodItem key={index} type={item} />
        ))}
      </VStack>
    </VStack>
  )
}