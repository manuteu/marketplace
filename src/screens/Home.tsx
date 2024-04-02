import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Box, HStack, Image, Text, VStack, Pressable, ScrollView, FlatList, useToast, Center } from 'native-base'
import Button from '@components/Button'
import { Feather } from '@expo/vector-icons'
import PosterSvg from '@assets/poster.svg'
import SheetFilter from '@components/SheetFilter'
import Input from '@components/Input'
import ProductCard from '@components/ProductCard'
import GridView from '@components/GridView'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigatorRoutesProps, TabNavigatorRoutesProps } from '@routes/app.routes'
import { ProductDTO } from '@dtos/ProductDTO'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { useAuth } from '@hooks/useAuth'

export default function Home() {
  const { navigate } = useNavigation<TabNavigatorRoutesProps>()
  const stackNavigation = useNavigation<StackNavigatorRoutesProps>()
  const [openFilters, setOpenFilters] = useState(false)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false);
  const toast = useToast()
  const { user } = useAuth()

  const handleGetPosters = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`/products`)
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
  const userPhoto = false

  const closeFilters = () => {
    setOpenFilters(false)
  }

  const EmptyList = () => (
    <Center>
      <Text color="gray.500">Nenhum anúncio encontrado :(</Text>
    </Center>
  );

  return (
    <SafeAreaView style={{ paddingTop: 24 }}>
      <Box p={6}>
        <HStack style={{ gap: 6 }} alignItems='center'>
          <Box
            w={12}
            h={12}
            rounded='full'
            borderWidth={2}
            borderColor='blue.300'
            alignItems='center'
            justifyContent='center'
            bg='gray.700'
          >
            {userPhoto ?
              <Image
                rounded='full'
                size='full'
                source={{ uri: userPhoto }}
                alt='Foto do usuário'
              />
              :
              <Feather name="user" size={28} color="#9F9BA1" />
            }
          </Box>
          <VStack flex={1}>
            <Text fontFamily='regular' fontSize='md'>Boas vindas,</Text>
            <Text fontFamily='bold' fontSize='md'>{user.name}!</Text>
          </VStack>
          <Button onPress={() => stackNavigation.navigate('newPoster')} bgColor='gray.700' textColor='gray.100' iconName='plus' iconColor='#EDECEE' title='Criar anúncio' />
        </HStack>

        <Text mt={8} fontFamily='regular' fontSize='sm'>Seus produtos anuciados para venda</Text>
        <Pressable bgColor='#6479c71a' borderRadius={6} mt={3} mb={8}>
          <HStack alignItems='center' py={3} px={4} style={{ gap: 8 }} >
            <PosterSvg fill='#364D9D' width={22} height={22} />
            <VStack flex={1}>
              <Text fontFamily='bold' fontSize='lg' color='gray.600'>4</Text>
              <Text fontFamily='regular' fontSize='xs' color='gray.600'>anúncios ativos</Text>
            </VStack>
            <Pressable onPress={() => navigate('posters')} flexDirection='row' alignItems='center' style={{ gap: 10 }}>
              <Text fontFamily='bold' fontSize='xs' color='blue.500'>Meus anúncios</Text>
              <Feather name="arrow-right" size={16} color="#364D9D" />
            </Pressable>
          </HStack>
        </Pressable>

        <Box>
          <Text fontFamily='regular' fontSize='sm'>Compre produtos variados</Text>
          <Input
            mt={3}
            placeholder='Buscar anúncio'
            bg='white'
            rightElement={
              <HStack>
                <Pressable px={3}>
                  <Feather name="search" size={20} color="#3E3A40" />
                </Pressable>
                <Box borderWidth={0.5} borderColor='gray.400' h={5} borderRadius='full' />
                <Pressable px={3} onPress={() => setOpenFilters(true)}>
                  <Feather name="sliders" size={20} color="#3E3A40" />
                </Pressable>
              </HStack>
            }
          />
        </Box>
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard onPress={() => stackNavigation.navigate('poster', { data: { ...item }, type: 'buyPoster' })} {...item} />}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: 36,
            gap: 24,
          }}
          columnWrapperStyle={{
            gap: 20,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => EmptyList()}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
        />
        <SheetFilter isOpen={openFilters} onClose={closeFilters} />
      </Box>
    </SafeAreaView>
  )
}