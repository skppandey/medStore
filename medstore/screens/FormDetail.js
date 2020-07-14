import React, {useState} from 'react';
import {Text, Button, View, TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context';

const FormDetail = () => {
  const [bg, setBG] = useState();
  const [country, setCountry] = useState();
  const [age, setAge] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const {email} = React.useContext(AuthContext);

  const SaveDetails = () => {
    firestore()
      .collection('users')
      .doc(email)
      .update({
        bg: bg,
        country: country,
        age: age,
        height: height,
        weight: weight,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <Text> Personal Info </Text>
      <View>
        <TextInput
          placeholder="Enter Blood Group"
          onChangeText={val => setBG(val)}
        />
        <TextInput
          placeholder="Enter Country"
          onChangeText={val => setCountry(val)}
        />
        <TextInput placeholder="Enter Age" onChangeText={val => setAge(val)} />
        <TextInput
          placeholder="Enter Height"
          onChangeText={val => setHeight(val)}
        />
        <TextInput
          placeholder="Enter Weight"
          onChangeText={val => setWeight(val)}
        />
        <Button title="Save details" onPress={SaveDetails} />
      </View>
    </View>
  );
};

export default FormDetail;
