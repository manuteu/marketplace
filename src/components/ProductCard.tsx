import React from 'react'
import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base'
import { InterfacePressableProps } from 'native-base/lib/typescript/components/primitives/Pressable/types'
import { ProductDTO } from '@dtos/ProductDTO'
import { formatMoney } from '@utils/maks'
import { api } from '@services/api'
import { Dimensions } from 'react-native'

type Props = InterfacePressableProps & ProductDTO
const { width } = Dimensions.get("window");

export default function ProductCard({ name, is_new, price, is_active, product_images, user, ...rest }: Props) {
  return (
    <Pressable {...rest} style={{
      flex: 1,
      flexGrow: 1,
      maxWidth: width / 2 - 34
    }} >
      <Image w='auto' h={120} resizeMethod='resize' alt='Product Image' rounded='md' source={{ uri: `${api.defaults.baseURL}/images/${product_images[0]?.path}` }} />
      <Box position='absolute' w='full' p={1} flexDirection='row' justifyContent='space-between' >
        {user && user.avatar ? (
          <Image w={7} h={7} borderWidth={1} borderColor='gray.100' alt='Product Image' rounded='full' source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }} />
        ) : (
          <Box />
        )}
        <Box px={2} h={17} alignItems='center' flexDirection='row' bg={is_new ? 'blue.500' : 'gray.600'} rounded='full'>
          <Text fontFamily='bold' fontSize='2xs' color='gray.100' right={0} textTransform='uppercase'>{is_new ? 'NOVO' : 'USADO'}</Text>
        </Box>
      </Box>
      {is_active === false && (
        <>
          <Box rounded='md' position='absolute' opacity={40} top={0} w='100%' h={120} bgColor='gray.700' />
          <Text position='absolute' fontFamily='bold' fontSize='xs' top={95} left={2} color='gray.100'>ANÚNCIO DESATIVADO</Text>
        </>
      )}
      <VStack mt={1}>
        <Text fontFamily='regular' fontSize='sm' color={is_active || is_active === undefined ? 'gray.600' : 'gray.400'} >{name}</Text>
        <HStack style={{ gap: 2 }} mt={-1}>
          <Text fontFamily='bold' fontSize='xs' color={is_active || is_active === undefined ? 'gray.700' : 'gray.400'} mt={1}>R$</Text>
          <Text fontFamily='bold' fontSize='md' color={is_active || is_active === undefined ? 'gray.700' : 'gray.400'}>{formatMoney(price)}</Text>
        </HStack>
      </VStack>
    </Pressable>
  )
}