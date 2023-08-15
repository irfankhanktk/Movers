// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AboutUsScreen from 'screens/about-us';
import AdviceFromUsScreen from 'screens/advice-from-us';
import BlogScreen from 'screens/blog';
import ContactUsScreen from 'screens/contact-us';
import DriveWithUsScreen from 'screens/drive-with-us';
import DriverLoginScreen from 'screens/driver-login';
import DriverSignup from 'screens/driver-signup';
import LanguageScreen from 'screens/language-screen';
import LocationSetup from 'screens/location-setup';
import LoginScreen from 'screens/login-screen';
import Me from 'screens/me';
import Notifications from 'screens/notifications';
import Onboarding from 'screens/on-boarding';
import OurServicesScreen from 'screens/our-services';
import Search from 'screens/search';
import Signup from 'screens/signup';
import Splash from 'screens/splash';
import WhereToMoveScreen from 'screens/where-to-move';
import {horizontalAnimation} from '../utils';
import DrawerNavigation from './drawer-navigation/drawer-navigation';
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
          <Stack.Screen
            name="OurServicesScreen"
            component={OurServicesScreen}
          />
          <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
          <Stack.Screen name="BlogScreen" component={BlogScreen} />
          <Stack.Screen
            name="DriveWithUsScreen"
            component={DriveWithUsScreen}
          />
          <Stack.Screen
            name="AdviceFromUsScreen"
            component={AdviceFromUsScreen}
          />
          <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
          <Stack.Screen
            name="DriverLoginScreen"
            component={DriverLoginScreen}
          />
          <Stack.Screen
            name="WhereToMoveScreen"
            component={WhereToMoveScreen}
          />
        </Stack.Group>
        {/* location group */}
        <Stack.Group>
          <Stack.Screen name="LocationSetup" component={LocationSetup} />
        </Stack.Group>
        <Stack.Screen name="Drawer" component={DrawerNavigation} />
        <Stack.Screen name="DriverSignup" component={DriverSignup} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
