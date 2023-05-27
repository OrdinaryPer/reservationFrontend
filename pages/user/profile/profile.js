// pages/user/profile/profile.js
Page({
  data: {
    user: {}
  },
  onLoad: function (options) {
    const use = getApp().globalData.user
    const that = this
    wx.request({
      url: 'http://localhost:8080/test2/user/info',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        user_id: use.user_id
      },
      success: function(res) {
        if (res.data == "fail") {
          wx.showToast({
            title: '加载失败',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else {
          that.setData({
            user: res.data
          })
          getApp().globalData.user = res.data
        }
      }
    })
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2 
      })
    }
  }
})