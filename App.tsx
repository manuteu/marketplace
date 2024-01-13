import Loading from '@components/Loading';
import { useFonts, Karla_300Light , Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';
import Home from '@screens/Home';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import { THEME } from './src/theme';
import SignIn from '@screens/SignIn';
import SignUp from '@screens/SignUp';
import { Routes } from '@routes/intex';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_300Light, Karla_400Regular, Karla_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor="transparent"
        translucent
      />
      {!fontsLoaded ? <Loading /> : <Routes />}
    </NativeBaseProvider>
  );
}