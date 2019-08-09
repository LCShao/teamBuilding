Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "../index/index",
      iconPath: "cloud://teambuilding-zap24.7465-teambuilding-zap24/icon_component.png",
      selectedIconPath: "cloud://teambuilding-zap24.7465-teambuilding-zap24/icon_component_HL.png",
      text: "报名页"
    }, {
        pagePath: "../chooseLib/chooseLib",
        iconPath: "cloud://teambuilding-zap24.7465-teambuilding-zap24/icon_API.png",
        selectedIconPath: "cloud://teambuilding-zap24.7465-teambuilding-zap24/icon_API_HL.png",
      text: "活动详情"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      console.log(data)
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})