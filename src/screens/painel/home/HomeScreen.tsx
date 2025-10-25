import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Header from "../../../components/Header/Header"
import { colors } from "../../../constants/colors"
import { DayType } from "../../../app/painel/home/Home"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootRoutes } from "../../../routes/routes"

type HomeScreenProps = {
    daysWeek: DayType[],
    activeDay: number,
    setActiveDay: (day: number) => void
}

type NavigationProps = StackNavigationProp<RootRoutes, 'Tab'>

const HomeScreen = ({daysWeek, activeDay, setActiveDay}: HomeScreenProps) => {
    const navigation = useNavigation<NavigationProps>()

    const selectedDay = (day: DayType, index: number) => {
        console.log('Dia selecionado')
        console.log(day)
        setActiveDay(index)
    }

    return (
        <>
        <Header />
        <View style={styles.container}>


            <View style={styles.viewDaysWeek}>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection: 'row'}}>
                        {
                            daysWeek && daysWeek.map((day, index) => (
                                <TouchableOpacity 
                                    style={[styles.dayWeek, {backgroundColor: index === activeDay ? colors.primary : colors.secondary}]} 
                                    key={index}
                                    onPress={() => selectedDay(day, index)}
                                    activeOpacity={1}
                                >
                                    <Text style={styles.textDayWeek}>{day.dayString}</Text>
                                    <Text style={styles.textDayWeek}>{day.day}</Text>
                                    <View style={[styles.pointTask, {backgroundColor: index !== activeDay ? colors.primary : colors.secondary}]}></View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>

            <Text>Home Screen</Text>
            
            <TouchableOpacity style={styles.buttonAddTask} onPress={() => navigation.navigate('CreateTask')}>
                <FontAwesome name="plus" size={20} color={colors.textPrimary} />
            </TouchableOpacity>

        </View>
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewDaysWeek: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 10,
    },
    dayWeek: {
        width: 70,
        height: 80,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        marginHorizontal: 4
    },
    textDayWeek: {
        color: colors.textPrimary,
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'capitalize'
    },
    pointTask: {
        width: 10,
        height: 10,
        backgroundColor: colors.secondary,
        borderRadius: 5
    },



    buttonAddTask: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        bottom: 20,
    }
})