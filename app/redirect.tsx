import { useAuth, useUser, useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Redirect() {
  const router = useRouter();
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (isSignedIn) {
      console.log("User public metadata: ", JSON.stringify(user?.publicMetadata, null, 2));
      const groups = user.publicMetadata?.groups as string[] | undefined;
      if (groups && groups.includes('Pilots')) {
        router.replace("/(pilot)"); 
      } else if (groups && groups.includes('Passengers')) {
        router.replace("/(passenger)"); 
      } else {
        console.log('Usuário sem grupo: ', JSON.stringify(user)); 
        router.replace("/"); 
      }
    } else {
      console.log('Usuário não logado');
      router.replace("/(auth)"); 
    }
  }, [isLoaded, isSignedIn]);

  return null;
}