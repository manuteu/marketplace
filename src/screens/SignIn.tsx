import React, { useState } from 'react'
import { Box, Center, Heading, ScrollView, Text, VStack, KeyboardAvoidingView } from 'native-base'
import Input from '@components/Input'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import Button from '@components/Button';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bgColor='gray.100'
    >
      <KeyboardAvoidingView>

        <VStack flex={1}>
          <Box flex={1} px={10}>
            <Center>
              <Text size='sm' fontWeight='light' color='gray.500'>Seu espaço de compra e venda</Text>
            </Center>

            <Center>
              <Heading
                color='gray.600'
                fontSize='sm'
                mb={6}
                fontFamily='regular'
              >
                Acesse sua conta
              </Heading>

              <Input placeholder='E-mail' />
              <Input placeholder='Senha' type={showPassword ? 'text' : 'password'} InputRightElement={<TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={{ padding: 12 }}><Feather name="eye" size={22} color="#5F5B62" /></TouchableOpacity>} />
              <Button mt={4} title='Entrar' bg='blue.300' textColor='gray.100' />
            </Center>
          </Box>
        </VStack>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}