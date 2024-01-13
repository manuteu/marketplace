import React, { useState } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { Actionsheet, Box, VStack, Text, Switch, HStack } from 'native-base'
import { IActionsheetProps } from 'native-base/lib/typescript/components/composites/Actionsheet/types'
import RadioChip, { ChipData } from './RadioChip'
import CheckboxGroup, { CheckboxList } from './CheckboxGroup'
import Button from './Button'
import { Feather } from '@expo/vector-icons'

export default function SheetFilter({ ...rest }: IActionsheetProps) {
  const [chipValue, setChipValue] = useState([
    {
      selected: false,
      name: 'NOVO',
    },
    {
      selected: true,
      name: 'USADO',
    }
  ])

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
      value: 'dinheiro',
    },
    {
      selected: false,
      name: 'Cartão de Crédito',
      value: 'cartão_de_crédito',
    },
    {
      selected: false,
      name: 'Depósito Bancário',
      value: 'depósito_bancário',
    },
  ])

  const [acceptExchange, setAcceptExchange] = useState(false)

  const onPressRadioChip = (value: ChipData) => {
    const newChip = chipValue.map(chip => {
      if (chip.name === value.name) {
        chip.selected = !chip.selected
      }
      return chip
    })
    setChipValue(newChip)
  }

  const onPressCheckbox = (index: number) => {
    setCheckboxList(prevList => {
      const newList = [...prevList];
      newList[index].selected = !newList[index].selected;
      return newList;
    });
  }

  return (
    <Actionsheet maxW='container' {...rest}>
      <Actionsheet.Content bg='gray.100' alignItems='flex-start' px={6} pb={8}>
        <VStack py={5}>
          <HStack alignItems='center' justifyContent='space-between' w='full'>
            <Text color='gray.700' fontFamily='bold' fontSize='lg'>Filtrar anúncios</Text>
            <TouchableOpacity>
              <Feather name="x" size={22} color="#9F9BA1" />
            </TouchableOpacity>
          </HStack>

          <Text mb={3} color='gray.600' fontFamily='bold' fontSize='sm'>Condição</Text>
          <RadioChip chips={chipValue} onSelected={onPressRadioChip} />
          <Text mt={3} color='gray.600' fontFamily='bold' fontSize='sm'>Aceita troca?</Text>
          <Box alignItems='flex-start'>
            <Switch size={Platform.OS === 'ios' ? 'sm' : 'md'} mt={Platform.OS === 'ios' ? 2 : -1} ml={-2} value={acceptExchange} onToggle={setAcceptExchange} onTrackColor='blue.300' offTrackColor='gray.300' />
          </Box>
          <Text mt={2} mb={3} color='gray.600' fontFamily='bold' fontSize='sm'>Meios de pagamento aceitos</Text>
          <CheckboxGroup checkboxList={checkboxList} onSelected={onPressCheckbox} />
        </VStack>

        <HStack mt={10} justifyContent='space-between' alignSelf='stretch' >
          <Button w='48%' title='Resetar filtros' bgColor='gray.300' textColor='gray.600' />
          <Button w='48%' title='Aplicar filtros' bgColor='gray.700' textColor='gray.100' />
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  )
}