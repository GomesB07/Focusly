import { Pressable, StyleSheet, Text, View } from "react-native"
import Header from "../../../components/Header/Header"
import { colors } from "../../../constants/colors"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppStackParamList } from "../../../routes/app.routes"

type NavigationProps = StackNavigationProp<AppStackParamList, 'Categories'>

const CategoriesScreen = () => {

    const navigation = useNavigation<NavigationProps>()

    return (
        <View style={styles.container}>
            <Header title="Categorias" categoriesScreen />
            
            <View style={styles.informations}>
                <Text style={{fontWeight: 600, fontSize: 20}}>Você não possui nenhuma categoria</Text>
                <Pressable onPress={() => navigation.navigate('CreateCategory')}>
                    <Text style={{color: colors.primary, textDecorationLine: 'underline'}}>Clique aqui para criar categoria</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    informations: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    }
})