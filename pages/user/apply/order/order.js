// pages/user/apply/order/order.js
Page({
  data: {
    date: {
    },
    time: {
    }
  },
  dateStart: function(e) {
    const start = e.detail.value
    console.log(start)
    this.setData({
      'date.start': start
    })
    console.log(this.data.date)
  },
  timeStart: function(e) {
    const start = e.detail.value
    this.setData({
      'time.start': start
    })
    console.log(this.data.time)
  },
  dateEnd: function(e) {
    const end = e.detail.value
    this.setData({
      'date.end': end
    })
  },
  timeEnd: function(e) {
    const end = e.detail.value
    this.setData({
      'time.end': end
    })
  },
updatersv: function() {
  const user = getApp().globalData.user
  const that = this
  console.log(user)
  wx.request({
    url: 'http://localhost:8080/test2/rsv/update/state',
    header: {
      "Content-Type": "application/json"
    },
    method: "POST",
    data: {
      aUser: {
        user_id: user.user_id
      },
      aLab: {
        lab_id: user.labId,
      },
      aState: {
        state_id: '1'
      }
    },
    success: function (res) {
      if (res.data == "fail") {
        wx.showToast({
          title: '预约失败',
          icon: 'loading',
          duration: 500
        })
        setTimeout(() => wx.hideToast(), 500)
      } else if (res.data == "success") {
        that.updatelab()
      }
    }
  })
},
updatelab: function() {
  const user = getApp().globalData.user
  wx.request({
    url: 'http://localhost:8080/test2/lab/update/state',
    header: {
      "Content-Type": "application/json"
    },
    method: "POST",
    data: {
        lab_id: user.labId,
      aState: {
        state_id: '1'
      }
    },
    success: function (res) {
      if (res.data == "fail") {
        wx.showToast({
          title: '预约失败',
          icon: 'loading',
          duration: 500
        })
        setTimeout(() => wx.hideToast(), 500)
      } else if (res.data == "success") {
        wx.showToast({
          title: '预约成功',
          icon: 'loading',
          duration: 500
        })
        setTimeout(() => {
          wx.hideToast()
          wx.switchTab({
            url: '../apply',
          })
        }, 500)
      }
    }
  })
},
  order: function(e) {
    const date = this.data.date
    const time = this.data.time
    const that = this
    if (date.start == null || date.end == null || time.start == null ||
      time.end == null) {
      wx.showToast({
        title: '所有选项必选',
        icon: 'loading',
        duration: 500
      })
      setTimeout(() => wx.hideToast(), 500)
    } else if (date.start > date.end) {
      wx.showToast({
        title: '日期选择错误',
        icon: 'loading',
        duration: 500
      })
      setTimeout(() => wx.hideToast(), 500)
    } else if ((date.start == date.end) && (time.start >= time.end)) {
      wx.showToast({
        title: '时间选择错误',
        icon: 'loading',
        duration: 500
      })
      setTimeout(() => wx.hideToast(), 500)
    } else {
      const user = getApp().globalData.user
      const start = this.data.date.start + " " + this.data.time.start + ":00"
      const end = this.data.date.end + " " + this.data.time.end + ":00"
      console.log(user)

      wx.request({
        url: 'http://localhost:8080/test2/reserve/add',
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data: {
          user_id: user.user_id,
          lab_id: user.labId,
          start_time: start,
          end_time: end
        },
        success: function(res) {
          if (res.data == "fail") {
            wx.showToast({
              title: '预约失败',
              icon: 'loading',
              duration: 500
            })
            setTimeout(() => wx.hideToast(), 500)
          } else if (res.data == "success") {
            that.updatersv()
          }
        }
      })

    }
  }
})