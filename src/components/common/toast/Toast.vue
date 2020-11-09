<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
    },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message="默认文字", duration=2000) {
        this.isShow = true,
        this.message = message,

        setInterval(() => {
          this.isShow = false
          this.message = ''
        }, duration);
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;

    z-index: 999;

    border-radius: 5px;
    color: #fff;
    background-color: rgba(0, 0, 0, .6);
  }
</style>
