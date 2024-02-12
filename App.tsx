import Loading from '@components/Loading';
import { useFonts, Karla_300Light , Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { THEME } from './src/theme';
import { Routes } from '@routes/intex';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_300Light, Karla_400Regular, Karla_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor="#EDECEE"
        translucent
      />
      {!fontsLoaded ? <Loading /> : <Routes />}
    </NativeBaseProvider>
  );
}