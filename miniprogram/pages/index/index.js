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
    phone:'',
    isJoin: true,
    dialogvisible: false,
    title: '',
    content: '小程序需要您的授权才能提供更好的服务哦'
  },
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
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
        }else{
          this.showDialog();
        }
      }
    })
    wx.cloud.callFunction({
      // 获取已经报名的人数
      name: 'getTotal',
      // 返回参加 和 不参加的人数
    }).then(res => {
        this.setData({
          ...(res.result)
        })
      }).catch(console.error)
  },
  onShow: function(){

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
  getPhone: function (e) {
    this.setData({
      phone: e.detail.value
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
      name: 'addone',
      data: {
        ename: this.data.ename,
        phone:this.data.phone,
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
            name: 'getTotal',
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
      phone: "",
      isJoin: true
    })
  },
  showDialog: function () {
    this.setData({
      dialogvisible: true
    })
  },
  // handleClose: function () {
  //   //如果不授权 则不能区分微信用户 报名时则不能实名制
  //   this.shortName = "用户",
  //   this.avatarUrl = './user-unlogin.png'
  //   wx.showToast({
  //     title: '请重新打开小程序进行授权',
  //     icon: 'none'
  //   })
  // },
  handleConfirm: function () {
    wx.authorize({
      scope: "scope.userInfo",
      success: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }

    })
    // 
    wx.openSetting({
      success:res=> {
        console.log(res.authSetting)
        if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                // var c = getCurrentPages();
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo
                })
            }
          })
        }
      }
     })
  },
})
