import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  BackHandler,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';

const LoggedInScreen = props => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}>
          Logged In!
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: colors.text,
            },
          ]}>
          {props.email}
        </Text>
        <Image
          source={require('../images/medical-logo-png-891.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}>
          MedStore
        </Text>
      </View>
      <View style={styles.footer}>
        <Animatable.View
          style={[
            styles.footer,
            {
              backgroundColor: '#ffff80',
            },
          ]}
          animation="fadeInUpBig">
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}>
            Kaise ho Bhosadi Wale !!
          </Text>
        </Animatable.View>
      </View>
    </View>
  );
};
export default LoggedInScreen;
const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffcc',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#ffffcc',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
