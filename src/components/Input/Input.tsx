import { StyleSheet, TextInput, TextInputProps, TouchableOpacity } from "react-native"
import { colors } from "../../constants/colors"
import { JSX, useState } from "react";

type InputProps = {
    onChangeText: (text: string) => void;
    value: string | undefined;
    placeholder: string
}

type ButtonInputProps = {
    children: JSX.Element;
    onPress: () => void;
}

const Input = ({onChangeText, value, placeholder}: InputProps) => {
    const [focused, setFocused] = useState(false)

    return (
        <TextInput
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={[stylesInput.input, {borderWidth: focused ? 1 : 0, borderColor: focused ? colors.primary : 'transparent'}]}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
        />
    )
}

export default Input

export const ButtonInput = ({children, onPress}: ButtonInputProps) => {

    return (
        <TouchableOpacity onPress={onPress} style={stylesInput.input}>
            {children}
        </TouchableOpacity>
    )
}

export const stylesInput = StyleSheet.create({
    input: {
        width: "100%",
        backgroundColor: colors.textPrimary,
        height: 50,
        borderRadius: 8,
        paddingLeft: 15,
        display: "flex",
        justifyContent: "center",
    }
})