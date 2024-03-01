import React, { useEffect, useState } from 'react'
import { SafeAreaView, } from 'react-native-safe-area-context'
import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base'
import { Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';

export default function NewPoster() {
  const { goBack } = useNavigation()
  const [images, setImages] = useState<string[]>([]);
  const imageWidth = Dimensions.get('window').width / 3 - 20

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets[0].uri !== null) {
      const imgs: string[] = []
      imgs.push(result.assets[0].uri)
      setImages((prev: string[]) => [...prev, ...imgs]);
    }
  };

  const removeImage = (image: string) => {
    const removedImage = images.filter(img => img !== image)
    setImages(removedImage)
  }

  useEffect(() => {
    console.log(images);

  }, [images])

  return (
    <SafeAreaView style={{ paddingTop: 24, flex: 1, backgroundColor: '#EDECEE' }}>
      <HStack px={6} h={14} alignItems='center' justifyContent='space-between'>
        <Pressable onPress={() => goBack()}>
          <Feather name="arrow-left" size={24} color="#1A181B" />
        </Pressable>
        <Text fontSize='lg' fontFamily='bold' color='gray.700'>Criar anúncio</Text>
        <Box w='24px' />
      </HStack>
      <VStack py={2} px={6}>
        <VStack space={1}>
          <Text fontSize='md' fontFamily='bold' color='gray.600'>Imagens</Text>
          <Text fontSize='sm' fontFamily='regular' color='gray.500'>Escolha até 3 imagens para mostrar o quando o seu produto é incrível!</Text>
        </VStack>
        <HStack mt={4} space={2} >
          {images.length > 0 && images.map(image => (
            <Box w={imageWidth} h={imageWidth}>
              <Image rounded='md' source={{ uri: image }} alt='image' w={imageWidth} h={imageWidth} />
              <Pressable
                position='absolute'
                right={1}
                top={1}
                bg='gray.600'
                rounded='full'
                p={1}
                onPress={() => removeImage(image)}
              >
                <Feather
                  name="x"
                  size={14}
                  color="#F7F7F8"
                />
              </Pressable>
            </Box>
          ))}
          {images.length < 3 && (
            <Pressable
              w={imageWidth}
              h={imageWidth}
              bg='gray.300'
              onPress={pickImage}
              display='flex'
              justifyContent='center'
              alignItems='center'
              rounded='md'
            >
              <Feather name="plus" size={24} color="#9F9BA1" />
            </Pressable>
          )}
        </HStack>
      </VStack>
    </SafeAreaView>
  )
}