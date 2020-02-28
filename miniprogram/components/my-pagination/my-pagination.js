// components/pagination/pagination.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    current: {
      type: Number,
      value: 1
    },
    total: {
      type: Number,
      value: 0
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleChange(type) {
      this.triggerEvent('change', {
        type: type
      });
    },
    handleFirst(){
      this.handleChange('first')
    },
    handlePrev() {
      this.handleChange('prev');
    },
    handleNext() {
      this.handleChange('next');
    },
    handleEnd() {
      this.handleChange('end')
    },
  }
})
