import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/storage';
import RNFetchBlob from 'react-native-fetch-blob';

import {
  Avatar,
  Title,
  useTheme,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import {AuthContext} from '../context';
import {utils} from '@react-native-firebase/app';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Platform} from 'react-native';
import {v4 as uuidv4} from 'uuid';

export default function DrawerContent(props) {
  const paperTheme = useTheme();
  const [isDarkTheme, setDarkTheme] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const {signOut, email, username, reset} = React.useContext(AuthContext);
  const [name, setName] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const toggleTheme = () => {
    setDarkTheme(!isDarkTheme);
  };
  // const mime = 'image/jpeg';
  const uploadImage = base64 => {
    firebase
      .storage()
      .ref('images')
      .child(email)
      .putString(base64, 'base64', {
        contentType: 'image/jpeg',
      })
      .catch(error => {
        console.log('Error uploading image: ', error);
      });
  };
  const pickImageHandler = () => {
    if (email) {
      ImagePicker.showImagePicker(response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('image error');
        } else {
          const base64 = response.data;
          uploadImage(base64);
        }
      });
    }
  };

  const SignOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  useEffect(() => {
    handleImageChange();
  });
  const handleImageChange = async () => {
    if (email) {
      const url = await storage()
        .ref('images/' + email)
        .getDownloadURL();
      setSelectedImage(url);
    }
  };
  useEffect(() => {
    getUser();
  });
  const getUser = async () => {
    if (email) {
      const userDocument = await firestore()
        .collection('users')
        .doc(email)
        .get();
      console.log(userDocument._data.username);
      setName(userDocument._data.username);
      setWeight(userDocument._data.weight);
      setHeight(userDocument._data.height);
    }
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <TouchableOpacity onPress={pickImageHandler}>
                <Avatar.Image
                  // source={require('../images/medical-logo-png-891.png')}
                  source={{uri: selectedImage}}
                  size={50}
                />
              </TouchableOpacity>
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{name}</Title>
                <Caption style={styles.caption}>{email}</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Caption style={styles.caption}>Weight:</Caption>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {weight}Kg
                </Paragraph>
              </View>
              <View style={styles.section}>
                <Caption style={styles.caption}>Height:</Caption>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {height}cm
                </Paragraph>
              </View>
            </View>

            <Drawer.Section style={styles.bottomDrawerSection}>
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="home-outline" color={color} size={size} />
                )}
                label="Home"
                onPress={() => {
                  props.navigation.navigate('Home');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="account-outline" color={color} size={size} />
                )}
                label="Details"
                onPress={() => {
                  props.navigation.navigate('Details');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="bookmark-outline" color={color} size={size} />
                )}
                label="Documents"
                onPress={() => {
                  props.navigation.navigate('Documents');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="medical-bag" color={color} size={size} />
                )}
                label="Medicine"
                onPress={() => {
                  props.navigation.navigate('Medicine');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="settings-outline" color={color} size={size} />
                )}
                label="Settings"
                onPress={() => {
                  props.navigation.navigate('Settings');
                }}
              />
            </Drawer.Section>
            <Drawer.Section title="Preferences">
              <TouchableRipple
                onPress={() => {
                  toggleTheme();
                }}>
                <View style={styles.preference}>
                  <Text>Dark Theme</Text>
                  <View pointerEvents="none">
                    <Switch value={isDarkTheme} />
                  </View>
                </View>
              </TouchableRipple>
            </Drawer.Section>
          </View>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        {email ? (
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="exit-to-app" color={color} size={size} />
            )}
            label="Sign Out"
            onPress={() => {
              signOut();
              SignOut();
              reset();
              // removeItem();
              // props.navigation.closeDrawer();
              props.navigation.navigate('Home');
            }}
          />
        ) : (
          <Text>signed out</Text>
        )}
      </Drawer.Section>
    </View>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
