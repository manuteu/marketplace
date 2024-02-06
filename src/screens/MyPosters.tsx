import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box, HStack, ScrollView, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Select from '@components/Select'
import ProductCard from '@components/ProductCard'
import GridView from '@components/GridView'

export default function MyPosters() {

  const dummyData = [
    { name: "John Doe", id: 1 },
    { name: "Jemmy", id: 2 },
    { name: "Niraj", id: 3 },
    { name: "You", id: 4 },
  ];

  return (
    <SafeAreaView style={{ paddingTop: 24 }}>
      <VStack px={6}>
        <HStack h={20} alignItems='center' justifyContent='space-between'>
          <Box width={30} />
          <Text fontFamily='bold' fontSize='xl' color='gray.700'>Meus anúncios</Text>
          <TouchableOpacity>
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
                <ProductCard />
              );
            }}
          />
        </ScrollView>
      </VStack>
    </SafeAreaView>
  )
}