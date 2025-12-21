import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { clamp, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import {LinearGradient} from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics'
import { scheduleOnRN } from "react-native-worklets";


const SwipeToConfirmButton = () => {
    const widthDimension = Math.round(Dimensions.get('window').width)
    const start = useSharedValue(0)
    const offsetKnob = useSharedValue(0)
    const scaleKnob = useSharedValue(0)
    const isCompleted = useSharedValue(false)
    const border = 2
    const inner = (widthDimension * 0.95 - (border * 2))
    const translateXDeleteConfirm = useSharedValue(widthDimension * 0.2)

    const knobWidth = 40

    const buttonWidth = useSharedValue(widthDimension * 0.60)
    const opacityBackground = useSharedValue(0)
    const maxTranslateX = inner - knobWidth

    useEffect(() => {
        scaleKnob.value = withSpring(1, {stiffness: 1000})
        // buttonWidth.value = withSpring(widthDimension * 0.60)
        translateXDeleteConfirm.value = withSpring(widthDimension * 0.2)
        setTimeout(() => {
            opacityBackground.value = withSpring(1)
        }, 200)
    }, [])

    const hapticsButton = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }

    const panGesture = Gesture.Pan()
    .onUpdate((e) => {
        if(isCompleted.value) return;
        offsetKnob.value = clamp(Math.round(start.value + e.translationX), 0, maxTranslateX)
        if(start.value + e.translationX > inner - knobWidth) {
            scheduleOnRN(hapticsButton)
            isCompleted.value = true
        }
    })
    .onEnd(() => {
        start.value = 0
        offsetKnob.value = withSpring(0)
    })

    const animatedStyleContainer = useAnimatedStyle(() => ({
        width: buttonWidth.value,
        transform: [{translateX: translateXDeleteConfirm.value}]
    }))

    const animatedStyleKnob = useAnimatedStyle(() => ({
        transform: [{translateX: offsetKnob.value}, {scale: scaleKnob.value}]
    }))

    const animatedStyleBackground = useAnimatedStyle(() => {
        
        const progress = offsetKnob.value / maxTranslateX

        const translateXFill = -(inner * (1 - progress)) / 2

        return {
            transform: [
                {translateX: translateXFill},
                {scaleX: progress},
            ],
            opacity: opacityBackground.value,
        }
    })


    return (
        <Animated.View style={[styles.container, animatedStyleContainer]}>
            <>
                <LinearGradient
                    colors={['#fff', 'rgba(125, 252, 13, 0.1)', 'rgba(125, 252, 13, 0.2)', 'rgba(125, 252, 13, 0.5)']}
                    start={{x: 0, y: 0}}
                    end={{x: 5, y: 1}}
                    style={{width: '100%', height: '100%', position: 'absolute', borderRadius: 6, zIndex: -2}}
                />
                <GestureDetector gesture={panGesture}>
                    <Animated.View style={[styles.knob, animatedStyleKnob]}></Animated.View>
                </GestureDetector>
                <Animated.View style={[styles.backgroundKnob, {width: inner}, animatedStyleBackground]} />
                <FontAwesome name="trash" size={25} color='rgba(59, 126, 0, 0.5)' style={styles.iconTrash} />
            </>
        </Animated.View>
    )

}

export default SwipeToConfirmButton


const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'rgba(59, 126, 0, 0.5)',
        borderRadius: 8,
        height: 50,
        display: 'flex',
        position: 'absolute',
        overflow: 'hidden',
        justifyContent: 'center'
    },
    knob: {
        width: 40,
        height: '100%',
        borderRadius: 6,
        backgroundColor: '#707070',
        zIndex: 2
    },
    backgroundKnob: {
        position: 'absolute',
        height: '100%',
        zIndex: -1,
        backgroundColor: 'rgba(59, 126, 0, 0.5)',
    },
    iconTrash: {
        position: 'absolute',
        right: 15
    }
})