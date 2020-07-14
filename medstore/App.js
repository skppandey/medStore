/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Home from './screens/Home';
import Details from './screens/Details';
import Documents from './screens/Documents';
import Medicine from './screens/Medicine';
import MainTabScreen from './screens/MainTabScreen';
import DrawerContent from './screens/DrawerContent';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import {AuthContext} from './context';
import auth from '@react-native-firebase/auth';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const initialLoginState = {
  isLoading: true,
  userName: null,
  userToken: null,
};

const App = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [signIn, setSignIn] = React.useState(false);
  const [isSignUp, setSignUp] = React.useState(false);
  const [reset, setReset] = React.useState(false);
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();
  const [userName, setUsername] = React.useState();
  const [authEmail, setEmail] = React.useState();
  const [product, setProduct] = React.useState();

  const authContext = React.useMemo(() => ({
    email: authEmail,
    LoggedIn: isLoggedIn,
    iSignUp: isSignUp,
    username: userName,
    setEmail: email => {
      setEmail(email);
    },
    setUserName: username => {
      setUsername(username);
    },
    signIn: () => {
      setUserToken('fgk');
      setLoading(false);
      setLoggedIn(true);
      setSignUp(false);
    },
    signOut: () => {
      setUserToken(null);
      setLoading(false);
      setLoggedIn(false);
    },
    signUp: () => {
      setUserToken('fgk');
      setLoading(false);
      setSignUp(true);
    },
    reset: () => {
      setSignUp(false);
      setUserToken(null);
      setLoggedIn(false);
      setEmail();
    },
  }));

  if (user) {
    // console.log(user);
    setLoggedIn(true);
    setSignUp(false);
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
          {/* <Drawer.Screen name="Details" component={DetailStackScreen} /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
