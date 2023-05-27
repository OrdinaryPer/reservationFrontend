// pages/admin/lab/lab.js
Page({
  data: {
    lab:{}
  },
  add: function() {
    wx.navigateTo({
      url: './add/add',
    })
  },
showAll: function() {
  const that = this
  wx.request({
    url: 'http://localhost:8080/test2/lab/all',
    header: {
      'Content-Type': "application/json"
    },
    method: "GET",
    success: function(res) {
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
        that.setData({
          lab: res.data
        })
      }
    }
  })
},
submit: function(e) {
  const name = e.detail.value.name
  const that = this
  wx.request({
    url: 'http://localhost:8080/test2/lab/name',
    header: {
      "Content-Type": "application/json"
    },
    method: "POST",
    data: {
      lab_name: name
    },
    success: function(res) {
      if (res.data == "fail") {
        wx.showToast({
          title: '查询失败',
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
        that.setData({
          lab: res.data
        })
      }
    }
  })
},
update: function(e) {
  const index = e.currentTarget.dataset.index
  wx.request({
    url: 'http://localhost:8080/test2/lab/id',
    header: {
      "Content-Type": 'application/json'
    },
    method: "POST",
    data: {
      lab_id: index
    },
    success: function(res) {
      if (res.data == "fail") {
        wx.showToast({
          title: '请求失败',
          icon: 'loading',
          duration: 500
        })
        setTimeout(() => wx.hideToast(), 500)
      } else if (res.data == '') {
        wx.showToast({
          title: '无此实验室',
          icon: 'loading',
          duration: 500
        })
        setTimeout(() => wx.hideToast(), 500)
      } else {
        let lab = {}
        lab = res.data
        if (lab[0].aState.state_name != '空闲') {
          wx.showToast({
            title: '非空闲不可修改',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else {
          getApp().globalData.lab = lab
          wx.navigateTo({
            url: './update/update',
          })
        }
      }
    }
  })
},
deleteLab: function(e) {
  const id = e.currentTarget.dataset.index
  const state = e.currentTarget.dataset.state
  const that = this
  if (state != '空闲') {
    wx.showLoading({
      title: '非空闲不能删除',
      icon: 'loading',
      duration: 500
    })
    setTimeout(() => wx.hideToast(), 500)
  } else {
    wx.request({
      url: 'http://localhost:8080/test2/lab/del/id',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        lab_id: id
      },
      success: function(res) {
        if (res.data == "fail") {
          wx.showToast({
            title: '删除失败',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else if (res.data == "success") {
          wx.showToast({
            title: '删除成功',
            icon: 'loading',
            durtaion: 500
          })
          setTimeout(() => {
            wx.hideToast()
            that.showAll()
          }, 500)
        }
      }
    })
  }
},
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 
      })
    }

    this.showAll()
  }
})