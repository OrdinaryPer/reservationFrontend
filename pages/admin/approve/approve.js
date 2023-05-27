// pages/admin/approve/approve.js
Page({
  data: {
    rsv: {}
  },
  selectAll: function() {
    const that = this
    wx.request({
      url: 'http://localhost:8080/test2/rsv/all',
      header: {
        "Content-Type": "application/json"
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
        } else if (res.data == '') {
          wx.showToast({
            title: '无预约',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => {
            wx.hideToast()
            that.setData({
              rsv: res.data
            })
          }, 500)
        } else {
          that.setData({
            rsv: res.data
          })
        }
      }
    })
  },
  updatelab: function() {
    const lab = getApp().globalData.lab
    const user = getApp().globalData.user
    const that = this
    console.log(lab)
    console.log(user)
    wx.request({
      url: 'http://localhost:8080/test2/lab/update/state',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        lab_id: lab.id,
        aState: {
          state_id: '2'
        }
      },
      success: function(res) {
        if (res.data == "fail") {
          wx.showToast({
            title: '操作失败',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else if (res.data == "success") {
          wx.showToast({
            title: '操作成功',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => {
            wx.hideToast()
            that.updateRsv()
          }, 500)
        }
      }
    })
  },
updateRsv: function() {
  const lab = getApp().globalData.lab
  const that = this
  wx.request({
    url: 'http://localhost:8080/test2/rsv/update/state/rsvid',
    header: {
      "Content-Type": "application/json"
    },
    method: "POST",
    data: {
      aState: {
        state_id: '2'
      },
      rsv_id: lab.rsv_id
    },
    success: function (res) {
      if (res.data == "fail") {
        wx.showToast({
          title: '操作失败',
          icon: 'loading',
          duration: 500
        })
        setTimeout(() => wx.hideToast(), 500)
      } else if (res.data == "success") {
        setTimeout(() => {
          that.selectAll()
        }, 500)
      }
    }
  })
},
  agree: function(e) {
    const labid = e.currentTarget.dataset.lid
    const index = e.currentTarget.dataset.uid
    const rsvid = this.data.rsv[index].rsv_id
    getApp().globalData.lab.id = labid
    getApp().globalData.lab.rsv_id = rsvid
    const that = this
    that.updatelab();  
  },
  reject: function(e) {
    const labid = e.currentTarget.dataset.lid
    const index = e.currentTarget.dataset.uid
    const rsvid = this.data.rsv[index].rsv_id
    getApp().globalData.lab.id = labid
    getApp().globalData.lab.rsv_id = rsvid
    const that = this
    that.updatelabReject()
  },
  updateRsvReject: function () {
    const lab = getApp().globalData.lab
    const that = this
    wx.request({
      url: 'http://localhost:8080/test2/rsv/update/state/rsvid',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        aState: {
          state_id: '3'
        },
        rsv_id: lab.rsv_id
      },
      success: function (res) {
        if (res.data == "fail") {
          wx.showToast({
            title: '操作失败',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else if (res.data == "success") {
          setTimeout(() => {
            that.selectAll()
          }, 500)
        }
      }
    })
  },
  updatelabReject: function () {
    const lab = getApp().globalData.lab
    const user = getApp().globalData.user
    const that = this
    console.log(lab)
    console.log(user)
    wx.request({
      url: 'http://localhost:8080/test2/lab/update/state',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        lab_id: lab.id,
        aState: {
          state_id: '0'
        }
      },
      success: function (res) {
        if (res.data == "fail") {
          wx.showToast({
            title: '操作失败',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else if (res.data == "success") {
          wx.showToast({
            title: '操作成功',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => {
            wx.hideToast()
            that.updateRsvReject()
          }, 500)
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

    this.selectAll()
  }
})