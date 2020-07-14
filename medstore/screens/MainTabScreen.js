import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Details from './Details';
import Documents from './Documents';
import Medicine from './Medicine';
import Settings from './Settings';
import SignUpScreen from './SignUpScreen';

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const DocumentStack = createStackNavigator();
const MedicineStack = createStackNavigator();
const SignUpStack = createStackNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    style={{backgroundColor: 'tomato'}}>
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Details"
      component={DetailStackScreen}
      options={{
        tabBarLabel: 'Details',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Documents"
      component={DocumentStackScreen}
      options={{
        tabBarLabel: 'Documents',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-document" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Medicine"
      component={MedicineStackScreen}
      options={{
        tabBarLabel: 'Medicine',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-medical" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsStackScreen}
      options={{
        tabBarLabel: 'Settings',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="ios-settings" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTitleColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Home',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);
const DetailStackScreen = ({navigation}) => (
  <DetailStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTitleColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <DetailStack.Screen
      name="Details"
      component={Details}
      options={{
        title: 'Details',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </DetailStack.Navigator>
);
const SettingsStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTitleColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Settings"
      component={Settings}
      options={{
        title: 'Settings',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);
const DocumentStackScreen = ({navigation}) => (
  <DocumentStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTitleColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <DocumentStack.Screen
      name="Documents"
      component={Documents}
      options={{
        title: 'Documents',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </DocumentStack.Navigator>
);
const MedicineStackScreen = ({navigation}) => (
  <MedicineStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTitleColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <MedicineStack.Screen
      name="Medicine"
      component={Medicine}
      options={{
        title: 'Medicine',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </MedicineStack.Navigator>
);
const SignUpStackScreen = ({navigation}) => (
  <SignUpStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTitleColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <SignUpStack.Screen
      name="SignUpScreen"
      component={SignUpScreen}
      options={{
        title: 'SignUpScreen',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
  </SignUpStack.Navigator>
);
