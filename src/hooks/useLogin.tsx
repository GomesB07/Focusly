import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AuthService } from "../services/auth-service"
import { useAuth } from "../context/loggedUser"
import AsyncStorage from "@react-native-async-storage/async-storage"

const LoginSchema = z.object({
  email: z.email({ message: 'Email inválido' }),
  password: z.string('Senha inválida').min(6, { message: "A senha precisa ter pelo menos 6 caracteres" })
})

export type LoginFormData = z.infer<typeof LoginSchema>

const useLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const {setLoggedIn} = useAuth()

  const onSubmit = async (data: LoginFormData) => {
    try {
      const getData = await AuthService.SignIn(data.email, data.password)
      await AsyncStorage.setItem('@session', JSON.stringify(getData.session))
      setLoggedIn(true)
    } catch (err) {
      console.log('ERRO AO FAZER LOGIN')
      throw err
    }
  }

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit
  }
}

export default useLogin
