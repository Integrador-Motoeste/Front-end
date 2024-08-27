import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo'
import { router, Slot } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'

const KEY_CLERK = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string



export default function Layout() {
  return (
    <Slot/>
  )
}