import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../app/painel/home/Home"
import Tasks from "../app/painel/tasks/tasks"
import TabBar from "../components/TabBar/TabBar"
import { FontAwesome } from "@expo/vector-icons"


const TabRoutes = () => {

    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} />} screenOptions={{headerShown: false}}>
            <Tab.Screen name='Home' component={Home} 
            options={{
                tabBarIcon: ({focused, color, size}) => (
                    <FontAwesome name="home" color={color} size={size} />
                )
            }} />
            <Tab.Screen name="Tasks" component={Tasks}
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        <FontAwesome name="tasks" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default TabRoutes