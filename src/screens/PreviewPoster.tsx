import React, { useEffect, useState } from 'react'
import { SafeAreaView, } from 'react-native-safe-area-context'
import { Box, HStack, Image, ScrollView, StatusBar, Text, VStack, useToast } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TabNavigatorRoutesProps } from '@routes/app.routes'
import ProductContent from '@components/ProductContent'
import Button from '@components/Button'
import Carousel from 'react-native-reanimated-carousel'
import { Dimensions } from 'react-native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { ProductPreview } from './NewPoster'

type RouteParamsProps = {
  data: ProductPreview;
}

type carouselData = {
  id: string;
  path: string;
  active: boolean;
  uri: string;
}

export default function PreviewPoster() {
  const { navigate, goBack } = useNavigation<TabNavigatorRoutesProps>()
  const { params } = useRoute()
  const { data: { accept_trade, description, images, is_new, name, payment_methods, price } } = params as RouteParamsProps
  const data = { accept_trade, description, images, is_new, name, payment_methods, price }
  const width = Dimensions.get('window').width;
  const [carouselData, setcarouselData] = useState<carouselData[]>([])
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const toast = useToast()

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

  const handleCreateImageToPoster = async (id: string) => {
    const form = new FormData()
    form.append('product_id', id);
    images.forEach(image => {
      form.append('images', image as any)
    })
    try {
      await api.post(`/products/images`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toast.show({
        title: 'Anúncio criado com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })
      navigate('posters')
    } catch (error) {
      console.log(error)
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível cadastrar o anúncio.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoadingButton(false)
    }
  }

  const handleCreatePoster = async () => {
    setIsLoadingButton(true)
    const filteredPaymentMethods = payment_methods.filter(item => {
      return item.selected
    })

    try {
      const { data } = await api.post(`/products`, {
        name,
        description,
        price,
        is_new,
        accept_trade,
        payment_methods: filteredPaymentMethods.map(item => item.key)
      })
      if (data) {
        await handleCreateImageToPoster(data.id)
      }

    } catch (error) {
      setIsLoadingButton(false)
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível registrar o anúncio.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  useEffect(() => {
    setcarouselData(images)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EDECEE' }}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor="#647AC7"
        translucent
      />
      <VStack bg='blue.300' px={6} h={100} pb={4} alignItems='center' justifyContent='flex-end'>
        <Text fontFamily='bold' fontSize='md' color='gray.100'>Pré visualização do anúncio</Text>
        <Text fontFamily='regular' fontSize='sm' color='gray.100'>É assim que seu produto vai aparecer!</Text>
      </VStack>
      <ScrollView showsVerticalScrollIndicator={false} >
        <Box width={width} height={width / 3 * 2}>
          <Carousel
            loop
            width={width}
            height={width / 3 * 2}
            data={carouselData}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => handleSwipeImage(index)}
            renderItem={({ item, index }) => (
              <Image key={index} w='full' h='full' alt='bike_image' source={{ uri: item.path ? `${api.defaults.baseURL}/images/${item.path}` : item.uri }} />
            )}
          />
          <HStack px={1} space={2} w='full' position='absolute' bottom={1}>
            {carouselData.map((item, index) => (
              <Box key={index} flex={1} height={1} rounded='full' bg='gray.100' opacity={item.active ? 80 : 50} />
            ))}
          </HStack>
        </Box>

        <ProductContent {...data} payment_methods={data.payment_methods.filter(item => item.selected)} />
      </ScrollView>
      <HStack px={6} justifyContent='space-between' alignItems='center' bg='gray.100' pb={2} h={90} space={3}>
        <Button iconName='arrow-left' iconColor='#3E3A40' title='Voltar e editar' bgColor='gray.300' textColor='gray.600' flex={1} onPress={() => goBack()} />
        <Button iconName='tag' iconColor='#EDECEE' isLoading={isLoadingButton} onPress={handleCreatePoster} title='Publicar' bgColor='blue.300' textColor='gray.100' flex={1} />
      </HStack>
    </SafeAreaView>
  )
}