<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick" />
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <!-- <div class="item-title">{{this.itemInfo.iid}}{{itemInfo.title}}</div> -->
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">商品描述: {{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ itemInfo.price }}</div>
        <div class="item-count right">
          <div @click="_goodsItemDecrease">-</div>
          <div>{{ itemInfo.count }}</div>
          <div @click="_goodsItemIncrease">+</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapActions } from "vuex";
export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  // computed: {
  //   getIid() {
  //     return this.itemInfo.iid
  //   }
  // },
  methods: {
    ...mapActions(["goodsItemDecrease", "goodsItemIncrease"]),
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked;
    },
    _goodsItemDecrease() {
      const iid = this.itemInfo.iid;
      this.goodsItemDecrease(iid);
    },
    _goodsItemIncrease() {
      const iid = this.itemInfo.iid;
      this.goodsItemIncrease(iid);
    },
  },
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.item-desc {
  overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 12px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}

.info-bottom .item-count div {
  float: left;
  width: 25px;
  height: 20px;
  line-height: 18px;
  text-align: center;
}
.info-bottom .item-count div:first-child {
  border: 1px solid #ddd;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.info-bottom .item-count div:nth-child(2) {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  line-height: 20px;
}
.info-bottom .item-count div:last-child {
  border: 1px solid #ddd;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  line-height: 19px;
}
</style>
