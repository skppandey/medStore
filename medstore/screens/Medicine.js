import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  BackHandler,
  Image,
} from 'react-native';
import Product from './Product';

const BASE_URL =
  'https://raw.githubusercontent.com/sdras/sample-vue-shop/master/dist';

const products = [
  {
    name: 'Khaki Suede Polish Work Boots',
    price: 149.99,
    img: `${BASE_URL}/shoe1.png`,
  },
  {
    name: 'Camo Fang Backpack Jungle',
    price: 39.99,
    img: `${BASE_URL}/jacket1.png`,
  },
  {
    name: 'Parka and Quilted Liner Jacket',
    price: 49.99,
    img: `${BASE_URL}/jacket2.png`,
  },
  {
    name: 'Cotton Black Cap',
    price: 12.99,
    img: `${BASE_URL}/hat1.png`,
  },
];

const Medicine = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(false);

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
    if (image) {
      setImage(false);
      return true;
    }
    if (show) {
      setShow(false);
      setProduct(null);
      return true;
    }
  }
  if (image) {
    console.log(image);
    return (
      <View style={styles.row}>
        <Image
          source={{
            uri: product.img,
          }}
          style={styles.image}
          resizeMode="stretch"
        />
      </View>
    );
  }
  if (show) {
    return (
      <View style={styles.row}>
        <View style={styles.col}>
          <Product
            props={product}
            onClick={() => {
              setImage(true);
            }}
          />
        </View>
      </View>
    );
  }
  return (
    <ScrollView
      style={{
        flexGrow: 0,
        width: '100%',
        height: '100%',
      }}>
      {products.map((product, index) => {
        return (
          <View style={styles.row} key={index}>
            <View style={styles.col}>
              <Product
                props={product}
                onClick={() => {
                  setProduct(product);
                  setShow(true);
                  // console.log("image is clicked")
                }}
              />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Medicine;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  col: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 400,
  },
});
