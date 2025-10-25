import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AuthService } from "../services/auth-service"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootRoutes } from "../routes/routes"


const SignUpSchema = z.object({
  name: z.string('Nome inválido').min(2, { message: "O nome precisa ter pelo menos 2 caracteres" }),
  email: z.email({ message: 'Email inválido' }),
  password: z.string('Senha inválida').min(6, { message: "A senha precisa ter pelo menos 6 caracteres" })
})

export type SignUpFormData = z.infer<typeof SignUpSchema>

type AuthNavigationProp = StackNavigationProp<RootRoutes, 'SignUp'>

const useSignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const navigation = useNavigation<AuthNavigationProp>()

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await AuthService.SignUp(data.email, data.password, data.name)
      navigation.goBack()
    }
    catch (err) {
      console.log('FALHA AO CRIAR USUÁRIO')
      console.log(err)
    }
  }

  return {
    control,
    onSubmit,
    handleSubmit,
    errors,
    isSubmitting
  }
}

export default useSignUp
