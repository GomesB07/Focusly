import { StackNavigationProp } from "@react-navigation/stack";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { AppStackParamList } from "../../../routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { headerDefaultStyles } from "../../../components/Header/Header";


type CategoryHeaderProps = {
  title?: string;
  categoriesScreen?: boolean
  onCreated?: () => Promise<void>
}

type NavigationProps = StackNavigationProp<AppStackParamList, 'Categories'>

const CategoriesHeader = ({title, onCreated}: CategoryHeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProps>()

  return (
    <View style={[headerDefaultStyles.container, { paddingTop: insets.top, alignItems: 'center' }]}>
      <StatusBar barStyle='light-content' />

      <View style={headerDefaultStyles.subcontainer}>
        <TouchableOpacity style={headerDefaultStyles.iconGoBack} onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-circle-o-left" size={50} color={colors.textPrimary} />
        </TouchableOpacity>
        { title && <Text style={headerDefaultStyles.title}>{title}</Text>}
        
        
        <TouchableOpacity style={styles.iconAddCategory} onPress={() => navigation.navigate('CreateCategory', { onCreated })}>
            <FontAwesome name="plus" size={40} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default CategoriesHeader

const styles = StyleSheet.create({
  iconAddCategory: {
    position: 'absolute',
    right: 15,
  },
})