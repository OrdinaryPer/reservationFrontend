// pages/user/profile/update/update.js
Page({
  data: {
  },
  submit: function(e) {
    const value = e.detail.value
    const user = getApp().globalData.user
    console.log(value)
    console.log(user)
    if (value.old.trim() == '' || value.new1.trim() == '' || 
      value.new2.trim() == '') {
        wx.showToast({
          title: '不能为空',
          icon: 'loading',
          duration: 500
        })
        setTimeout(() => wx.hideToast(), 500)
      } else if (value.new1 != value.new2) {
        wx.showToast({
          title: '密码不一致',
          icon: 'loading',
          duration: 500
        })
        setTimeout(() => wx.hideToast(), 500)
      } else if (value.old != user.user_password){
        wx.showToast({
          title: '旧密码错误',
          icon: 'loading',
          duration: 500
        })
        setTimeout(() => wx.hideToast(), 500)
      } else {
        wx.request({
          url: 'http://localhost:8080/test2/user/update',
          header: {
            "Content-Type": "application/json"
          },
          method: "POST",
          data: {
            user_id: user.user_id,
            user_password: value.new1
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
                title: '修改成功',
                icon: 'loading',
                duration: 500
              })
              setTimeout(() => {
                wx.hideToast()
                wx.switchTab({
                  url: '../profile',
                })
              }, 500)
            }
          }
        })
      }
  }
})