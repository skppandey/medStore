import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  BackHandler,
  ToastAndroid,
} from 'react-native';
// import firebase from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import LoggedInScreen from './LoggedInScreen';
import {AuthContext} from '../context';
import Users from '../Users';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const Home = ({navigation}) => {
  const [signUp, setSignUp] = useState(false);
  const [SignIn, setSignIn] = useState(false);
  const {colors} = useTheme();
  const {
    LoggedIn,
    iSignUp,
    reset,
    signIn,
    signOut,
    setEmail,
  } = React.useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  console.log(LoggedIn);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  });
  function handleBackButtonClick() {
    if (signUp || SignIn) {
      reset();
      setSignIn(false);
      setSignUp(false);
      return true;
    } else {
      return false;
    }
  }
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    if (user) {
      // console.log(user.email);
      signIn();
      setEmail(user.email);
    } else {
      signOut();
    }
  }
  // const storeData = async () => {
  //   try {
  //     await AsyncStorage.setItem('email', user.email);
  //   } catch (error) {
  //     // Error saving data
  //   }
  // };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (LoggedIn === true) {
    return <LoggedInScreen email={user.email} />;
  }

  if (SignIn == true && iSignUp == false) {
    return <SignInScreen />;
  }
  if (!signUp && !iSignUp) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <View style={styles.header}>
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
                backgroundColor: colors.background,
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
              Khoob khaayein aur Machaayein!
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSignIn(true);
              }}>
              <Text style={{color: '#01ab9d'}}>
                Have Account? Click to Sign In!
              </Text>
            </TouchableOpacity>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => setSignUp(true)}>
                <LinearGradient
                  colors={['#08d4c4', '#01ab9d']}
                  style={styles.signIn}>
                  <Text style={styles.textSign}>Get Started</Text>
                  <MaterialIcons name="navigate-next" color="#fff" size={20} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </View>
    );
  } else {
    return <SignUpScreen />;
  }
};

export default Home;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
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
