Component({
  data: {
    selected: null,
    color: "gray",
    selectedColor: "#000",
    list: []
  },
  lifetimes: {
    attached() {
      this.setData({
        list: getApp().globalData.list
      })
    },
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const path = data.path
      wx.switchTab({
        url: path,
      })
    }
  }
})