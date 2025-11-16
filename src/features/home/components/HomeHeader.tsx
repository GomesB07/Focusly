import { FontAwesome } from "@expo/vector-icons"
import { useRoute } from "@react-navigation/native";
import { getHours } from "date-fns";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../../context/loggedUser";
import { colors } from "../../../constants/colors";
import { headerDefaultStyles } from "../../../components/Header/Header";


const HomeHeader = () => {
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


  return (
    <View style={[headerDefaultStyles.container, { paddingTop: insets.top, flexDirection: "row", justifyContent: "space-between"}]}>
        <StatusBar barStyle="light-content" />
        <View style={styles.subcontainerLeft}>
          {greeting && user && (
            <Text style={styles.textNameUser}>
              {greeting}, {user.name}!
            </Text>
          )}
          <Text style={styles.textTasksDay}>5 tarefas a concluir hoje.</Text>
        </View>
        <View style={styles.subcontainerRight}>
          {user && user.avatar_url !== null ? (
            <Image style={styles.img} source={{ uri: user.avatar_url }} />
          ) : (
            <View style={styles.viewImageDefault}>
              <FontAwesome name="user" size={30} color="#bebebe" />
            </View>
          )}
        </View>
      </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
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
})