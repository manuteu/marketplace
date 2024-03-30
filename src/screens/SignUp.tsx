import React, { useState } from 'react'
import { Box, Center, Heading, ScrollView, Text, VStack, KeyboardAvoidingView, Image, useToast, Skeleton } from 'native-base'
import Input from '@components/Input'
import { Platform, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import Button from '@components/Button';
import LogoSvg from '@assets/logo_marketplace.svg'
import EditSvg from '@assets/edit_icon.svg'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [loadingImage, setLoadingImage] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [password, setPassword] = useState('')
  const [userAvatar, setUserAvatar] = useState<string | undefined>()
  const [userAvatarFormData, setUserAvatarFormData] = useState<any>()
  const toast = useToast()
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()

  const handleGoToSignIn = () => {
    navigate('signIn')
  }

  const handleUserPhotoSelect = async () => {
    setLoadingImage(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (!photoSelected.assets) {
        return
      }

      // Utiliza o FileSystem para verificar o tamanho da imagem, já que o Image picker não possui essa função
      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

        // Converte para 5 MB
        if (photoInfo.exists && photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          // Snackbar, notifica o usuário com uma mensagem
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
            placement: 'top',
            bgColor: 'red.500'
          })
        }

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();
        const photoFile = {
          name: `${name}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setUserAvatarFormData(photoFile);
        setUserAvatar(photoSelected.assets[0].uri)
        toast.show({
          title: 'Foto atualizada!',
          placement: 'top',
          bgColor: 'green.500'
        })
      }

    } catch (error) {
      console.error(error)
    } finally {
      setLoadingImage(false)
    }
  }

  const handleSignUp = async () => {
    setLoadingButton(true)
    // console.log('userAvatar', userAvatar);
    // console.log('userAvatarFormData', userAvatarFormData);

    try {
      const form = new FormData()
      form.append('name', name);
      form.append('email', email);
      form.append('tel', tel);
      form.append('password', password);
      form.append('avatar', userAvatarFormData)
      console.log(form);
      
      const { data } = await api.post('/users', {
        form
        // name,
        // email,
        // tel,
        // password,
        // userAvatarFormData
      })
      console.log(data);

    } catch (error) {
      console.log(error);

      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível cadastrar. Tente novamente mais tarde.'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
      setLoadingButton(false)
    } finally {
      setLoadingButton(false)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
      bgColor='gray.100'
    >
      <KeyboardAvoidingView flex={1} >
        <VStack px={10} justifyContent='center' mt={10}>
          <Center>
            <LogoSvg width={70} height={70} />
            <Text fontFamily='bold' fontSize='lg' color='gray.700'>Boas Vindas!</Text>
            <Text fontFamily='regular' fontSize='sm' textAlign='center' color='gray.600'>Crie sua conta e use o espaço para comprar itens variados e vender seus produtos</Text>
          </Center>

          <Center mt={10}>
            <Box w={24} h={24} mb={4} rounded='full' borderWidth={3} borderColor='blue.300' alignItems='center' justifyContent='center' >
              {loadingImage && (
                <Skeleton
                  w={24}
                  h={24}
                  rounded='full'
                  startColor='gray.400'
                  endColor='gray.600'
                />
              )}
              {!loadingImage && userAvatar ?
                <Image
                  rounded='full'
                  size='full'
                  source={{ uri: userAvatar }}
                  alt='Foto do usuário'
                />
                : !loadingImage &&
                <Feather name="user" size={55} color="#9F9BA1" />
              }
              <TouchableOpacity onPress={handleUserPhotoSelect} style={{ position: 'absolute', backgroundColor: '#647AC7', bottom: 0, right: -10, padding: 10, borderRadius: 50 }}>
                <EditSvg />
              </TouchableOpacity>
            </Box>
            <Input
              placeholder='Nome'
              value={name}
              onChangeText={(v) => setName(v)}
            />
            <Input
              placeholder='E-mail'
              value={email}
              onChangeText={(v) => setEmail(v)}
            />
            <Input
              placeholder='Telefone'
              value={tel}
              onChangeText={(v) => setTel(v)}
            />
            <Input
              placeholder='Senha'
              textContentType="oneTimeCode"
              type={showPassword ? 'text' : 'password'}
              InputRightElement={
                <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={{ padding: 12 }}>
                  <Feather name="eye" size={22} color="#5F5B62" />
                </TouchableOpacity>}
              value={password}
              onChangeText={(v) => setPassword(v)}
            />
            <Input
              placeholder='Confirmar Senha'
              textContentType="oneTimeCode"
              type={showPassword ? 'text' : 'password'}
              InputRightElement={
                <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={{ padding: 12 }}>
                  <Feather name="eye" size={22} color="#5F5B62" />
                </TouchableOpacity>}
            />
            <Button
              mt={4}
              title='Criar'
              bg='gray.700'
              textColor='gray.100'
              width='full'
              isLoading={loadingButton}
              onPress={handleSignUp}
            />
          </Center>
        </VStack>
      </KeyboardAvoidingView>
      <VStack justifyContent='center' px={10} pt={10} pb={16}>
        <Center>
          <Text fontFamily='regular' color='gray.500'>Já tem uma conta?</Text>
          <Button
            onPress={handleGoToSignIn}
            mt={4}
            title='Ir para o login'
            bg='gray.300'
            textColor='gray.600'
            width='full'
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}