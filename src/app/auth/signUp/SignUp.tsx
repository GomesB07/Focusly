import useSignUp from "../../../hooks/useSignUp"
import SignUpScreen from "../../../screens/auth/signUp/SignUpScreen"


const SignUp = () => {
    const {control, onSubmit, handleSubmit, errors, isSubmitting} = useSignUp()

    return (
        <SignUpScreen control={control} onSubmit={onSubmit} handleSubmit={handleSubmit} errors={errors} isSubmitting={isSubmitting} />
    )
}

export default SignUp