// pages/chooseLib/chooseLib.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    Tp:0,
    playtime:'8月31日',
    startplace:'软通动力西门集合',
    endplace:'集体活动+吃饭+饭后散步',
    wayoption:'自己到达（拼车 或者 坐地铁）',
    comments:'请记得保管好钱包，钥匙，手机等贵重物品，保持手机畅通方便及时联系，谢谢配合',
    aa:[],
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      // 获取已经报名的人数
      name: 'getTotal',
      // 返回参加 和 不参加的人数
    }).then(res => {
      this.setData({
        ...(res.result)
      })
    }).catch(console.error)

    wx.cloud.callFunction({
      // 获取已经报名的人数
      name: 'getJoined',
      // 返回参加人的所有信息
    }).then(res => {
      this.setData({
         aa: res.result
      })
    }).catch(console.error)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})