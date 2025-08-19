import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../app/painel/home/Home"


const PainelRoutes = () => {

    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator>
            <Tab.Screen name='home' component={Home} />
        </Tab.Navigator>
    )
}

export default PainelRoutes