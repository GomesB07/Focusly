import { registerRootComponent } from 'expo';

import Routes from './src/routes/routes';
import { LogBox } from 'react-native';


LogBox.ignoreLogs(["shared value's .value"])
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Routes);
