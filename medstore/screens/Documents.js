import React, {useState} from 'react';
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
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {AuthContext} from '../context';
import OtherScreen from './OtherScreen';

const Documents = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState();
  const {LoggedIn} = React.useContext(AuthContext);
  if (!LoggedIn) {
    // ToastAndroid.show('Please Login First...', ToastAndroid.SHORT);
    return <OtherScreen />;
  }
  const pickImageHandler = () => {
    ImagePicker.showImagePicker(
      {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('image error');
        } else {
          console.log('image', response.uri);
          setSelectedImage({uri: response.uri});
        }
      },
    );
  };
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
      <Text>Document Screen Mein</Text>
      <ScrollView>
        <View style={{width: 300, height: 300}}>
          <Image source={selectedImage} style={styles.prevImage} />
        </View>
        <Button title="pick image" onPress={pickImageHandler} />
      </ScrollView>
    </View>
  );
};

export default Documents;

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
  prevImage: {
    width: '100%',
    height: '100%',
  },
});
