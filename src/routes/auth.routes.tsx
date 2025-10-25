import { createStackNavigator } from "@react-navigation/stack";
import Login from "../app/auth/login/Login";
import Onboarding from "../app/onboarding/Onboarding";
import SignUp from "../app/auth/signUp/SignUp";

export type AuthStackParamList = {
    Onboarding: undefined;
    Login: undefined;
    SignUp: undefined;
};
const AuthRoutes = () => {

    const Stack = createStackNavigator<AuthStackParamList>();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {/* <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown: false}} /> */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )

}

export default AuthRoutes;