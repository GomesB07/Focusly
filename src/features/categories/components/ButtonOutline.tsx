import { FontAwesome } from "@expo/vector-icons";
import { use, useState } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native"
import Animated, { SharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

type ButtonOutlineProps = {
    onPress: () => void;
    width: SharedValue<number>;
    color: string;
    iconName: React.ComponentProps<typeof FontAwesome>['name'] | false
    opacity?: SharedValue<number>;
    translateXEdit?: SharedValue<number>;
    buttonDelete?: boolean;
    widthDimension: number;
}


const ButtonOutline = ({onPress, color, iconName, width, opacity, translateXEdit, buttonDelete, widthDimension}: ButtonOutlineProps) => {

    const [widthButton, setWidthButton] = useState(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX: translateXEdit?.value ?? 0},
        ],
        opacity: opacity?.value,
        width: width?.value
    }))

    const getWidthButton = (data: LayoutChangeEvent) => {
        setWidthButton(Math.round(data.nativeEvent.layout.width))
    }

    return (
        <Animated.View 
            style={[{position: 'absolute', left: buttonDelete ? 10 : widthDimension - (widthButton + 10)}, animatedStyle]}
            onLayout={(data) => getWidthButton(data)}
        >
            <Pressable 
                onPress={onPress} 
                style={[styles.button, {borderColor: color}]}
            >
                {
                    iconName && (<FontAwesome name={iconName} size={24} color={color} />)
                }
            </Pressable>
        </Animated.View>
    )
}

export default ButtonOutline

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: '100%',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'blue',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})