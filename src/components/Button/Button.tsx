import { ActivityIndicator, GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native"
import { colors } from "../../constants/colors"
import { JSX } from "react"
import { useNavigation, useRoute } from "@react-navigation/native";

type ButtonProps = {
    isSubmitting: boolean,
    textButton: string,
    onPress: () => void;
}

type RouteButtons = {
    CreateTask: JSX.Element;
    CreateCategory: JSX.Element;
}


const ButtonCreate = ({isSubmitting, textButton, onPress}: ButtonProps) => {

    return (
        <TouchableOpacity style={stylesCreateTask.buttonForm} onPress={onPress}>
            {
                isSubmitting ? (
                    <ActivityIndicator color={colors.textPrimary} size={20} />
                ) : (
                    <Text style={stylesCreateTask.textButtonForm}>{textButton}</Text>
                )
            }
        </TouchableOpacity>
    )
}


const ButtonDefault = ({isSubmitting, textButton, onPress}: ButtonProps) => {

    return (
        <TouchableOpacity style={stylesDefault.buttonForm} onPress={onPress}>
            {
                isSubmitting ? (
                    <ActivityIndicator color={colors.textPrimary} size={20} />
                ) : (
                    <Text style={stylesDefault.textButtonForm}>{textButton}</Text>
                )
            }
        </TouchableOpacity>
    )
}


const Button = ({isSubmitting, onPress, textButton }: ButtonProps) => {

    const {name: routeName} = useRoute()

    

    const routesMap = {
        CreateTask: <ButtonCreate isSubmitting={isSubmitting} onPress={onPress} textButton={textButton} />,
        CreateCategory: <ButtonCreate isSubmitting={isSubmitting} onPress={onPress} textButton={textButton} />
    }

    return routesMap[routeName as keyof RouteButtons] ?? <ButtonDefault isSubmitting={isSubmitting} onPress={onPress} textButton={textButton} />
}

export default Button

const stylesDefault = StyleSheet.create({
    buttonForm: {
        width: '95%',
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    textButtonForm: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: 'bold'
    }
})

const stylesCreateTask = StyleSheet.create({
    ...stylesDefault,
    buttonForm: {
        ...stylesDefault.buttonForm,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary,
    },
    textButtonForm: {
        ...stylesDefault.textButtonForm,
        color: colors.primary,
        fontSize: 20,
        fontWeight: 500
    }
})