import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import BusinessHomeScreen from './src/screens/BusinessHomeScreen';
import SearchResultScreen from './src/screens/SearchResultScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SplashScreen from './src/screens/SplashScreen';
import GameScreen from './src/screens/GameScreen';
import GameGalleryScreen from './src/screens/GameGalleryScreen';
import QRCodeScannerPage from './src/screens/QRCodeScannerPage';

export type RootStackParamList = {
  Login: undefined;
  Home: {username: string};
  BusinessHome: undefined;
  Splash: undefined;
  QRCodeScannerPage: undefined;
  SearchResult: undefined;
  SignUp: undefined;
  Game: undefined;
  GameGallery: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BusinessHome">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BusinessHome"
          component={BusinessHomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QRCodeScannerPage"
          component={QRCodeScannerPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchResult"
          component={SearchResultScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GameGallery"
          component={GameGalleryScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
