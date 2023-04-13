import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useQuery } from '@apollo/client';
import { productsGQL } from '../../Services/gqls';
import actionProducts from './actions';
import config from '../../Config'

const ProductDetails = ({ navigation, route }) => {
  const [productData, setProductData] = useState(route.params?.item);

  const putProduct = (data) => {
    setProductData(data.product);
  };

  useQuery(productsGQL.getProduct, actionProducts.getProduct(putProduct, route.params?.item?._id));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{productData?.title}</Text>
      <Image style={styles.image} source={{ uri: `${config.public}${productData?.picture}` }} />
      <Text style={styles.price}>Price: {productData?.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: null,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ProductDetails;
