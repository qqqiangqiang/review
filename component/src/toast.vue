<template>
  <div class="toast" v-show="show">
    {{ text }}
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        default: true
      },
      text: {
        default: '这是一个toast'
      }
    },
    data() {
      return {}
    },
    methods: {
      showToast() {
        this.show = !this.show;
      },
      hideToast() {
        this.show = false;
      }
    }
  }
</script>

