import React, { useEffect, useState } from 'react'
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
import { ProductDTO } from '@dtos/ProductDTO'
import EditSvg from '@assets/edit_icon.svg'
import { api } from '@services/api'
import { formatMoney } from '@utils/maks'

type RouteParamsProps = {
  data: ProductDTO;
  type: 'myPoster' | 'buyPoster'
}

type carouselData = {
  id: string;
  path: string;
  active: boolean;
}

export default function Poster() {
  const { navigate } = useNavigation<StackNavigatorRoutesProps>()
  const { params } = useRoute()
  const { data, type } = params as RouteParamsProps
  const width = Dimensions.get('window').width;
  const [carouselData, setcarouselData] = useState<carouselData[]>([])

  const handleSwipeImage = (index: number) => {
    const newCarouselData = carouselData.map((item: any) => {
      if (item.id === index) {
        item.active = true
      } else {
        item.active = false;
      }
      return item;
    })
    setcarouselData(newCarouselData)
  }

  useEffect(() => {
    data.product_images.forEach((item, index) => {
      if (index === 1) {
        item.active = true;
      }
      item.active = false
    })
    setcarouselData(data.product_images)
  }, [])

  return (
    <SafeAreaView style={{ paddingTop: 24, flex: 1, backgroundColor: '#EDECEE' }}>
      <HStack px={6} h={14} alignItems='center' justifyContent='space-between'>
        <Pressable onPress={() => navigate('stackHome')}>
          <Feather name="arrow-left" size={24} color="#1A181B" />
        </Pressable>
        <Pressable onPress={() => navigate('editPoster')}>
          <EditSvg />
        </Pressable>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false} >
        <Box width={width} height={width / 3 * 2}>
          {type === 'myPoster' && !data.is_active && (
            <>
              <Box
                zIndex={10}
                position='absolute'
                width={width}
                height={width / 3 * 2}
                bg='gray.700'
                opacity={70}
              />
              <Box
                zIndex={20}
                position='absolute'
                width={width}
                height={width / 3 * 2}
                display='flex'
                justifyContent='center'
                alignItems='center'
              >
                <Text fontSize='sm' fontFamily='bold' color='gray.100'>ANÚNCIO DESATIVADO</Text>
              </Box>
            </>
          )}
          <Carousel
            loop
            width={width}
            height={width / 3 * 2}
            data={carouselData}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => handleSwipeImage(index)}
            renderItem={({ item, index }) => (
              <Image key={index} w='full' h='full' alt='bike_image' source={{ uri: `${api.defaults.baseURL}/images/${item.path}` }} />
            )}
          />
          <HStack px={1} space={2} w='full' position='absolute' bottom={1}>
            {carouselData.map((item, index) => (
              <Box key={index} flex={1} height={1} rounded='full' bg='gray.100' opacity={item.active ? 80 : 50} />
            ))}
          </HStack>
        </Box>

        <ProductContent
          accept_trade={data.accept_trade}
          description={data.description}
          images={data.product_images}
          is_new={data.is_new}
          name={data.name}
          payment_methods={data.payment_methods}
          price={data.price}
        />
      </ScrollView>
      {type === 'buyPoster' ? (
        <HStack px={6} justifyContent='space-between' alignItems='center' bg='gray.100' pb={2} h={90}>
          <HStack alignItems='center' space={1}>
            <Text fontFamily='bold' fontSize='sm' color='blue.500' mt={1.5}>R$</Text>
            <Text fontFamily='bold' fontSize='2xl' color='blue.500'>{formatMoney(data.price)}</Text>
          </HStack>
          <Button leftIcon={<WppSvg />} w='50%' title='Entrar em contato' bgColor='blue.300' textColor='gray.100' />
        </HStack>
      ) : (
        <>
          <VStack px={6} pb={5} space={2}>
            {data?.is_active ?
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