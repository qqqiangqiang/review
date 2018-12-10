new A({
  data() {
    return {
      msg: 'default value',
      tips: ['a', 'b', 'c'],
      obj: { name: 'dzq' }
    }
  },
  ready() {
    setTimeout(() => {
      this.msg = 'seconed value';
      this.tips.push('d');
      this.$set(this.tips, 0, 'f');
      this.$set(this.obj, 'age', 29);
    }, 2000);
  },
  computed: {
    message() {
      return this.msg + 'dongzhiqiang';
    }
  }
})

