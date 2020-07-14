import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  ToastAndroid,
  Dimensions,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../context';
import OtherScreen from './OtherScreen';
import firestore from '@react-native-firebase/firestore';
import firebase from 'react-native-firebase';
import FormDetail from './FormDetail';
import Modal from 'react-native-modal';
import DisplayDetail from './DisplayDetail';

const Details = ({navigation}) => {
  const {LoggedIn, email, setUserName} = React.useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [docExists, setDocExists] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [documents, setDocument] = useState();
  console.log(email);

  useEffect(() => {
    getUser();
  });
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(email)
      .onSnapshot(doc => {
        // console.log(doc.data());
        setDocument(doc.data());
        if (doc.data() !== undefined) {
          if (doc.data().bg !== undefined) {
            setUsername(doc.data().username);
            setUserName(doc.data().username);
            setDocExists(true);
            setIsModalVisible(false);
          } else {
            setUsername(doc.data().username);
            setUserName(doc.data().username);
            setDocExists(false);
          }
        }
      });
  }, [email]);

  const getUser = async () => {
    const userDocument = await firestore()
      .collection('users')
      .doc(email)
      .get();
    // console.log(userDocument);
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  if (!LoggedIn) {
    // ToastAndroid.show('Please Login First...', ToastAndroid.SHORT);
    return <OtherScreen />;
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff9999',
      }}>
      <Text style={[styles.title]}>Apka Swagat hai</Text>
      <Image
        source={require('../images/medical-logo-png-891.png')}
        style={styles.logo}
        resizeMode="stretch"
      />
      <Text>Detail Screen Mein</Text>
      <Text style={[styles.title]}>{username}</Text>
      <Modal isVisible={isModalVisible}>
        <View>
          <FormDetail />
          <View>
            <Button title="Hide modal" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
      {docExists === false ? (
        <View style={styles.button}>
          <TouchableOpacity onPress={toggleModal}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Add Personal Info</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView>
          <Animatable.View
            style={[
              styles.footer,
              {
                backgroundColor: 'white',
              },
            ]}
            animation="fadeInUpBig">
            <Text style={[styles.title]}> Blood Group:{documents.bg} </Text>
          </Animatable.View>
          <Animatable.View
            style={[
              styles.footer,
              {
                backgroundColor: 'white',
              },
            ]}
            animation="fadeInUpBig">
            <Text style={[styles.title]}> DOB:{documents.dob} </Text>
          </Animatable.View>
          <Animatable.View
            style={[
              styles.footer,
              {
                backgroundColor: 'white',
              },
            ]}
            animation="fadeInUpBig">
            <Text style={[styles.title]}> Age:{documents.age} </Text>
          </Animatable.View>

          <Animatable.View
            style={[
              styles.footer,
              {
                backgroundColor: 'white',
              },
            ]}
            animation="fadeInUpBig">
            <Text style={[styles.title]}> Gender:{documents.gender} </Text>
          </Animatable.View>
          
          <Animatable.View
            style={[
              styles.footer,
              {
                backgroundColor: 'white',
              },
            ]}
            animation="fadeInUpBig">
            <Text style={[styles.title]}> Height:{documents.height} </Text>
          </Animatable.View>
          <Animatable.View
            style={[
              styles.footer,
              {
                backgroundColor: 'white',
              },
            ]}
            animation="fadeInUpBig">
            <Text style={[styles.title]}> Weight:{documents.weight} </Text>
          </Animatable.View>
        </ScrollView>
      )}
    </View>
  );
};

export default Details;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    margin: 5,
    paddingVertical: 10,
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
    textAlign: 'center',
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
  SquareShapeView: {
    width: 120,
    height: 120,
    backgroundColor: '#00BCD4',
  },

  RectangleShapeView: {
    marginTop: 20,
    width: 120 * 2,
    height: 120,
    backgroundColor: '#FFC107',
  },
});
