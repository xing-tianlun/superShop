<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
      :is-checked="isSelectAll" 
      class="check-button" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((perValue, item) => {
          return perValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        // 方案一
        // if(this.cartList.length === 0) return false
        // return !(this.cartList.filter(item => !item.checked).length)
        // 方案二
        if(this.cartList.length === 0) return false
        return !(this.cartList.find(item => !item.checked))
      }
    },
    methods: {
      ...mapActions(['purchase']),
      checkClick() {
        if(this.isSelectAll) { // 全部选中
          this.cartList.forEach(item => item.checked = false)
        } else { // 部分或全部不选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(!this.isSelectAll) {
          this.$toast.show('请选择购买的商品')
        }
        if(this.cartList.find(item => item.checked)){
          this.purchase()
          this.$toast.show('购买成功')
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
    
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 65px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    background: red;
    color: #fff;
    text-align: center;
  }
</style>
