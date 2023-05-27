// pages/admin/lab/update/update.js
Page({
  data: {
    lab: {},
    state: [
      {
        name: '0',
        value: '空闲'
      },
      {
        name: '1',
        value: ''
      }
    ]
  },
  submit: function(e) {
    const name = e.detail.value.name
    const place = e.detail.value.place
    const detail = e.detail.value.detail
    const id = this.data.lab[0].lab_id
    wx.request({
      url: 'http://localhost:8080/test2/lab/update/id',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        lab_id: id,
        lab_name: name,
        lab_detail: detail,
        lab_place: place
      },
      success: function(res) {
        if (res.data == "fail") {
          wx.showToast({
            title: '修改失败',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => wx.hideToast(), 500)
        } else if (res.data == "success") {
          wx.showToast({
            title: '修改成功',
            icon: 'loading',
            duration: 500
          })
          setTimeout(()=> {
            wx.hideToast()
            wx.switchTab({
              url: '../lab',
            })
          },500)
        }
      }
    })
  },
  onShow: function () {
    this.setData({
      lab: getApp().globalData.lab
    })
  }
})