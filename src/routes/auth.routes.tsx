import { createStackNavigator } from "@react-navigation/stack";
import Login from "../app/auth/login/Login";
import Onboarding from "../app/onboarding/Onboarding";

export type RootStackParamList = {
    onboarding: undefined;
    login: undefined;
};
const AuthRoutes = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="onboarding" component={Onboarding} options={{headerShown: false}} />
            <Stack.Screen name="login" component={Login} options={{headerShown: false}} />
        </Stack.Navigator>
    )

}

export default AuthRoutes;