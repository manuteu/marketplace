import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box, HStack, ScrollView, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Select from '@components/Select'
import ProductCard from '@components/ProductCard'
import GridView from '@components/GridView'
import { useNavigation } from '@react-navigation/native'
import { StackNavigatorRoutesProps } from '@routes/app.routes'

export default function MyPosters() {
  const { navigate } = useNavigation<StackNavigatorRoutesProps>()

  const dummyData = [
    { title: "Luminária pendente", value: '45,00', state: 'new', status: 'active' },
    { title: "Coturno feminino", value: '80,00', state: 'new', status: 'active' },
    { title: "Tênis vermelho", value: '59,90', state: 'used', status: 'active' },
    { title: "Camimsa rosa", value: '50,00', state: 'used', status: 'disabled' },
  ];

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
            data={dummyData}
            renderItem={(item: any) => {
              return (
                <ProductCard onPress={() => navigate('poster', { ...item })} {...item} />
              );
            }}
          />
        </ScrollView>
      </VStack>
    </SafeAreaView>
  )
}