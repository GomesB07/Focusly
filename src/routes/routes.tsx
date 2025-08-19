import { NavigationContainer } from "@react-navigation/native"
import AuthRoutes from "./auth.routes"
import PainelRoutes from "./painel.routes"


const Routes = () => {

    const loggedIn = false

    return (
        <NavigationContainer>
            {
                loggedIn ? <PainelRoutes /> : <AuthRoutes />
            }
        </NavigationContainer>

    )
}

export default Routes