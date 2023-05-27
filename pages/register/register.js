// pages/register/register.js
Page({
  submit: function(e) {
    const value = e.detail.value;
    var exp = /^[1][3,4,5,7,8][0-9]{9}$/
    console.log(value)
    if (value.username.trim() == '' || value.pwd.trim() == '' ||
      value.pwd2.trim() == '' || value.name.trim() == '' || value.phone.trim() == '') {
      wx.showToast({
        title: '不能为空',
        icon: 'loading',
        duration: 500
      })
      setTimeout(() => wx.hideToast(), 500)
    } else if (value.username.length >= 15) {
      wx.showToast({
        title: '用户名长度太长',
        icon: 'loading',
        duration: 500
      })
      setTimeout(() => wx.hideToast(), 500)
    } else if (value.pwd.length >= 15) {
      wx.showToast({
        title: '密码长度太长',
        icon: 'loading',
        duration: 500
      })
      setTimeout(() => wx.hideToast(), 500)
    } else if (value.pwd != value.pwd2) {
      wx.showToast({
        title: '密码不一致',
        icon: 'loading',
        duration: 500
      })
      setTimeout(() => wx.hideToast(), 500)
    } else if (!exp.test(value.phone)) {
      wx.showToast({
        title: '号码格式错误',
        icon: 'loading',
        duration: 500
      })
      setTimeout(() => wx.hideToast(), 500)
    } else {
      wx.request({
        url: 'http://localhost:8080/test2/user/register',
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data: {
          user_username: value.username,
          user_password: value.pwd,
          user_name: value.name,
          user_phone: value.phone,
          user_auth: '1'
        },
        success: function(res) {
          if (res.data == 'success') {
            wx.showToast({
              title: '注册成功',
              icon: 'loading',
              duration: 500
            })
            setTimeout(() => {
              wx.hideToast()
              wx.redirectTo({
                url: '../login/login',
              })
            }, 500)
          // the username repeat is ignored  
          } else {
            wx.showToast({
              title: '注册失败',
              icon: 'loading',
              duration: 500
            })
            setTimeout(() => wx.hideToast(), 500)
          }
        }
      })
    } 
  }
})