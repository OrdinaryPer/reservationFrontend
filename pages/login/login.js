// pages/login/login.js
Page({
  register: function() {
    wx.redirectTo({
      url: '../register/register',
    })
  },
  submit: function(e) {
    const value = e.detail.value
    if (value.username.trim() == '' || value.pwd.trim() == '') {
      wx.showToast({
        title: '不能为空',
        icon: 'loading',
        duration: 500
      })
      setTimeout(() => wx.hideToast(), 500)
    } else if (value.username.length >= 15 || value.pwd.length >= 15) {
      wx.showToast({
        title: '输入超出长度限制',
        icon: 'loading',
        duration: 500
      })
      setTimeout(() => wx.hideToast(), 500)
    } else {
      wx.request({
        url: 'http://localhost:8080/test2/user/login',
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data: {
          user_username: value.username,
          user_password: value.pwd,
        },
        success: function(res) {
          if (res.data == 'fail') {
            wx.showToast({
              title: '登录失败',
              icon: 'loading',
              duration: 500
            })
            setTimeout(() => wx.hideToast(), 500)
          } else if (!res.data.user_auth) {
            wx.showToast({
              title: '密码错误',
              icon: 'loading',
              duration: 500
            })
            setTimeout(() => wx.hideToast(), 500)
          } else {
            getApp().globalData.user = res.data
            console.log(res.data)
            if (res.data.user_auth == "1") {
              getApp().globalData.list = [{
                    "pagePath": "../apply/apply",
                    "iconPath": "/img/apply.png",
                    "selectedIconPath": "/img/apply_act.png",
                    "text": "申请"
                  },
                  {
                    "pagePath": "../query/query",
                    "iconPath": "/img/query.png",
                    "selectedIconPath": "/img/query_act.png",
                    "text": "查询"
                  },
                  {
                    "pagePath": "../profile/profile",
                    "iconPath": "/img/profile.png",
                    "selectedIconPath": "/img/profile_act.png",
                    "text": "我的"
                  }
                ]
                wx.switchTab({
                  url: '../user/apply/apply',
                })
                
            } else if (res.data.user_auth == '0') {
              getApp().globalData.list = [{
                    "pagePath": "../approve/approve",
                    "iconPath": "/img/approve.png",
                    "selectedIconPath": "/img/approve_act.png",
                    "text": "审批"
                  },
                  {
                    "pagePath": "../lab/lab",
                    "iconPath": "/img/lab.png",
                    "selectedIconPath": "/img/lab_act.png",
                    "text": "实验室"
                  }
                ],
                wx.switchTab({
                  url: '../admin/approve/approve',
                })
            }
          }
        }
      })
    }
  },
  userJump: function() {
    getApp().globalData.list = [{
          "pagePath": "../apply/apply",
          "iconPath": "/img/apply.png",
          "selectedIconPath": "/img/apply_act.png",
          "text": "申请"
        },
        {
          "pagePath": "../query/query",
          "iconPath": "/img/query.png",
          "selectedIconPath": "/img/query_act.png",
          "text": "查询"
        },
        {
          "pagePath": "../profile/profile",
          "iconPath": "/img/profile.png",
          "selectedIconPath": "/img/profile_act.png",
          "text": "我的"
        }
      ],
      wx.switchTab({
        url: '../user/apply/apply',
      })
  },
  admin: function() {
    getApp().globalData.list = [{
          "pagePath": "../approve/approve",
          "iconPath": "/img/approve.png",
          "selectedIconPath": "/img/approve_act.png",
          "text": "审批"
        },
        {
          "pagePath": "../lab/lab",
          "iconPath": "/img/lab.png",
          "selectedIconPath": "/img/lab_act.png",
          "text": "实验室"
        }
      ],
      wx.switchTab({
        url: '../admin/approve/approve',
      })
  }
})