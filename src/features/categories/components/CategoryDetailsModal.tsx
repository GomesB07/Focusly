import { CategoryType } from "../hooks/useCategory";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../constants/colors";
import SkeletonModal from "../../../components/Modal/SkeletonModal";
import { FontAwesome } from "@expo/vector-icons";
import ButtonOutline from "./ButtonOutline";
import { useEffect, useState } from "react";
import Animated, { useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import SwipeToConfirmButton from "./SwipeToConfirmButton";
import { scheduleOnRN } from "react-native-worklets";
import AnimateableText from "react-native-animateable-text";

type CategoryDetailModalProps = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    category: CategoryType | undefined
}

const CategoryDetailsModal = ({visible, setVisible, category}: CategoryDetailModalProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const percentageCompleted = useSharedValue(0)
    const widthDimension = Math.round(Dimensions.get('window').width);
    const [buttonInner, setButtonInner] = useState(0)

    const containerProgressWidth = useSharedValue(0)
    const barProgressWidth = useSharedValue(0)

    const widthDelete = useSharedValue(widthDimension * 0.45)
    const translateXDelete = useSharedValue(0)
    const translateXIconDelete = useSharedValue(0)

    const widthEdit = useSharedValue(widthDimension * 0.45)
    const opacityEdit = useSharedValue(1)
    const translateXEdit = useSharedValue(0)

    const translateYCancelDelete = useSharedValue(0)
    const opacityCancelDelete = useSharedValue(0)
    const translateYAskConfirmDelete = useSharedValue(0)
    const opacityAskConfirmDelete = useSharedValue(0)

    const progressNumber = useSharedValue(0)

    useEffect(() => {
        if(!visible) {
            setIsDeleting(false);

            widthDelete.value = widthDimension * 0.45
            translateXDelete.value = 0
            translateXIconDelete.value = 0

            widthEdit.value = widthDimension * 0.45
            translateXEdit.value = 0
            opacityEdit.value = 1

            translateYCancelDelete.value = 0
            opacityCancelDelete.value = 0
            translateYAskConfirmDelete.value = 0
            opacityAskConfirmDelete.value = 0

            barProgressWidth.value = 0
            percentageCompleted.value = withTiming(75, {duration: 200})
            progressNumber.value = withTiming(75)
            
        }

    }, [visible])

    const toggleIsDeletingToTrue = () => {
        setIsDeleting(true)
    }

    const onDelete = () => {

        widthDelete.value = withTiming(widthDimension * 0.60)
        translateXDelete.value = withTiming((widthDimension * 0.40) / 2 - 10, {}, (finished) => {
            'worklet'
            if(finished) {
                scheduleOnRN(toggleIsDeletingToTrue)
            }
        })
        translateXIconDelete.value = withTiming(buttonInner && (buttonInner * 1.20 / 2) - 15)

        widthEdit.value = withSpring(0)
        opacityEdit.value = withSpring(0)
        translateXEdit.value = withSpring(translateXEdit.value + 100)

        translateYCancelDelete.value = withSpring(50, {duration: 300})
        opacityCancelDelete.value = withSpring(1)

        translateYAskConfirmDelete.value = withSpring(-50, {duration: 300})
        opacityAskConfirmDelete.value = withSpring(1)
        
        barProgressWidth.value = withTiming(0.75 * containerProgressWidth.value, {duration: 500})
    }

    const onCancelDelete = () => {
        setIsDeleting(false)
        widthDelete.value = withSpring(widthDimension * 0.45)
        translateXIconDelete.value = withSpring(0)

        widthEdit.value = withSpring(widthDimension * 0.45)
        opacityEdit.value = withSpring(1)
        translateXEdit.value = withSpring(0)
        translateXDelete.value = withSpring(0)


        translateYCancelDelete.value = withSpring(0)
        opacityCancelDelete.value = withSpring(0, {duration: 100})

        translateYAskConfirmDelete.value = withSpring(0)
        opacityAskConfirmDelete.value = withSpring(0, {duration: 100})
    }

    const barProgressAnimatedStyle = useAnimatedStyle(() => ({
        width: barProgressWidth.value
    }))

    const askConfirmDeleteAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{translateY: translateYAskConfirmDelete.value}],
        opacity: opacityAskConfirmDelete.value
    }))

    const buttonCancelConfirmDeleteAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{translateY: translateYCancelDelete.value}],
        opacity: opacityCancelDelete.value
    }))

    const derivedAnimatedNumbersProgress = useDerivedValue(() => {
        return progressNumber.value
    })

    const animatedNumbersProgress = useAnimatedProps(() => ({
        text: derivedAnimatedNumbersProgress.value
    }))

    

    

    const contentModal = (
        <View style={styles.container}>
            <View style={[styles.nameAndIconView, {backgroundColor: category?.color}]}>
                <Text style={{fontSize: 40}}>{category?.icon}</Text>
                <Text style={styles.name}>{category?.name}</Text>
            </View>


            <View style={styles.viewDetailProgress}>
                <Text style={{fontSize: 25,  fontWeight: 500}}>Progresso</Text>

                <View style={styles.viewProgress}>

                    <View 
                        style={styles.containerBarProgress}
                        onLayout={(data) => containerProgressWidth.value = Math.round(data.nativeEvent.layout.width)}
                    >
                        <Animated.View style={[styles.barProgress, {backgroundColor: category?.color}, barProgressAnimatedStyle]} />
                    </View>
                    <AnimateableText 
                        style={{color: '#000', fontWeight: 500, fontSize: 15}} 
                        animatedProps={animatedNumbersProgress}
                    ></AnimateableText>

                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                    <Text>5 de 10 Tarefas concluídas</Text>
                    <FontAwesome name='check' size={20} color='green' />
                </View>
                <Text style={{fontSize: 12, color: 'grey', marginTop: -5}}>Última tarefa atribuída em 25/07/2025</Text>        
            </View>
        


            <View style={styles.containerAskAndButtons}>

                <Animated.View style={[styles.containerAskConfirmDelete, askConfirmDeleteAnimatedStyle]}>
                    <TouchableOpacity onPress={() => onCancelDelete()}>
                        <Text style={{fontSize: 16}}>Deseja deletar essa categoria?</Text>
                    </TouchableOpacity>
                </Animated.View>

                <View style={styles.viewButtons}>
                    
                        { !isDeleting ? (
                            <ButtonOutline 
                                iconName={'trash'} 
                                width={widthDelete}
                                color={isDeleting ? 'green' : 'red'} 
                                onPress={() => onDelete()} 
                                buttonDelete
                                widthDimension={widthDimension}
                                translateXEdit={translateXDelete}
                                translateIcon={translateXIconDelete}
                                buttonInner={setButtonInner}
                            />
                        ) : (
                            <SwipeToConfirmButton />
                        )}

                        {/* <ButtonOutline 
                            iconName={'trash'} 
                            width={widthDelete}
                            color={isDeleting ? 'green' : 'red'} 
                            onPress={() => onDelete()} 
                            buttonDelete
                            widthDimension={widthDimension}
                            translateXEdit={translateXDelete}
                            translateIcon={translateXIconDelete}
                        /> */}

                        <ButtonOutline 
                            iconName={'edit'} 
                            width={widthEdit}
                            onPress={() => onCancelDelete()} 
                            color={'blue'}
                            opacity={opacityEdit}
                            translateXEdit={translateXEdit}
                            widthDimension={widthDimension}
                        />  
                </View>

                

                <Animated.View style={[styles.containerCancelDelete, buttonCancelConfirmDeleteAnimatedStyle]}>
                    <TouchableOpacity onPress={() => onCancelDelete()}>
                        <Text style={{fontSize: 16, color: 'red'}}>Cancelar</Text>
                    </TouchableOpacity>
                </Animated.View>

            </View>

            

        </View>
    )

    return (
        <SkeletonModal 
            visible={visible} 
            setVisible={setVisible}
            categoryDetail={category?.color}
            content={contentModal}
            customHeight={{modalFullOpen: false}}
            customStyle={{buttonClose: category?.color}}
        />
    )
}

export default CategoryDetailsModal


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    nameAndIconView: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 30
    },
    name: {
        fontSize: 30,
        color: colors.textPrimary,
        fontWeight: 600,
    },
    viewDetailProgress: {
        marginTop: 15,
        width: '100%',
        alignItems: 'center',
        gap: 10,
    },
    viewProgress: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    containerBarProgress: {
        width: '80%',
        height: 15,
        backgroundColor: '#b8b8b8',
        borderRadius: 20,
    },
    barProgress: {
        height: 15,
        backgroundColor: 'red',
        borderRadius: 20,
    },
    containerAskAndButtons: {
        width: '100%',
        height: 70,
        marginTop: 80,
    },
    containerAskConfirmDelete: {
        width: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    viewButtons: {
        width: '100%',
        height: 50,
    },
    containerCancelDelete: {
        width: '100%',
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
})