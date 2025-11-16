import { createStackNavigator } from "@react-navigation/stack"
import CreateTask from "../features/tasks/wrappers/createTask"
import TabRoutes from "./tab.routes"
import Categories from "../features/categories/wrappers/Categories";
import CreateCategory from "../features/categories/wrappers/CreateCategory";

export type AppStackParamList = {
    Tab: undefined;
    CreateTask: undefined;
    Categories: undefined;
    CreateCategory: { onCreated?: () => Promise<void> };
}


const AppRoutes = () => {

    const Stack = createStackNavigator<AppStackParamList>()

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