import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box, HStack, ScrollView, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Select from '@components/Select'
import ProductCard from '@components/ProductCard'

export default function MyPosters() {
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

          <ProductCard />
        </ScrollView>
      </VStack>
    </SafeAreaView>
  )
}