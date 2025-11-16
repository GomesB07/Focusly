import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import CategoriesHeader from "../components/CategoriesHeader"
import { colors } from "../../../constants/colors"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppStackParamList } from "../../../routes/app.routes"
import { useEffect, useState } from "react"
import { CategoryType } from "../hooks/useCategory"
import CategoryDetailsModal from "../components/CategoryDetailsModal"

type NavigationProps = StackNavigationProp<AppStackParamList, 'Categories'>

type CategoriesScreenProps = {
    getCategories: () => Promise<CategoryType[]>
}

const CategoriesScreen = ({getCategories}: CategoriesScreenProps) => {
    const [categories, setCategories] = useState<CategoryType[]>()
    const [isLoading, setIsLoading] = useState(false)
    const [visibleModal, setVisibleModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>()
    const navigation = useNavigation<NavigationProps>()


    const getAllCategories = async () => {
        setIsLoading(true)
        const data = await getCategories()
        setCategories(data)
        setIsLoading(false)
    } 

    useEffect(() => { 
        getAllCategories()
    }, [])

    const showDetailsCategory = (category: CategoryType) => {
        setSelectedCategory(category)
        setVisibleModal(true)
    }

    return (
        <View style={styles.container}>
            <CategoriesHeader title="Categorias" onCreated={getAllCategories} />
            
            {
                isLoading ? (
                    <ActivityIndicator style={{flex: 1}} size={20} color={colors.primary} />
                ) :

                categories ? (
                    <View style={styles.containerCategories}>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => (
                                <Pressable style={[styles.containerCategory, {backgroundColor: item.color}]} onLongPress={() => showDetailsCategory(item)}>
                                    <Text style={{fontSize: 30}}>{item.icon}</Text>
                                    <Text style={styles.nameCategory}>{item.name}</Text>
                                </Pressable>
                            )}
                        />
                    </View>
                ) : (
                    <View style={styles.informations}>
                        <Text style={{fontWeight: 600, fontSize: 20}}>Você não possui nenhuma categoria</Text>
                        <Pressable onPress={() => navigation.navigate('CreateCategory', {onCreated: getAllCategories})}>
                            <Text style={{color: colors.primary, textDecorationLine: 'underline'}}>Clique aqui para criar categoria</Text>
                        </Pressable>
                    </View>
                )
            }

            <CategoryDetailsModal 
                visible={visibleModal}
                setVisible={setVisibleModal}
                category={selectedCategory}
            />
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
    },
    containerCategories: {
        flex: 1,
        paddingBottom: 30
    },
    containerCategory: {
        width: '95%',
        height: 80,
        borderRadius: 8,
        margin: 'auto',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 20
    },
    nameCategory: {
        fontSize: 15,
        color: colors.textPrimary,
        fontWeight: 600
    },
    containerModal: {
        flex: 1,
        backgroundColor: 'red'
    }
})