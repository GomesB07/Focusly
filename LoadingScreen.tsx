import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from './src/constants/colors';
import Logo from './assets/svg/Logo'
import {SafeAreaView} from 'react-native-safe-area-context';

export default function LoadingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <Logo color={colors.primary} style={styles.logo} />
      <ActivityIndicator color={colors.primary} size={25} style={styles.activity} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
  },
  logo: {
    marginTop: 60,
  },
  activity: {
    position: 'absolute',
    top: 0,
    bottom: 0
  }
});
