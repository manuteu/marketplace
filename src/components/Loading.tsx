import { Center, Spinner } from 'native-base'
import React from 'react'

export default function Loading() {
  return (
    <Center flex={1}>
      <Spinner />
    </Center>
  )
}