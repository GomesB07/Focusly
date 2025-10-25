import { Dimensions, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { scheduleOnRN } from "react-native-worklets";
import { useEffect, useState } from "react";


type NewModalProps = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    content: React.JSX.Element
}

const NewModal = ({visible, setVisible, content}: NewModalProps) => {
    const [visibleModal, setVisibleModal] = useState(false)
    const {height: screenHeight} = Dimensions.get('window')
    const insets = useSafeAreaInsets()
    const positionY = useSharedValue(screenHeight)
    const modalFullOpen = insets.top
    const modalMiddle = screenHeight / 2
    const modalClosed = screenHeight

    useEffect(() => {
        if(!visible) {
            positionY.value = withSpring(modalClosed, {duration: 300}, (finished) => {
                if(finished) {
                    scheduleOnRN(setVisibleModal, false)
                }
            })
        } else {
            setVisibleModal(true)
        }
    }, [visible])

    const openModal = () => {
        'worklet'
        positionY.value = withTiming(modalMiddle, {duration: 400})
    }

    const panGesture = Gesture.Pan()
    .onChange((e) => {
        positionY.value = Math.max(modalFullOpen, positionY.value + e.changeY)
    })
    .onEnd(() => {
        if(positionY.value < screenHeight * 0.35) {
            positionY.value = withSpring(modalFullOpen, {duration: 300})
        } else if(positionY.value < screenHeight * 0.7) {
            positionY.value = withSpring(modalMiddle, {duration: 300})
        } else {
            positionY.value = withSpring(modalClosed, {duration: 300}, (finished) => {
                if(finished) {
                    scheduleOnRN(setVisible, false)
                    scheduleOnRN(setVisibleModal, false)
                }
            })
            
        }
    })
    

    const animationStyle = useAnimatedStyle(() => ({
        transform: [{translateY: positionY.value}]
    }))

    return (
            
        visibleModal && (
            <Pressable style={styles.containerBackground} onPress={() => setVisible(false)}>
                <GestureDetector gesture={panGesture}>
                    <Animated.View onLayout={openModal} style={[styles.container, animationStyle]}>
                        <View style={styles.buttonClose}></View>
                        <View 
                            style={styles.scrollView}>
                            {content}
                        </View>
                    </Animated.View>
                </GestureDetector>
            </Pressable>

        )
            
        
    )
}

export default NewModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.textPrimary,
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        borderRadius: 20,
        paddingTop: 10,
        zIndex: 2,
    },
    buttonClose: {
        width: '20%',
        height: 5,
        borderRadius: 2,
        backgroundColor: colors.primary,
    },
    scrollView: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: 20
    },
    containerBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    }
})