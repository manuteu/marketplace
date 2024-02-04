import React, { useState } from 'react'
import { Select as NativeSelect } from 'native-base'
import { Feather } from '@expo/vector-icons';

export default function Select() {
  const [service, setService] = useState("");
  return (
    <NativeSelect
      selectedValue={service}
      defaultValue='all'
      minWidth="120"
      accessibilityLabel="Todos"
      placeholder="Todos"
      _selectedItem={{
        bg: "gray.200",
      }}
      onValueChange={itemValue => setService(itemValue)}
      dropdownIcon={<Feather name="chevron-down" size={22} color="#5F5B62" style={{marginRight: 8}} />}
      fontSize='sm'
      borderRadius={6}
      px={2}
      py={1}
      >
      <NativeSelect.Item label="Todos" value="all" />
      <NativeSelect.Item label="Novo" value="new" />
      <NativeSelect.Item label="Usado" value="used" />
    </NativeSelect>
  )
}