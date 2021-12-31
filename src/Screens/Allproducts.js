import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import {Appbar, Divider, Button} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {AllProductCard} from '../Components/AllProductsCard';
import {hp, wp} from '../Styles/Style';
import {useIsFocused} from '@react-navigation/native';

export const AllProducts = ({navigation}) => {
  const isFocused = useIsFocused();
  console.log('Arrive in All product Screen');
  const authSelector = useSelector(state => state.authReducer.authData);
  var token = authSelector.token;
  const [colorModal, setColorModal] = useState('false');
  const [allCategory, setAllCategory] = useState([]);
  const [categoryModal, setCategoryModal] = useState('false');
  const [rateModal, setRateModal] = useState('false');
  const [allProduct, setallProduct] = useState([]);
  const [allColor, setallColor] = useState([]);
  React.useEffect(() => {
    allProductAxios();
  }, [isFocused]);

  // all product api
  const allProductAxios = () => {
    axios
      .get('https://nameless-savannah-21991.herokuapp.com/commonProducts', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        console.log('all product response=>', response);
        let data = response.data.commonProducts;
        setallProduct(data);
        console.log('got all product response');
        let category = response.data.allCategories;
        setAllCategory(category);
        let color = response.data.allColors;
        setallColor(color);
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  //filter for rating
  const lowToHighRate = () => {
    const asec = allProduct.sort((a, b) => {
      return a.rating - b.rating;
    });
    setallProduct(asec);
    setRateModal(!rateModal);
  };
  const highToLowRate = () => {
    console.log('arrived in hoghtolow function');
    const dsec = allProduct.sort((a, b) => {
      return b.rating - a.rating;
    });
    setallProduct(dsec);
    setRateModal(!rateModal);
  };
  return (
    <View>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
        <Appbar.Content title="ALL PRODUCT" style={{alignItems: 'center'}} />
      </Appbar.Header>
      <FlatList
        data={allProduct}
        renderItem={({item}) => (
          <AllProductCard
            name={item.name}
            image={item.image}
            price={item.price}
            id={item.id}
            rating={item.rating}
          />
        )}
      />
      {/* Filter Buttons  */}
      <View
        style={{
          backgroundColor: '#E5E4E2',
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          marginTop: hp('91.9%'),
          alignSelf: 'center',
          borderRadius: 2,
          width: wp('99.2%'),
        }}>
        {/* category filter code */}
        <TouchableOpacity
          onPress={() => setCategoryModal(!categoryModal)}
          style={allProductStyl.button}>
          <Text style={allProductStyl.btnTxt}>Category</Text>
        </TouchableOpacity>
        <Modal transparent={true} visible={categoryModal}>
          <View
            style={{
              height: hp('40%'),
              width: wp('50%'),
              backgroundColor: 'white',
              alignSelf: 'center',
              marginTop: hp('30%'),
            }}>
            <Entypo
              name="circle-with-cross"
              size={30}
              color="black"
              onPress={() => {
                setCategoryModal(!categoryModal);
              }}
            />
            {allCategory.map(item => (
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <TouchableOpacity
                  onPress={() => {
                    console.warn('clicked on', item);
                  }}>
                  <Text style={{padding: wp('3%'), color: 'black'}}>
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Modal>
        {/*  filter By colour code */}
        <TouchableOpacity
          onPress={() => setColorModal(!colorModal)}
          style={allProductStyl.button}>
          <Text style={allProductStyl.btnTxt}>Color</Text>
        </TouchableOpacity>
        <Modal transparent={true} visible={colorModal}>
          <View
            style={{
              height: hp('90%'),
              width: wp('70%'),
              backgroundColor: 'white',
              alignSelf: 'center',
              marginTop: hp('3%'),
              borderRadius: hp('7%'),
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: hp('3%'),
                marginTop: hp('2%'),
              }}>
              <Entypo
                name="circle-with-cross"
                size={30}
                color="black"
                onPress={() => {
                  setColorModal(!colorModal);
                }}
                style={{
                  marginLeft: wp('10%'),
                }}
              />
              <Text
                style={{
                  marginLeft: wp('5%'),
                  fontSize: wp('5%'),
                  marginTop: hp('1%'),
                  color: 'black',
                }}>
                Available colors
              </Text>
            </View>
            {allColor.map(item => (
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <TouchableOpacity
                  onPress={() => {
                    console.warn('clicked on', item);
                  }}>
                  <Text
                    style={{
                      margin: wp('2%'),
                      padding: wp('3%'),
                      backgroundColor: 'lightgray',
                      borderRadius: wp('4%'),
                      color: item,
                      width: wp('30%'),
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => console.log('presses')}
          style={allProductStyl.button}>
          <Text style={allProductStyl.btnTxt}>Price</Text>
        </TouchableOpacity>
        {/* Rate Modal code */}
        <TouchableOpacity
          onPress={() => setRateModal(!rateModal)}
          style={allProductStyl.button}>
          <Text style={allProductStyl.btnTxt}>Rating</Text>
        </TouchableOpacity>
        <Modal transparent={true} visible={rateModal} animationType="slide">
          <View style={allProductStyl.RatingModalView}>
            <View style={allProductStyl.RatingModalInnnerView}>
              <View style={allProductStyl.RatingModalIconTextView}>
                <Entypo
                  name="circle-with-cross"
                  size={30}
                  color="black"
                  onPress={() => {
                    setRateModal(!rateModal);
                  }}
                />
                <Text
                  style={{
                    fontSize: wp('4%'),
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  Sort by Rating
                </Text>
              </View>
              <Divider style={allProductStyl.RatingModalDivider} />

              <Button
                mode="outlined"
                color="black"
                onPress={() => {
                  highToLowRate();
                }}
                style={{marginBottom: hp('2%')}}>
                High to Low
              </Button>
              <Button
                mode="outlined"
                color="black"
                onPress={() => {
                  lowToHighRate();
                }}>
                Low to High
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
const allProductStyl = StyleSheet.create({
  button: {
    width: wp('20%'),
    height: hp('6%'),
    paddingHorizontal: hp('0.6%'),
    backgroundColor: 'white',
    marginVertical: hp('1%'),
    alignSelf: 'center',
    borderRadius: wp('2%'),
    marginHorizontal: hp('0.2%'),
    marginLeft: wp('3.5%'),
    borderColor: 'black',
  },
  btnTxt: {
    fontSize: wp('3.8%'),
    color: 'black',
    borderRadius: hp('1%'),
    textAlign: 'center',
    borderColor: 'black',
    paddingVertical: hp('1.3%'),
  },
  RatingModalView: {
    width: wp('70'),
    height: hp('30%'),
    backgroundColor: 'white',
    borderRadius: wp('8%'),
    alignSelf: 'center',
    marginTop: hp('30%'),
    borderColor: 'black',
    borderWidth: hp('0.1%'),
  },
  RatingModalInnnerView: {
    marginLeft: wp('6%'),
    marginRight: wp('6%'),
    marginTop: hp('5%'),
  },
  RatingModalIconTextView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: wp('3%'),
  },
  RatingModalDivider: {
    color: 'black',
    height: hp('0.1%'),
    marginBottom: hp('3%'),
  },
});
