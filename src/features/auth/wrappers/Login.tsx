import useLogin from "../hooks/useLogin"
import LoginScreen from "../screens/LoginScreen"


const Login = () => {
    const {control, handleSubmit, errors, isSubmitting, onSubmit} = useLogin()

    return <LoginScreen control={control} handleSubmit={handleSubmit} errors={errors} isSubmitting={isSubmitting} onSubmit={onSubmit} />
}

export default Login