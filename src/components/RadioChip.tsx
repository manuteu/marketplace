import React from 'react'
import { Box, HStack, Pressable, Text } from 'native-base'
import { Feather } from '@expo/vector-icons'

export type ChipData = {
  name: string;
  selected: boolean;
}


type Props = {
  chips: ChipData[];
  onSelected: (chip: ChipData) => void;
}

export default function RadioChip({ chips, onSelected }: Props) {
  return (
    <HStack style={{ gap: 4 }}>
      {chips.map((chip, index) => (
        <Pressable
          key={index}
          px={4}
          py={1.5}
          alignItems='center'
          justifyContent='center'
          borderRadius='full'
          bg={chip.selected ? 'blue.300' : 'gray.300'}
          onPress={() => onSelected(chip)}
        >
          <HStack alignItems='center'>
            <Text fontFamily='bold' fontSize='xs' color={chip.selected ? 'gray.100' : 'gray.500'}>{chip.name}</Text>
            {chip.selected && (
              <Box bg='gray.100' p={0.5} mr={-2} ml={2} borderRadius='full'>
                <Feather name="x" size={8} color="#647AC7" />
              </Box>
            )}
          </HStack>
        </Pressable>
      ))}
    </HStack>
  )
}