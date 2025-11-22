import { useEffect, useState } from "react";
import { Dimensions, LayoutChangeEvent, StyleSheet, Text, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { clamp, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";


const SwipeToConfirmButton = () => {
    const [knobWidth, setKnobWidth] = useState(0);
    const widthDimension = Math.round(Dimensions.get('window').width)
    const start = useSharedValue(0)
    const offsetKnob = useSharedValue(0)
    const scaleKnob = useSharedValue(0)

    const buttonWidth = useSharedValue(widthDimension * 0.60)
    const opacityBackground = useSharedValue(0)

    const border = 2
    const inner = widthDimension && widthDimension * 0.95 - (border * 2)
    const maxTranslateX = inner - knobWidth

    useEffect(() => {
        scaleKnob.value = withSpring(1, {stiffness: 1000})
        buttonWidth.value = withSpring(widthDimension * 0.95)
        setTimeout(() => {
            opacityBackground.value = withSpring(1)
        }, 200)
    }, [])

    const getWidth = (data: LayoutChangeEvent) => {
        setKnobWidth(Math.round(data.nativeEvent.layout.width))
    }

    const panGesture = Gesture.Pan()
    .onUpdate((e) => {
        offsetKnob.value = clamp(Math.round(start.value + e.translationX), 0, maxTranslateX)
    })
    .onEnd(() => {
        if(offsetKnob.value > (Math.round((widthDimension * 0.95) * 0.9) - knobWidth)) {
            start.value = offsetKnob.value
        } else {
            start.value = 0
            offsetKnob.value = withSpring(0)
        }
    })

    const animatedStyleContainer = useAnimatedStyle(() => ({
        width: buttonWidth.value
    }))

    const animatedStyleKnob = useAnimatedStyle(() => ({
        transform: [{translateX: offsetKnob.value}, {scale: scaleKnob.value}]
    }))

    const animatedStyleBackground = useAnimatedStyle(() => ({
        width: offsetKnob.value + 20,
        opacity: opacityBackground.value
    }))

    return (
        <Animated.View style={[styles.container, animatedStyleContainer]}>
            <GestureDetector gesture={panGesture}>
                <Animated.View style={[styles.knob, animatedStyleKnob]} onLayout={(data) => getWidth(data)}></Animated.View>
            </GestureDetector>
            <Animated.View style={[styles.backgroundKnob, animatedStyleBackground]} />
        </Animated.View>
    )

}

export default SwipeToConfirmButton


const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 8,
        height: 50,
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        left: 10,
    },
    knob: {
        width: 40,
        height: '100%',
        borderRadius: 6,
        backgroundColor: 'blue',
    },
    backgroundKnob: {
        position: 'absolute',
        borderRadius: 6,
        height: '100%',
        backgroundColor: 'green',
        zIndex: -1
    }
})