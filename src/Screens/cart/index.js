import React, {useEffect, useState} from 'react'
import {View, Text, FlatList} from 'react-native'
import {storeCart} from '../../Services/store'
import CartItem from './CartItem'

const Cart = ({navigation})=>{
  const [cartList, setCartList] = useState(null)
  const [totalSum, setTotalSum] = useState(0);


  const updateList = async()=>{
    const list = await storeCart.get_cart_list()
    setCartList(list)
    updateTotal()
  }

  const updateTotal = async () => {
    const list = await storeCart.get_cart_list()
    console.log(121221)
    setTotalSum(list.reduce((sum, i) => sum + i.price * (i.count ? i.count : 1), 0))
  }

  useEffect(()=>{
    updateList()
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      updateList()
    });
    return unsubscribe;
  },[navigation])

  const handleDelete = async (item) => {
    await storeCart.remove_cart_list(item);
    updateList();
  }
  console.log(cartList)


  return(
    <View style={{paddingBottom: 60}}>
      <FlatList
          data={cartList}
          numColumns={1}
          renderItem={({ item }) => <CartItem item={item} onDelete={handleDelete} updateTotal={updateTotal}/>}
          keyExtractor={item => item.id}
        />
      <View style={{marginTop: 10}}>
        <Text>Всего товаров: {cartList ? cartList.length : 0}</Text>
        <Text>Итого: ${totalSum}</Text>
      </View>
    </View>
  )
}

export default Cart









// // Родительский компонент
// function Parent() {
//   const handleData = (data) => {
//     console.log(data);
//   };

//   return <Child onData={handleData} />;
// }

// // Дочерний компонент
// function Child({ onData }) {
//   const handleClick = () => {
//     onData('Данные из дочернего компонента');
//   };

//   return <button onClick={handleClick}>Нажми меня</button>;
// }

