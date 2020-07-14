import React, {useState} from 'react';
import {
  Text,
  Button,
  View,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const DisplayDetail = documents => {
  console.log(documents.username);
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.title}>
        <Text> {documents.username} </Text>
      </View>
    </View>
  );
};

export default DisplayDetail;

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
});
