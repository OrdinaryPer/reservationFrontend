// pages/admin/lab/add/add.js
Page({
  data: {
    lab: null
  },
selectAllPlace() {
  const that = this
  wx.request({
    url: 'http://localhost:8080/test2/lab/place',
    header: {
      "Content-Type": "application/json"
    },
    method: "GET",
    success: function(res) {
      if (res.data == "fail") {
        wx.showToast({
          title: '查询位置失败',
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
    const detail = e.detail.value.detail
    const place = e.detail.value.place
    if (name.trim() == '' || place.trim() == '') {
      wx.showToast({
        title: '不能为空',
        icon: 'loading',
        duration: 500
      })
      setTimeout(() => wx.hideToast(), 500)
    } else {
      this.selectAllPlace()
      setTimeout(() => {
        if (this.data.lab != null) {
           const lab = this.data.lab
           for (let i = 0; i < lab.length; i++) {
             if (lab[i].lab_place == place) {
               wx.showToast({
                 title: '位置重复',
                 icon: 'loading',
                 duration: 500
               })
               setTimeout(() => wx.hideToast(), 500)
             }
           }
    wx.request({
      url: 'http://localhost:8080/test2/lab/add',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      data: {
        lab_name: name,
        lab_detail: detail,
        lab_place: place
      },
      success: function(res) {
        if (res.data == "fail") {
          wx.showToast({
            title: '添加失败',
          })
        } else if (res.data == "success") {
          wx.showToast({
            title: '添加成功',
            icon: 'loading',
            duration: 500
          })
          setTimeout(() => {
            wx.hideToast()
            wx.switchTab({
              url: '../lab',
            })
          }, 500)
        }
      }
    })
        } 
      },1000)
    }
  }
})