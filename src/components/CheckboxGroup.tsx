import React from 'react'
import { Checkbox, Text, VStack } from 'native-base'

export type CheckboxList = {
  selected: boolean;
  value: string;
  name: string;

}

type Props = {
  checkboxList: CheckboxList[];
  onSelected: (index: number) => void;
}

export default function CheckboxGroup({ checkboxList, onSelected }: Props) {
  return (
    <VStack>
      {checkboxList.map((checkbox, index) => (
        <Checkbox
          key={index}
          mb={2}
          value={checkbox.value}
          onChange={() => {
            onSelected(index)
          }}
          accessibilityLabel='This is a checkbox list'
          _checked={{
            backgroundColor: 'blue.300',
            borderColor: 'blue.300',
            _pressed: {
              borderColor: 'blue.300',
            }
          }}
          _pressed={{
            borderColor: 'blue.300',
          }}
          borderRadius={3}
          borderColor='gray.400'
        >
          <Text
            fontSize='md'
            fontFamily='regular'
            color='gray.600'
          >
            {checkbox.name}
          </Text>
        </Checkbox>
      ))}
    </VStack>
  )
}