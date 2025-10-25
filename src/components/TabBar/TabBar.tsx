import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import { colors } from "../../constants/colors";
import * as Haptics from 'expo-haptics'

type Props = BottomTabBarProps;

export default function CustomTabBar({state, navigation, descriptors,}: Props) {

  const [positions, setPositions] = useState<Array<{x: number}>>([]);
  const positionX = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: positionX.value}]
  }))
  

  const getActive = (route: any, index: number) => {
    navigation.navigate(route.name)
    positionX.value = withTiming(positions[index]?.x, {duration: 300});
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  

  return (
    <View style={styles.container}>

      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];

        return (
          <View
            key={route.key}
            style={styles.containerButtons}

            onLayout={(e) => {
              const { x } = e.nativeEvent.layout;
              setPositions((prevPositions) => {
                const newPositions = [...prevPositions]
                newPositions[index] = {x}

                if(state.index === index) {
                  positionX.value = x
                }

                return newPositions
              }) 
            }}
          >
            <TouchableOpacity
              style={styles.buttonRoute}
              onPress={() => getActive(route, index)}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: state.index === index,
                  color: state.index === index ? colors.textPrimary : colors.textSecondary,
                  size: 40,
                })}
            </TouchableOpacity>
          </View>
        );
      })}

      <Animated.View style={[styles.square, animatedStyles]}></Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    alignSelf: "center",
  },
  containerButtons: {
    width: 60,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  buttonRoute: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  square: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.primary,
    position: "absolute",
    left: 0,
    zIndex: 1,
  },
});
