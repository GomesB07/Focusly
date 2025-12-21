import { FontAwesome } from "@expo/vector-icons";
import { use, useState } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet } from "react-native"
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";

type ButtonOutlineProps = {
    onPress: () => void;
    width: SharedValue<number>;
    color: string;
    iconName: React.ComponentProps<typeof FontAwesome>['name']
    opacity?: SharedValue<number>;
    translateXEdit?: SharedValue<number>;
    buttonDelete?: boolean;
    widthDimension: number;
    translateIcon?: SharedValue<number>;
    buttonInner?:  React.Dispatch<React.SetStateAction<number>>;
}


const ButtonOutline = ({onPress, color, iconName, width, opacity, translateXEdit, buttonDelete, widthDimension, translateIcon, buttonInner}: ButtonOutlineProps) => {

    const [widthButton, setWidthButton] = useState(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX: translateXEdit?.value ?? 0},
        ],
        opacity: opacity?.value,
        width: width?.value
    }))

    const animatedIcon = useAnimatedStyle(() => ({
        transform: [{translateX: translateIcon?.value ?? 0}]
    }))

    const getWidthButton = (data: LayoutChangeEvent) => {
        setWidthButton(Math.round(data.nativeEvent.layout.width))
        buttonInner && buttonInner(Math.round(data.nativeEvent.layout.width))
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
                <Animated.View style={animatedIcon}>
                    <FontAwesome name={iconName} size={25} color={color} />
                </Animated.View>
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