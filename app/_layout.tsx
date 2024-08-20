import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'

const KEY_CLERK = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string

if (!KEY_CLERK) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

export default function RootLayoutNav() {
  return (
    <ClerkProvider publishableKey={KEY_CLERK}>
        <Slot />
    </ClerkProvider> 
  )
}