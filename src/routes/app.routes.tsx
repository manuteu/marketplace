import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import Home from '@screens/Home'
import HomeSvg from '@assets/home.svg'
import PosterSvg from '@assets/poster.svg'
import SignOutSvg from '@assets/signout.svg'
import { useTheme } from 'native-base'
import { Platform } from 'react-native'
import MyPosters from '@screens/MyPosters'
import SignOut from '@screens/SignOut'

type AppRoutes = {
  home: undefined;
  posters: undefined;
  signout: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { sizes, colors } = useTheme()
  const iconSize = sizes[6]
  const tabBarActiveTintColor = colors.gray[600]
  const tabBarInactiveTintColor = colors.gray[400]

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor,
      tabBarInactiveTintColor,
      tabBarStyle: {
        backgroundColor: colors.gray[100],
        borderTopWidth: 0,
        height: 72,
        paddingBottom: sizes[10],
        paddingTop: sizes[6]
      },
      tabBarItemStyle: {
        paddingHorizontal: sizes[10],
        paddingBottom: sizes[6],
        paddingTop: sizes[2]
      },
      tabBarHideOnKeyboard: true
    }} >
      <Screen
        name='home'
        component={Home}
        options={{ tabBarIcon: ({ color }) => <HomeSvg fill={color} width={iconSize} height={iconSize} /> }}
      />
      <Screen
        name='posters'
        component={MyPosters}
        options={{ tabBarIcon: ({ color }) => <PosterSvg fill={color} width={iconSize} height={iconSize} /> }}
      />
      <Screen
        name='signout'
        component={SignOut}
        options={{ tabBarIcon: ({ color }) => <SignOutSvg fill={color} width={iconSize} height={iconSize} /> }}
      />
    </Navigator>
  )
}