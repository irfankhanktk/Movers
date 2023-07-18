// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LanguageScreen from 'screens/language-screen';
import LoginScreen from 'screens/login-screen';
import Notifications from 'screens/notifications';
import Signup from 'screens/signup';
import Splash from 'screens/splash';
import DrawerNavigation from './drawer-navigation/drawer-navigation';
import Onboarding from 'screens/on-boarding';
import LocationSetup from 'screens/location-setup';
import {horizontalAnimation} from '../utils';
import {TabBar} from './curvedtabs';
import Me from 'screens/me';
import Search from 'screens/search';
const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0, backgroundColor: colors.primary}} />
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={horizontalAnimation}>
        <Stack.Group>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Me" component={Me} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Group>
        {/* location group */}
        <Stack.Group>
          <Stack.Screen name="LocationSetup" component={LocationSetup} />
        </Stack.Group>
        <Stack.Screen name="Drawer" component={DrawerNavigation} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
