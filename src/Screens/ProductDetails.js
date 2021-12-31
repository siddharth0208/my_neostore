import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, Modal} from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {Rating} from 'react-native-ratings';
import {errorHandling} from '../utils/ErrorHandling';
import {carouselImage} from '../utils/Constaint';

import {
  Appbar,
  Card,
  Paragraph,
  Title,
  Button,
  Divider,
  FAB,
  Chip,
} from 'react-native-paper';
import {hp, wp} from '../Styles/Style';
import {ScrollView} from 'react-native-gesture-handler';
export const ProductDetails = ({route, navigation}) => {
  const [activepag, setactivepag] = useState(0);
  const [productData, setProductData] = useState([]);
  console.log('arrive in product details screen');
  const {id} = route.params;
  const {image} = route.params;
  console.log('id', id);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    productDetails();
  }, [isFocused]);
  const authSelector = useSelector(state => state.authReducer);
  var token = authSelector.authData.token;
  console.log('token', token);
  const [isModalVisible, setModalVisible] = useState(false);

  const productDetails = () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .get(
        `https://nameless-savannah-21991.herokuapp.com/getProductDetails/${id}&${'red'}`,

        config,
      )
      .then(function (response) {
        console.log('Product Details response', response);
        let data = response.data;
        setProductData(data);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  const addToCart = () => {
    var color = productData.colors[0];
    console.log(color);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(
        `https://nameless-savannah-21991.herokuapp.com/addToCart/${productData.id}&${color}`,
        {
          id: productData.id,
          color: color,
        },

        config,
      )
      .then(function (response) {
        console.log('Add to Cart response', response);
        navigation.navigate('Cart');

        Alert.alert('Product Added');
      })
      .catch(function (error) {
        console.log('error', error);
        Alert.alert('Something Went Wronge');
      });
  };
  const ratingCompleted = rating => {
    console.log('arrive in Rating fuction');
    console.log('rating is', rating);
    console.log('id is', id);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    axios
      .post(
        `https://nameless-savannah-21991.herokuapp.com/addRating/${id}&${rating}`,
        {
          id: id,
          rating: rating,
        },

        config,
      )
      .then(function (response) {
        console.log('Rating Response=>', response);
      })
      .catch(function (error) {
        console.log('Error');
        errorHandling(error);
      });
  };

  return (
    <View>
      <View>
        <Appbar.Header style={{backgroundColor: 'white'}}>
          <Appbar.BackAction
            onPress={() => {
              navigation.navigate('Dashboard');
            }}
          />
          <Appbar.Content
            style={{
              alignItems: 'center',
            }}
            title={productData.name}
          />
          <Appbar.Action
            icon="cart"
            color="#1e90ff"
            size={35}
            onPress={() => {
              navigation.navigate('Cart');
            }}
          />
        </Appbar.Header>
      </View>
      <View style={ProductDetailStyl.imageView}>
        <Card>
          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            style={ProductDetailStyl.imageScroll}>
            {productData &&
              productData.images &&
              productData.images.length &&
              productData.images.map((images, index) => (
                <Card.Cover
                  key={index}
                  source={{
                    uri: `${carouselImage}${images}`,
                  }}
                  resizeMode="contain"
                  style={ProductDetailStyl.image}
                />
              ))}
          </ScrollView>
          <View style={ProductDetailStyl.pagination}>
            {[carouselImage].map((i, k) => (
              <Text
                key={k}
                style={
                  k == activepag
                    ? ProductDetailStyl.paginationActiveText
                    : ProductDetailStyl.paginationText
                }>
                ⬤
              </Text>
            ))}
          </View>

          {/*<Text style={ProductDetailStyl.ratingOnImage}>
              <MaterialCommunityIcons name="star" size={30} color="#fada5e" />
              {productDetails.rating}
            </Text> */}
        </Card>
      </View>
      <Card>
        <Card.Content>
          <Title> {productData.name}</Title>
          <View style={{flexDirection: 'row', height: 26}}>
            {productData &&
              productData.colors &&
              productData.colors.length &&
              productData.colors.map((item, index) => {
                return (
                  <Chip textStyle={{color: item}} style={{color: 'black'}}>
                    {item.toString()}
                  </Chip>
                );
              })}
          </View>
          <Paragraph style={ProductDetailStyl.paragraph}>
            {productData.description}
          </Paragraph>
          <Paragraph style={ProductDetailStyl.paragraph}>
            {productData.features}
          </Paragraph>
          <Title>{productData.price}</Title>
          <Paragraph>inclusive of all taxes</Paragraph>

          <Divider
            style={{
              borderColor: 'lightgrey',
              height: hp('2%'),
              marginTop: hp('4.5%'),
            }}
          />
          <Title>Easy 30 days return and exchange</Title>
          <Paragraph>
            Choose to return or exchange for a different if available) within 30
            days
          </Paragraph>
          <Card.Content
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: hp('2%'),
            }}>
            <Button
              icon="star"
              mode="outlined"
              color="#fada5e"
              style={ProductDetailStyl.button}
              onPress={() => {
                setModalVisible(!isModalVisible);
              }}>
              <Text style={{color: 'black'}}>RATE</Text>
            </Button>
            <Modal
              transparent={true}
              visible={isModalVisible}
              style={{width: wp('60%'), height: hp('40%')}}>
              <View style={{flex: 1}}>
                <Card style={ProductDetailStyl.modalCard}>
                  <Card.Content>
                    <Title
                      style={{alignSelf: 'center', paddingBottom: hp('2%')}}>
                      {productData.name}
                    </Title>
                    <Divider />
                    <Card.Cover
                      source={{uri: `${carouselImage}${image}`}}
                      style={ProductDetailStyl.modalImage}
                    />
                    <Rating
                      type="star"
                      ratingCount={5}
                      jumpValue={1}
                      imageSize={30}
                      onFinishRating={ratingCompleted}
                    />

                    <Button
                      mode="outlined"
                      style={ProductDetailStyl.modalButton}
                      onPress={() => {
                        setModalVisible(!isModalVisible);
                      }}>
                      RATE NOW
                    </Button>
                  </Card.Content>
                </Card>
              </View>
            </Modal>

            <Button
              icon="cart"
              mode="contained"
              color="#ff9999"
              style={ProductDetailStyl.button}
              onPress={() => {
                addToCart();
              }}>
              <Text style={{color: 'white'}}> BUY NOW</Text>
            </Button>
          </Card.Content>
        </Card.Content>
      </Card>
      <FAB
        style={ProductDetailStyl.fab}
        large
        icon="cart"
        color="white"
        onPress={() => {
          addToCart();
        }}
      />
    </View>
  );
};
const ProductDetailStyl = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: hp('1%'),
    backgroundColor: '#F5F5F5',
  },
  paragraph: {
    fontSize: wp('4%'),
    padding: wp('1%'),
  },
  button: {
    width: wp('40%'),
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#ff9999',

    marginTop: hp('72%'),
    marginLeft: wp('83%'),
  },
  txt: {
    color: 'black',
    paddingTop: hp('35%'),
    marginLeft: wp('75%'),
    alignSelf: 'flex-end',
  },
  modalCard: {
    backgroundColor: 'white',
    marginTop: hp('12%'),
    marginBottom: hp('15%'),
    marginLeft: hp('5%'),
    marginRight: hp('5%'),
    flex: 1,
    borderRadius: wp('8%'),
    height: hp('50%'),
  },
  modalImage: {
    paddingVertical: hp('1%'),
    height: hp('53%'),
    backgroundColor: 'white',
    width: wp('49%'),
    marginLeft: wp('12%'),
  },
  modalButton: {
    width: wp('70%'),
    marginTop: hp('2%'),
  },
  paginationText: {
    color: 'lightgray',
    margin: hp('0.5%'),
  },
  paginationActiveText: {
    color: 'black',
    margin: hp('0.5%'),
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  image: {
    width: wp('100%'),
    height: hp('40%'),
  },
  imageView: {
    height: hp('42%'),
    width: wp('100%'),
    backgroundColor: 'white',
  },
  imageScroll: {
    width: wp('100%'),
    height: hp('40%'),
  },
});
