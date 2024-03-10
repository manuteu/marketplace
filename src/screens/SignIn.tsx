import React, { useState } from 'react'
import { Box, Center, Heading, ScrollView, Text, VStack, KeyboardAvoidingView, useToast } from 'native-base'
import Input from '@components/Input'
import { Platform, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import Button from '@components/Button';
import LogoSvg from '@assets/logo_marketplace.svg'
import LogoNameSvg from '@assets/logo_name.svg'
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { AppError } from '@utils/AppError';
import { useAuth } from '@hooks/useAuth';

type FormData = {
  email: string;
  password: string;
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [itsLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()
  const toast = useToast()
  const { signIn } = useAuth()

  const handleGoToSignUp = () => {
    navigate('signUp')
  }

  const handleSignin = async ({ email, password }: FormData) => {
    setIsLoading(true)
    try {
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <KeyboardAvoidingView {...(Platform.OS === 'ios' && { behavior: 'position' })} flex={1}>
        <VStack bgColor='gray.100' px={10} borderBottomRadius={24} justifyContent='center' h='full'>
          <Center>
            <LogoSvg />
            <Box my={2} />
            <LogoNameSvg />
            <Text fontFamily='light' color='gray.500'>Seu espaço de compra e venda</Text>
          </Center>

          <Center mt={16}>
            <Heading
              color='gray.600'
              fontSize='sm'
              mb={6}
              fontFamily='regular'
            >
              Acesse sua conta
            </Heading>

            <Input
              placeholder='E-mail'
              value={email}
              onChangeText={(v) => setEmail(v)}
            />
            <Input
              placeholder='Senha'
              type={showPassword ? 'text' : 'password'}
              InputRightElement={
                <TouchableOpacity
                  onPress={() => setShowPassword(prev => !prev)}
                  style={{ padding: 12 }}
                >
                  {showPassword
                    ? <Feather name="eye" size={22} color="#5F5B62" />
                    : <Feather name="eye-off" size={22} color="#5F5B62" />
                  }
                </TouchableOpacity>
              }
              value={password}
              onChangeText={(v) => setPassword(v)}
            />
            <Button
              isLoading={itsLoading}
              mt={4}
              title='Entrar'
              bg='blue.300'
              textColor='gray.100'
              onPress={() => handleSignin({ email, password })}
            />
          </Center>
        </VStack>
      </KeyboardAvoidingView>
      <VStack bg='white' position='fixed' justifyContent='center' h='1/4' px={10} >
        <Center>
          <Text fontFamily='regular' color='gray.500'>Ainda não tem acesso?</Text>
          <Button onPress={handleGoToSignUp} mt={4} title='Criar uma conta' bg='gray.300' textColor='gray.600' />
        </Center>
      </VStack>
    </ScrollView>
  )
}