import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Box, HStack, Image, Text, VStack, Pressable, ScrollView } from 'native-base'
import Button from '@components/Button'
import { Feather } from '@expo/vector-icons'
import PosterSvg from '@assets/poster.svg'
import SheetFilter from '@components/SheetFilter'
import Input from '@components/Input'
import ProductCard from '@components/ProductCard'
import GridView from '@components/GridView'
import { useNavigation } from '@react-navigation/native'
import { StackNavigatorRoutesProps, TabNavigatorRoutesProps } from '@routes/app.routes'

export default function Home() {
  const { navigate } = useNavigation<TabNavigatorRoutesProps>()
  const stackNavigation = useNavigation<StackNavigatorRoutesProps>()
  const [openFilters, setOpenFilters] = useState(false)
  const dummyData = [
    { title: "Luminária pendente", value: '45,00', state: 'new', status: 'active' },
    { title: "Coturno feminino", value: '80,00', state: 'new', status: 'active' },
    { title: "Tênis vermelho", value: '59,90', state: 'used', status: 'active' },
    { title: "Camimsa rosa", value: '50,00', state: 'used', status: 'disabled' },
  ];

  const userPhoto = false

  const closeFilters = () => {
    setOpenFilters(false)
  }
  return (
    <SafeAreaView style={{ paddingTop: 24 }}>
      <ScrollView p={6} stickyHeaderIndices={[3]}>
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
            <Text fontFamily='bold' fontSize='md'>Matheus!</Text>
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
        <GridView
          data={dummyData}
          renderItem={(item: any) => {
            return (
              <ProductCard onPress={() => stackNavigation.navigate('poster', { ...item })} {...item}/>
            );
          }}
        />
      </ScrollView>
      <SheetFilter isOpen={openFilters} onClose={closeFilters} />
    </SafeAreaView>
  )
}