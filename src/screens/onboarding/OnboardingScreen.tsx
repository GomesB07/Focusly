import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../routes/auth.routes";
import Logo from '../../../assets/svg/Logo'
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OnboardingScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const slides = [
    {
      key: "one",
      title: "Bem-vindo(a) ao Focusly",
      text: "Seu app de organização pessoal",
    },
    {
      key: "two",
      title: "Gerenciamento",
      text: "Gerencie seus dias de forma rápida e prática",
      subtext: "com tarefas e hábitos",
      image: require("../../../assets/Lottie/HomeLottie.json"),
    },
    {
      key: "three",
      title: "Categorias",
      text: "Crie categorias para separar suas tarefas",
      subtext: "de forma organizada",
      image: require("../../../assets/CategoriesScreen/CategoriesScreen.png"),
    },
    {
      key: "four",
      title: "Concluir tarefas",
      text: "Conclua seus objetivos de forma fácil",
      image: require("../../../assets/CompletedTaskScreen/CompletedTaskScreen.png"),
    },
    {
      key: "five",
      title: "Métricas",
      text: "Acompanhe seu crescimento pessoal",
      subtext: "com métricas precisas",
      image: require("../../../assets/ProgressScreen/ProgressScreen.png"),
    },
    {
      key: "six",
      title: "Pomodoro",
      text: "Realize seu dia de forma saudável",
      subtext: "utilizando nosso timer",
      image: require("../../../assets/PomodoroScreen/PomodoroScreen.png"),
    },
    {
      key: "seven",
      title: "Começar minha jornada de produtividade",
    },
  ];

  const renderItem = ({ item }: { item: any }) => {
    if (currentSlideIndex === 0 || currentSlideIndex === 6) {
      return (
        <SafeAreaView style={styles.container}>
          <Logo style={{marginTop: 50}} />
          <View style={styles.containerInformation}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <LottieView 
            source={require('../../../assets/Lottie/HomeLottie.json')}
            autoPlay
            style={{ width: "100%", height: "60%" }} 
          />
          <View style={styles.containerInformation}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
            <Text style={styles.subtext}>{item.subtext}</Text>
          </View>
        </SafeAreaView>
      );
    }
  };

  const renderNextButton = () => {
    if (currentSlideIndex === 0) {
      return (
        <View style={styles.buttonFirstSlide}>
          <Text style={styles.textButtonFirstSlide}>Começar</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.renderNextButton}>
          <Feather name="chevron-right" size={24} color={colors.textPrimary} />
        </View>
      );
    }
  };

  const renderPrevButton = () => {
    return (
      <View style={styles.renderPrevButton}>
        <Feather name="chevron-left" size={24} color={colors.textPrimary} />
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.renderPrevButton}>
        <Feather name="check" size={24} color={colors.textPrimary} />
      </View>
    );
  }

  const onDone = () => {
    navigation.navigate("Login");
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onSlideChange={(index) => setCurrentSlideIndex(index)}
      showPrevButton
      onDone={onDone}
      renderNextButton={renderNextButton}
      renderPrevButton={renderPrevButton }
    renderDoneButton={renderDoneButton}
      bottomButton={currentSlideIndex === 0}
      dotStyle={
        currentSlideIndex === 0 ? { width: 0, height: 0 } : styles.dotStyle
      }
      activeDotStyle={
        currentSlideIndex === 0
          ? { width: 0, height: 0 }
          : styles.dotStyleActive
      }
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  image: {
    // resizeMode: "contain",
  },
  containerInformation: {
    backgroundColor: colors.secondary,
    width: "100%",
    height: "40%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 25,
    color: colors.textPrimary,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    color: colors.textPrimary,
    textAlign: "center",
  },
  subtext: {
    fontSize: 15,
    color: colors.textPrimary,
    textAlign: "center",
  },
  buttonFirstSlide: {
    width: "90%",
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  textButtonFirstSlide: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "bold",
  },
  dotStyle: {
    width: 10,
    height: 10,
    backgroundColor: colors.textPrimary,
  },
  dotStyleActive: {
    backgroundColor: colors.primary,
    width: 30,
  },
  renderNextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginTop: -5,
  },
  renderPrevButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: -5,
  },
});
