//index.js
const app = getApp()
//读取数据库记录数量  参加为Tp 不参加为Fp
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    Fp: 0,
    Tp: 0,
    ename:'',
    isJoin: true
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
              })
            }
          })
        }
      }
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getTotal',
      // 传给云函数的参数
    }).then(res => {
        this.setData({
          ...(res.result)
        })
      }).catch(console.error)
  },
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  getEname:function(e){
    this.setData({
      ename: e.detail.value
    })
  },
  getIsJoin:function(e){
    this.setData({
      isJoin: e.detail.value=="1"
    })
  },
  formSubmit: function (e) {
    if(this.data.ename == ""){
      wx.showToast({
        title: '姓名不能为空!',
        icon: 'none',
        duration: 3000
      })
    }else{
      wx.cloud.callFunction({
      // 云函数名称
      name: 'addone',
      // 传给云函数的参数
      data: {
        ename: this.data.ename,
        isJoin: this.data.isJoin,
        shortName: this.data.userInfo.nickName
      },
    })
      .then(res => {
        if(res.result.res._id == -1){
          wx.showToast({
            title: res.result.res.errMsg,
            icon: 'none',
            duration: 3000
          })
        }else{
            //刷新进度条
          wx.cloud.callFunction({
            // 云函数名称
            name: 'getTotal',
            // 传给云函数的参数
          })
            .then(res => {
              this.setData({
                ...(res.result)
              })
            })
            .catch(console.error)
        }
        //不论是否添加成功都要重置
        this.formReset()
      })
      .catch(console.error)
    }
  },
  formReset: function () {
    this.setData({
      ename: "",
      isJoin: true
    })
  },
})
