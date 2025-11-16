import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import {useNavigation, useRoute} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "../../routes/app.routes";

type HeaderProps = {
  title?: string;
}

type NavigationProps = StackNavigationProp<AppStackParamList, 'Categories'>

const Header = ({title}: HeaderProps) => {
  const navigation = useNavigation<NavigationProps>()
  const insets = useSafeAreaInsets();

  return (
    <View style={[headerDefaultStyles.container, { paddingTop: insets.top, alignItems: 'center' }]}>
      <StatusBar barStyle='light-content' />

      <View style={headerDefaultStyles.subcontainer}>
        <TouchableOpacity style={headerDefaultStyles.iconGoBack} onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-circle-o-left" size={50} color={colors.textPrimary} />
        </TouchableOpacity>
        { title && <Text style={headerDefaultStyles.title}>{title}</Text>}
      </View>
      
    </View>
  )
}

export default Header;


export const headerDefaultStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: "flex",
  },
  subcontainer: {
    width: '100%',
    display: 'flex',
    height: '90%',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  iconGoBack: {
    position: 'absolute',
    left: 15
  },
  title: {
    fontSize: 25,
    color: colors.textPrimary,
    fontWeight: '600'
  },
})