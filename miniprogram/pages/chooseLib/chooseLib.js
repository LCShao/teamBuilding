// pages/chooseLib/chooseLib.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    Tp:0,
    playtime:'9月20日 3pm to 8:30pm',
    startplace:'软通动力西门集合',
    endplace:'奥森公园健步走+吃饭',
    wayoption:'自己到达（拼车 或者 坐地铁）',
    comments:'1. 如无特殊原因不予请假。2. 我们加入HIG以后，每次团建活动都需要提供集体照片，请大家当天到活动地点后一起照个合影。谢谢配合~',
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
      var aa= res.result;
      if (aa.length<4){
        for(var i=0;i<=4-aa.length;i++){
          aa.push({ename:"",phoneNo:""})
        }
      }
      this.setData({
        aa
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