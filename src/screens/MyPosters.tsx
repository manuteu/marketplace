import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box, HStack, ScrollView, Text, VStack, useToast } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Select from '@components/Select'
import ProductCard from '@components/ProductCard'
import GridView from '@components/GridView'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigatorRoutesProps } from '@routes/app.routes'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'
import { ProductDTO } from '@dtos/ProductDTO'

export default function MyPosters() {
  const { navigate } = useNavigation<StackNavigatorRoutesProps>()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<ProductDTO[]>([])
  const toast = useToast()

  const handleGetPosters = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`/users/products`)
      console.log('data', data[0])
      setProducts(data)

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar seus anúncios.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    handleGetPosters()
  }, []))

  return (
    <SafeAreaView style={{ paddingTop: 24 }}>
      <VStack px={6}>
        <HStack h={20} alignItems='center' justifyContent='space-between'>
          <Box width={30} />
          <Text fontFamily='bold' fontSize='xl' color='gray.700'>Meus anúncios</Text>
          <TouchableOpacity onPress={() => navigate('newPoster')}>
            <Feather name="plus" size={30} color="#1A181B" />
          </TouchableOpacity>
        </HStack>

        <ScrollView>

          <HStack mt={4} mb={6} alignItems='center' justifyContent='space-between'>
            <Text fontFamily='regular' fontSize='sm' color='gray.600'>9 anúncios</Text>
            <Select />
          </HStack>

          <GridView
            data={products}
            renderItem={(item: ProductDTO) => {
              return (
                <ProductCard onPress={() => navigate('poster', { data: item, type: 'myPoster' })} {...item} />
              );
            }}
          />
        </ScrollView>
      </VStack>
    </SafeAreaView>
  )
}