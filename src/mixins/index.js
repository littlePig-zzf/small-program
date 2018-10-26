export default {
  methods: {
    showModal () {
      this.showAlert = true
    },
    showToast (msg) {
      wx.showToast({
        title: msg,
        icon: 'none'
      })
    },
    shareMessage () {
      return {
        title: '步数猫',
        path: `/pages/index/main?inviteCode=${this.$store.state.inviteCode}`
      }
    }
  }

}
