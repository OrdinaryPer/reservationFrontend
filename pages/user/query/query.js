// pages/user/query/query.js
Page({
  data: {
    lab: {},
    state: [
      {
        name: '0', value: '空闲'
      },
      {
        name: '1', value: '申请中'
      },
      {
        name: '2', value: '已预约'
      }
    ]
  },
  query: function() {
    const user = getApp().globalData.user
    const that = this
    console.log(user)
    wx.request({
      url: 'http://localhost:8080/test2/rsv/double/id',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        user_id: user.user_id,
        lab_id: user.labId
      },
      success: function (res) {
        if (res.data == "fail") {
          wx.showToast({
            title: '请求失败',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else if (res.data != '') {
          wx.showToast({
            title: '不能重复预约',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else {
          that.labjudice()
        }
      }
    })
  },
  labjudice: function() {
    const labid = getApp().globalData.user.labId
    wx.request({
      url: 'http://localhost:8080/test2/lab/id',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        lab_id: labid
      },
      success: function (res) {
        if (res.data == "fail") {
          wx.showToast({
            title: '请求失败',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else if (res.data == 'success') {
          wx.showToast({
            title: '不能预约',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else {
          wx.navigateTo({
            url: '../apply/order/order',
          })
        }
      }
    })
  },
  order: function(e) {
    const id = e.currentTarget.dataset.id
    getApp().globalData.user.labId = id;
   this.query()
  },
  submit: function(e) {
    const name = e.detail.value.lab
    const that = this
    if (name.trim() == '') {
      wx.showToast({
        title: '不能为空',
        icon: 'loading',
        duration: 500
      })
      setTimeout(() => wx.hideToast(), 500)
    } else {
      wx.request({
        url: 'http://localhost:8080/test2/lab/name',
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data: {
          lab_name: name
        },
        success: function (res) {
          if (res.data == "fail") {
            wx.showToast({
              title: '查询失败',
              icon: 'loading',
              duration: 500
            })
            setTimeout(() => wx.hideToast(), 500)
          } else if (res.data == "") {
            wx.showToast({
              title: '实验室不存在',
              icon: 'loading',
              duration: 500
            })
            setTimeout(() => wx.hideToast(), 500)
          } else {
            that.setData({
              lab: res.data
            })
          }
        }
      })
    }
  },
  change: function(e) {
    const id = e.detail.value
    const that = this
    wx.request({
      url: 'http://localhost:8080/test2/lab/state',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        state_id: id
      },
      success: function (res) {
        if (res.data == "fail") {
          wx.showToast({
            title: '加载失败',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else if (res.data == "") {
          wx.showToast({
            title: '无此状态实验室',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else {
          console.log(res.data)
          that.setData({
            lab: res.data
          })
        }
      }
    })  
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 
      })
    }
    const that = this
    const user = getApp().globalData.user
    console.log(user)
    wx.request({
      url: 'http://localhost:8080/test2/lab/all',
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: function (res) {
        if (res.data == "fail") {
          wx.showToast({
            title: '加载失败',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else if (res.data == "") {
          wx.showToast({
            title: '无实验室信息',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else {
          console.log(res.data)
          that.setData({
            lab: res.data
          })
        }
      }
    })  
  }
})