import {
  ADD_COUNTER,
  ADD_TO_CART,
  ADD,
  SUB,
  PURCHASE
} from './mutations-types.js'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
        // 1.判断之前的数组中是否有该件商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 2.判断oldProduct
      if(oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        // oldProduct.count += 1
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        // state.carList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加新商品')
      }
    })
    
  },
  goodsItemDecrease(context,payload) {
    return new Promise((resolve, reject) => {
      resolve('当前商品数量-1')
      const array = context.state.cartList
      var goodsindex;
      for (var i = 0; i < array.length; i++) {
        if(array[i].iid === payload) {
          goodsindex = i
          break
        }
      }
      // console.log(goodsindex);
      context.commit(SUB, goodsindex)
    })
  },
  goodsItemIncrease(context,payload) {
    return new Promise((resolve, reject) => {
      resolve('当前商品数量+1')
      const array = context.state.cartList
      var goodsindex;
      for (var i = 0; i < array.length; i++) {
        if(array[i].iid === payload) {
          goodsindex = i
          break
        }
      }
      // console.log(goodsindex);
      context.commit(ADD, goodsindex)
    })
  },
  purchase(context,payload) {
    return new Promise((resolve, reject) => {
      resolve('购买成功')
      context.commit(PURCHASE, payload)
    })
  }
}
