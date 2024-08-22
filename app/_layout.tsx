import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo'
import { router, Slot } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'

const KEY_CLERK = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string

if (!KEY_CLERK) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth() 

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    if (isSignedIn) {
      router.replace('(auth)')
    } 
    else{
      router.replace('(public)')
    }

}, [isSignedIn])
  
  return isLoaded ? <Slot/> : (
    <>
    <ActivityIndicator size="large" color="#1FD87F" style={{flex:1, justifyContent: "center", alignItems: "center"}}/>
    </>
  )
  
}

export default function Layout() {
  return (
    <ClerkProvider publishableKey={KEY_CLERK}>
      <ClerkLoaded>
        <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider> 
  )
}