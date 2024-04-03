import React, { useState } from 'react'
import { SafeAreaView, } from 'react-native-safe-area-context'
import { Box, HStack, Image, KeyboardAvoidingView, Pressable, Radio, ScrollView, Switch, Text, VStack, useToast } from 'native-base'
import { Dimensions, Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import Input from '@components/Input'
import CheckboxGroup, { CheckboxList } from '@components/CheckboxGroup'
import Button from '@components/Button'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'

export default function NewPoster() {
  const imageWidth = Dimensions.get('window').width / 3 - 20
  const { goBack } = useNavigation()
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const [images, setImages] = useState<string[]>([]);
  const [acceptTrade, setAcceptTrade] = useState(false)
  const [radioValue, setRadioValue] = useState('')
  const [checkboxList, setCheckboxList] = useState<CheckboxList[]>([
    {
      selected: false,
      name: 'Boleto',
      value: 'boleto',
    },
    {
      selected: false,
      name: 'Pix',
      value: 'pix',
    },
    {
      selected: false,
      name: 'Dinheiro',
      value: 'cash',
    },
    {
      selected: false,
      name: 'Cartão de Crédito',
      value: 'card',
    },
    {
      selected: false,
      name: 'Depósito Bancário',
      value: 'deposit',
    },
  ])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const toast = useToast()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      toast.show({
        title: 'Imagem Cancelada',
        tintColor: 'yellow.500',
        placement: 'top',
      })
      return
    }

    if (result.assets[0].uri !== null) {
      const imgs: string[] = []
      imgs.push(result.assets[0].uri)
      setImages((prev: string[]) => [...prev, ...imgs]);
    }
  };

  const removeImage = (image: string) => {
    const removedImage = images.filter(img => img !== image)
    setImages(removedImage)
  }

  const onPressCheckbox = (index: number) => {
    setCheckboxList(prevList => {
      const newList = [...prevList];
      newList[index].selected = !newList[index].selected;
      return newList;
    });
  }

  const paymentMethodsPayload = () => {
    const maps = checkboxList.filter(item => {
      return item.selected
    })
    return maps.map(item => item.value)
  }

  const handleCreateImageToPoster = async (id: string) => {
    const form = new FormData()
    form.append('product_id', id);
    images.forEach(image => {
      form.append('images', new Blob(image as any))
    })
    try {
      const { data } = await api.post(`/products/images`, {
        form
      })

      console.log(data)

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
    try {
      const { data } = await api.post(`/products`, {
        name,
        description,
        price: Number(price),
        is_new: radioValue === 'new' ? true : false,
        accept_trade: acceptTrade,
        payment_methods: paymentMethodsPayload()
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

  return (
    <SafeAreaView style={{ paddingTop: 24, flex: 1, backgroundColor: '#EDECEE' }}>
      <HStack px={6} h={14} alignItems='center' justifyContent='space-between'>
        <Pressable onPress={() => goBack()}>
          <Feather name="arrow-left" size={24} color="#1A181B" />
        </Pressable>
        <Text fontSize='lg' fontFamily='bold' color='gray.700'>Criar anúncio</Text>
        <Box w='24px' />
      </HStack>

      <ScrollView showsVerticalScrollIndicator={false} pb={2}>
        <KeyboardAvoidingView {...(Platform.OS === 'ios' && { behavior: 'position' })}>
          <VStack py={2} px={6} space={8}>
            <VStack>
              <VStack space={1}>
                <Text fontSize='md' fontFamily='bold' color='gray.600'>Imagens</Text>
                <Text fontSize='sm' fontFamily='regular' color='gray.500'>Escolha até 3 imagens para mostrar o quando o seu produto é incrível!</Text>
              </VStack>

              <HStack mt={4} space={2} >
                {images.length > 0 && images.map((image, index) => (
                  <Box key={index} w={imageWidth} h={imageWidth}>
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

            <VStack>
              <Box>
                <Text fontSize='md' fontFamily='bold' color='gray.600'>Sobre o produto</Text>
                <Input mt={3} placeholder='Título do anúncio' value={name} onChangeText={(n) => setName(n)} />
                <Input textArea placeholder='Descrição do produto' value={description} onChangeText={(d) => setDescription(d)} />
              </Box>

              <Box>
                <Radio.Group
                  display='flex'
                  flexDirection='row'
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={radioValue}
                  onChange={nextValue => {
                    setRadioValue(nextValue)
                  }}
                >
                  <HStack space={5} mb={8}>
                    <Radio value="new" w={5} h={5}>
                      <Text fontSize='md' fontFamily='regular' color='gray.700'>
                        Produto novo
                      </Text>
                    </Radio>
                    <Radio value="used" w={5} h={5}>
                      <Text fontSize='md' fontFamily='regular' color='gray.700'>
                        Produto usado
                      </Text>
                    </Radio>
                  </HStack>
                </Radio.Group>
              </Box>

              <Box>
                <Text fontSize='md' fontFamily='bold' color='gray.600'>Venda</Text>
                <Input
                  mt={3}
                  placeholder='Valor do produto'
                  value={price}
                  onChangeText={(v) => setPrice(v)}
                  InputLeftElement={
                    <Text fontSize='md' fontFamily='regular' ml={4}>
                      R$
                    </Text>
                  }
                />
              </Box>

              <Box alignItems='flex-start'>
                <Text fontSize='md' fontFamily='bold' color='gray.600'>Aceita troca?</Text>
                <Switch
                  size={Platform.OS === 'ios' ? 'sm' : 'md'}
                  mt={Platform.OS === 'ios' ? 2 : -1}
                  ml={-2}
                  value={acceptTrade}
                  onToggle={setAcceptTrade}
                  onTrackColor='blue.300'
                  offTrackColor='gray.300'
                />
              </Box>

              <Box>
                <Text mt={2} mb={3} color='gray.600' fontFamily='bold' fontSize='sm'>Meios de pagamento aceitos</Text>
                <CheckboxGroup checkboxList={checkboxList} onSelected={onPressCheckbox} />
              </Box>
            </VStack>
          </VStack>
        </KeyboardAvoidingView>
      </ScrollView>
      <HStack px={6} justifyContent='space-between' alignItems='center' bg='gray.100' pb={2} h={90} space={3}>
        <Button title='Cancelar' bgColor='gray.300' textColor='gray.600' flex={1} />
        <Button isLoading={isLoadingButton} onPress={handleCreatePoster} title='Avançar' bgColor='gray.700' textColor='gray.100' flex={1} />
      </HStack>
    </SafeAreaView>
  )
}