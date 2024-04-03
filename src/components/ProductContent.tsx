import React from 'react'
import { Box, HStack, Image, Text, VStack } from 'native-base'
import User from '@assets/user.png'
import PaymentMethodItem from './PaymentMethodItem'
import { PaymentMethod, ProductDTO } from '@dtos/ProductDTO'
import { useAuth } from '@hooks/useAuth'
import { formatMoney } from '@utils/maks'

export default function ProductContent({ name, is_new, accept_trade, description, price, product_images, payment_methods,  }: ProductDTO) {
  const { user } = useAuth()

  return (
    <VStack p={6} pb={12}>
      <HStack alignItems='center' space={2}>
        <Image borderWidth={1} borderColor='blue.300' alt='Product Image' rounded='full' source={User} />
        <Text fontFamily='regular' fontSize='sm' color='gray.700' >{user.name}</Text>
      </HStack>

      <Box mt={6} px={2} h={17} alignSelf='flex-start' bg='gray.300' rounded='full'>
        <Text fontFamily='bold' fontSize='2xs' color='gray.600'>{is_new ? 'NOVO' : 'USADO'}</Text>
      </Box>

      <HStack justifyContent='space-between' mt={1}>
        <Text fontFamily='bold' fontSize='lg' color='gray.700'>{name}</Text>
        <HStack alignItems='center' space={1}>
          <Text fontFamily='bold' fontSize='xs' color='blue.300' mt={1}>R$</Text>
          <Text fontFamily='bold' fontSize='lg' color='blue.300'>{formatMoney(price)}</Text>
        </HStack>
      </HStack>

      <Text mt={2} lineHeight='sm' fontFamily='regular' fontSize='sm' color='gray.600'>
        {description}
      </Text>

      <HStack mt={4} space={2}>
        <Text fontFamily='bold' fontSize='sm' color='gray.600' >Aceita troca?</Text>
        <Text fontFamily='regular' fontSize='sm' color='gray.600'>{accept_trade ? 'Sim': 'Não'}</Text>
      </HStack>

      <VStack mt={4}>
        <Text mb={1} fontFamily='bold' fontSize='sm' color='gray.600' >Método de Pagamento:</Text>
        {payment_methods.map((item: PaymentMethod, index: number) => (
          <PaymentMethodItem key={index} type={item.key} />
        ))}
      </VStack>
    </VStack>
  )
}