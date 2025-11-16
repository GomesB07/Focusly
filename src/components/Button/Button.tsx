import { ActivityIndicator, GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from "react-native"
import { colors } from "../../constants/colors"
import { JSX } from "react"
import { useNavigation, useRoute } from "@react-navigation/native";

type ButtonProps = {
    isSubmitting: boolean,
    textButton: string,
    onPress: () => void;
}


const Button = ({isSubmitting, textButton, onPress}: ButtonProps) => {

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