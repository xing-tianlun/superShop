import {
  ADD_COUNTER,
  ADD_TO_CART,
  ADD,
  SUB,
  PURCHASE
} from './mutations-types.js'

export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每个方法尽可能完成的事件比较单一一点
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  [SUB](state,payload) {
    if(state.cartList[payload].count <= 1) {
      state.cartList[payload].count = 1
    } else {
      (state.cartList[payload].count)--
    }
  },
  [ADD](state,payload) {
    if(state.cartList[payload].count >= 10) {
      state.cartList[payload].count = 10
    } else {
      (state.cartList[payload].count)++
    }
  },
  [PURCHASE](state,payloar) {
    state.cartList = state.cartList.filter(item => item.checked != true)
  }
}
