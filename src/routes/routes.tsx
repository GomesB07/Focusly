import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./auth.routes";
import { AuthProvider, useAuth } from "../context/loggedUser";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoadingScreen from "../../LoadingScreen";
import AppRoutes from "./app.routes";
import { AppStackParamList } from "./app.routes";
import { AuthStackParamList } from "./auth.routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export type RootRoutes = AuthStackParamList & AppStackParamList

const RoutesContent = () => {
  const { loggedIn, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return loggedIn ? <AppRoutes /> : <AuthRoutes />;
};

const Routes = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthProvider>
            <RoutesContent />
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default Routes;
