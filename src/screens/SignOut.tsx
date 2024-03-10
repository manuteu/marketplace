import { View } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@hooks/useAuth'

export default function SignOut() {
  const { signOut } = useAuth()
  useEffect(() => {
    signOut()
  }, [])
  return (
    <View />
  )
}