import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box, FlatList, HStack, ScrollView, Text, VStack, useToast } from 'native-base'
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const toast = useToast()

  const handleGetPosters = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`/users/products`)

      setProducts(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar seus anúncios.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    try {
      setIsRefreshing(true);
      handleGetPosters();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível recarregar os produtos";

      toast.show({
        title,
        bgColor: "red.400",
      });
    } finally {
      setIsRefreshing(false);
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

        <HStack mt={4} mb={2} alignItems='center' justifyContent='space-between'>
          <Text fontFamily='regular' fontSize='sm' color='gray.600'>{products.length} {products.length === 1 ? 'anúncio' : 'anúncios'}</Text>
          <Select />
        </HStack>
        <FlatList
          pt={4}
          data={products}
          renderItem={({ item }) => <ProductCard onPress={() => navigate('poster', { data: { ...item }, type: 'buyPoster' })} {...item} />}
          keyExtractor={({ id }) => id}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: 180,
            gap: 24,
          }}
          columnWrapperStyle={{
            gap: 20,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <Text></Text>}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
        />
      </VStack>
    </SafeAreaView>
  )
}