import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import { getHours } from "date-fns";
import { JSX } from "react";
import { useAuth, UserInfos } from "../../context/loggedUser";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import {useNavigation, useRoute} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootRoutes } from "../../routes/routes";

type HomeHeaderProps = {
  insets: EdgeInsets;
  greeting: string;
  user: UserInfos | null | undefined
}

type DefaultHeaderProps = {
  insets: EdgeInsets;
  title?: string;
  categoriesScreen?: boolean
}

type HeaderProps = {
  title?: string;
  categoriesScreen?: boolean
}

type RouteHeaders = {
  Home: JSX.Element;
  Categories: JSX.Element
}

type NavigationProps = StackNavigationProp<RootRoutes, 'CreateTask'>


const HomeHeader = ({insets, greeting, user}: HomeHeaderProps) => {
  return (
    <View style={[defaultStyles.container, { paddingTop: insets.top, flexDirection: "row", justifyContent: "space-between"}]}>
        <StatusBar barStyle="light-content" />
        <View style={stylesHome.subcontainerLeft}>
          {greeting && user && (
            <Text style={stylesHome.textNameUser}>
              {greeting}, {user.name}!
            </Text>
          )}
          <Text style={stylesHome.textTasksDay}>5 tarefas a concluir hoje.</Text>
        </View>
        <View style={stylesHome.subcontainerRight}>
          {user && user.avatar_url !== null ? (
            <Image style={stylesHome.img} source={{ uri: user.avatar_url }} />
          ) : (
            <View style={stylesHome.viewImageDefault}>
              <FontAwesome name="user" size={30} color="#bebebe" />
            </View>
          )}
        </View>
      </View>
  )
}

const DefaultHeader = ({insets, title, categoriesScreen}: DefaultHeaderProps) => {
  const navigation = useNavigation<NavigationProps>()

  return (
    <View style={[defaultStyles.container, { paddingTop: insets.top, alignItems: 'center' }]}>
      <StatusBar barStyle='light-content' />

      <View style={styles.subcontainer}>
        <TouchableOpacity style={styles.iconGoBack} onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-circle-o-left" size={50} color={colors.textPrimary} />
        </TouchableOpacity>
        { title && <Text style={styles.title}>{title}</Text>}
        
        {
          categoriesScreen && (
            <TouchableOpacity style={styles.iconAddCategory} onPress={() => navigation.navigate('CreateCategory')}>
              <FontAwesome name="plus" size={40} color={colors.textPrimary} />
            </TouchableOpacity>
          )
        }
      </View>
      
    </View>
  )
}

const Header = ({title}: HeaderProps) => {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  const { name: routeName } = useRoute();

  const greeting = (() => {
    if(routeName !== 'Home') return "";

    const hour = getHours(new Date())

    if(hour < 3) return 'Boa madrugada'
    if(hour < 12) return 'Bom dia'
    if(hour < 18) return 'Boa tarde'
    return 'Boa noite'
  })()


  const routesMap: RouteHeaders = {
    Home: <HomeHeader insets={insets} greeting={greeting} user={user} />,
    Categories: <DefaultHeader insets={insets} title={title} categoriesScreen />
  }


  return routesMap[routeName as keyof RouteHeaders] ?? <DefaultHeader insets={insets} title={title} />
};

export default Header;


const defaultStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: "flex",
    
  }
})

const stylesHome = StyleSheet.create({
  subcontainerLeft: {
    gap: 2,
    marginLeft: 10,
  },
  textNameUser: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "600",
  },
  textTasksDay: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "400",
  },
  subcontainerRight: {
    marginRight: 10,
  },
  img: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  viewImageDefault: {
    width: 50,
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});

const styles = StyleSheet.create({
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
  iconAddCategory: {
    position: 'absolute',
    right: 15,
  },
  title: {
    fontSize: 25,
    color: colors.textPrimary,
    fontWeight: '600'
  },
})