import React, {useState} from 'react';
import {Text, StyleSheet,TouchableOpacity} from 'react-native';
import {Card, Button} from 'react-native-elements';
// import {withNavigation} from 'react-navigation';

const Product = ({navigation, props, onClick}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <Card
        image={{
          uri: props.img,
        }}>
        <Text style={{marginBottom: 10, marginTop: 20}} h2>
          {props.name}
        </Text>
        <Text style={styles.price} h4>
          {props.price}
        </Text>
        <Text h6 style={styles.description}>
          added 2h ago
        </Text>
        <Button
          type="clear"
          title="Buy now"
          // onPress={() => navigation.popToTop()}
        />
      </Card>
    </TouchableOpacity>
  );
};
export default Product;

const styles = StyleSheet.create({
  name: {
    color: '#5a647d',
    fontWeight: 'bold',
    fontSize: 30,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 10,
    color: '#c1c4cd',
  },
});
