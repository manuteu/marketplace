import Loading from '@components/Loading';
import { useFonts, Karla_300Light, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { THEME } from './src/theme';
import { Routes } from '@routes/index';
import { LogBox } from "react-native"
import { AuthContextProvider } from '@contexts/AuthContext';
LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',])

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_300Light, Karla_400Regular, Karla_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor="#EDECEE"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}