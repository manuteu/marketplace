import React, { useState } from 'react'
import { SafeAreaView, } from 'react-native-safe-area-context'
import { Box, HStack, Image, Pressable, ScrollView, Text, VStack } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigatorRoutesProps } from '@routes/app.routes'
import Bike from '@assets/bike.png'
import ProductContent from '@components/ProductContent'
import Button from '@components/Button'
import WppSvg from '@assets/wpp_icon.svg'
import Carousel from 'react-native-reanimated-carousel'
import { Dimensions } from 'react-native'

type RouteParamsProps = {
  data: { title: string, value: string, state: string, status: 'active' | 'deactivated' };
  type: 'myPoster' | 'buyPoster'
}

export default function Poster() {
  const { navigate } = useNavigation<StackNavigatorRoutesProps>()
  const { params } = useRoute()
  const { data, type } = params as RouteParamsProps
  const width = Dimensions.get('window').width;
  const [carouselData, setcarouselData] = useState([
    { img: Bike, id: 0, active: true },
    { img: Bike, id: 1, active: false },
    { img: Bike, id: 2, active: false },
  ])

  const handleSwipeImage = (index: number) => {
    const newCarouselData = carouselData.map((item) => {
      if (item.id === index) {
        item.active = true
      } else {
        item.active = false;
      }
      return item;
    })
    setcarouselData(newCarouselData)
  }

  return (
    <SafeAreaView style={{ paddingTop: 24, flex: 1, backgroundColor: '#EDECEE' }}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <HStack px={6} h={14} alignItems='center' justifyContent='space-between'>
          <Pressable onPress={() => navigate('stackHome')}>
            <Feather name="arrow-left" size={24} color="#1A181B" />
          </Pressable>
        </HStack>

        <Box width={width} height={width / 3 * 2}>
          <Carousel
            loop
            width={width}
            height={width / 3 * 2}
            data={carouselData}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => handleSwipeImage(index)}
            renderItem={({ index }) => (
              <Image key={index} w='full' alt='bike_image' source={Bike} />
            )}
          />
          <HStack px={1} space={2} w='full' position='absolute' bottom={1}>
            {carouselData.map((item, index) => (
              <Box key={index} flex={1} height={1} rounded='full' bg='gray.100' opacity={item.active ? 80 : 50} />
            ))}
          </HStack>
        </Box>

        <ProductContent />
      </ScrollView>
      {type === 'buyPoster' ? (
        <HStack px={6} justifyContent='space-between' alignItems='center' bg='gray.100' pb={2} h={90}>
          <HStack alignItems='center' space={1}>
            <Text fontFamily='bold' fontSize='sm' color='blue.500' mt={1.5}>R$</Text>
            <Text fontFamily='bold' fontSize='2xl' color='blue.500'>120,00</Text>
          </HStack>
          <Button leftIcon={<WppSvg />} w='50%' title='Entrar em contato' bgColor='blue.300' textColor='gray.100' />
        </HStack>
      ) : (
        <>
          <VStack px={6} pb={5} space={2}>
            {data.status === 'active' ?
              <Button title='Desativar anúncio' iconName='power' iconColor='#F7F7F8' bgColor='gray.700' textColor='gray.100' />
              :
              <Button title='Reativar anúncio' iconName='power' iconColor='#F7F7F8' bgColor='blue.300' textColor='gray.100' />
            }
            <Button title='Excluir anúncio' iconName='trash' iconColor='#3E3A40' bgColor='gray.300' textColor='gray.600' />
          </VStack>
        </>
      )}
    </SafeAreaView>
  )
}