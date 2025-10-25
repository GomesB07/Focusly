import { createStackNavigator } from "@react-navigation/stack"
import CreateTask from "../app/painel/createTask/createTask"
import TabRoutes from "./tab.routes"
import Categories from "../app/painel/categories/categories";
import CreateCategory from "../app/painel/createCategory/CreateCategory";


export type AppStackParamList = {
    Tab: undefined;
    CreateTask: undefined;
    Categories: undefined;
    CreateCategory: undefined;
}


const AppRoutes = () => {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Tab" component={TabRoutes} />
            <Stack.Screen name="CreateTask" component={CreateTask} />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="CreateCategory" component={CreateCategory} />
        </Stack.Navigator>
    )
}

export default AppRoutes