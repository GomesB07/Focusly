import { createStackNavigator } from "@react-navigation/stack";
import Login from "../features/auth/wrappers/Login";
import Onboarding from "../features/onboarding/wrappers/Onboarding";
import SignUp from "../features/auth/wrappers/SignUp";

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