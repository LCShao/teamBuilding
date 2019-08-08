// components/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer: function (newVal) {
        if (newVal) {
          wx.pageScrollTo({
            scrollTop: 0,
            duration: 100
          })
        }
      }
    },
    title: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchstart: function () {
      if (this.data.closeOnClickModal) {
        this.close();
      }
    },
    closedialog: function () {
      if (this.dataset.model) {
        let currentPage = getCurrentPages().pop();
        let data = {};
        data[this.dataset.model] = false;
        currentPage.setData(data);
      }
    },
    close: function () {
      this.closedialog();
      this.triggerEvent('close');
    },
    confirm: function () {
      this.closedialog();
      this.triggerEvent('confirm');
    }
  }
})
