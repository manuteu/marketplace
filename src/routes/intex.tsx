import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import AuthRoutes from './auth.routes';
import { Box, useTheme } from 'native-base';
import { AppRoutes } from './app.routes';
// import { useAuth } from '@hooks/useAuth';
import { useEffect } from 'react';
import Loading from '@components/Loading';

export function Routes() {
  const { colors } = useTheme()
  // const { user, isLoadingUserStorageData } = useAuth()

  const theme = DefaultTheme;
  theme.colors.background = colors.white

  // if (isLoadingUserStorageData) {
  //   return <Loading />
  // }

  return (
    <Box flex={1} bg='gray.200'>
      <NavigationContainer theme={theme}>
        {false ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}