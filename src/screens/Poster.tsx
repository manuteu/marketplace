import React from 'react'
import { SafeAreaView, } from 'react-native-safe-area-context'
import { Box, HStack, Image, Pressable, ScrollView, Text } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StackNavigatorRoutesProps } from '@routes/app.routes'
import Bike from '@assets/bike.png'
import ProductContent from '@components/ProductContent'
import Button from '@components/Button'
import WppSvg from '@assets/wpp_icon.svg'

export default function Poster() {
  const { navigate } = useNavigation<StackNavigatorRoutesProps>()

  return (
    <SafeAreaView style={{ paddingTop: 24 }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <HStack px={6} h={14} alignItems='center' justifyContent='space-between'>
          <Pressable onPress={() => navigate('stackHome')}>
            <Feather name="arrow-left" size={24} color="#1A181B" />
          </Pressable>
        </HStack>

        <Image w='full' alt='bike_image' source={Bike} />
        <ProductContent />
      </ScrollView>
      <Box position='absolute' w='full' bg='gray.100' bottom={0} h={90} justifyContent='center' pb={2}>
        <HStack px={6} justifyContent='space-between'>
          <HStack alignItems='center' space={1}>
            <Text fontFamily='bold' fontSize='sm' color='blue.500' mt={1.5}>R$</Text>
            <Text fontFamily='bold' fontSize='2xl' color='blue.500'>120,00</Text>
          </HStack>
          <Button leftIcon={<WppSvg />} w='50%' title='Entrar em contato' bgColor='blue.300' textColor='gray.100' />
        </HStack>
      </Box>
    </SafeAreaView>
  )
}