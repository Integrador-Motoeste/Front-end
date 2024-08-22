// const { isLoaded, signUp, setActive } = useSignUp()
//     const router = useRouter()

//     const [emailAddress, setEmailAddress] = useState('');
//     const [password, setPassword] = useState('');

//     const { signOut } = useAuth();
//     const { user } = useUser();
//     const [pendingVerification, setPendingVerification] = useState(false)
//     const [code, setCode] = useState('')



//   const onSignUpPress = async () => {
//     if (!isLoaded) {
//       return
//     }

//     try {
//       await signUp.create({
//         emailAddress,
//         password,
//       })

//       await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

//       setPendingVerification(true)
//     } catch (err: any) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2))
//     }
//   }

//   const onPressVerify = async () => {
//     if (!isLoaded) {
//       return
//     }

//     try {
//       const completeSignUp = await signUp.attemptEmailAddressVerification({
//         code,
//       })

//       if (completeSignUp.status === 'complete') {
//         await setActive({ session: completeSignUp.createdSessionId })
//         router.replace('/(auth)/')
//       } else {
//         console.error(JSON.stringify(completeSignUp, null, 2))
//       }
//     } catch (err: any) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2))
//     }
//   }

    

//     const handleSignOut = async () => {
//         try {
//           await signOut();
//           console.log('Usuário deslogado com sucesso!');
//           // Você pode redirecionar o usuário para a tela de login aqui, se necessário
//         } catch (error) {
//           console.error('Erro ao deslogar:', error);
//         }
//       };

//       if (!fontsLoaded) {
//         return null;
//     }

{/* <>
          <Input value={code} placeholder="Code..." onChangeText={(code: string)=> setCode(code)} />
          <Button title="Verify Email" onPress={onPressVerify} />
        </> */}