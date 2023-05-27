// pages/user/apply/apply.js
Page({
  data: {
   rsv: null
  },
  cancel: function(e) {
    const id = e.currentTarget.dataset.labid
    const user = getApp().globalData.user
    const that = this
    wx.request({
      url: 'http://localhost:8080/test2/rsv/del',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        user_id: user.user_id,
        lab_id: id
      },
      success: function(res) {
        if (res.data == "fail") {
          wx.showToast({
            title: '取消失败',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else if (res.data == "success") {
          wx.request({
            url: 'http://localhost:8080/test2/lab/update/state',
            header: {
              "Content-Type": "application/json"
            },
            method: "POST",
            data: {
              lab_id: id,
              aState: {
                state_id: '0'
              }
            },
            success: function(res) {
              if (res.data == "fail") {
                wx.showToast({
                  title: '修改失败',
                  icon: 'loading',
                  duration: 500
                })
                setTimeout(() => wx.hideToast(), 500)
              } else {
                wx.showToast({
                  title: '取消成功',
                  icon: 'loading',
                  duration: 500
                })
                setTimeout(() => {
                  wx.hideToast()
                  that.loadInfo()
                }, 500)
              }
            }
          })
        }
      }
    })
  },
  loadInfo: function() {
    const user = getApp().globalData.user
    const that = this
    console.log(user)
    wx.request({
      url: 'http://localhost:8080/test2/rsv/user',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        user_id: user.user_id
      },
      success: function (res) {
        if (res.data == "fail") {
          wx.showToast({
            title: '读取失败',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else {
          that.setData({
            rsv: res.data
          })
        }
      }
    })
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0 
      })
    }
    this.loadInfo()
  }
})