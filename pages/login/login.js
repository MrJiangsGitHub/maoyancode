// pages/login/login.js
let  {fetchWxLogin} =require('../../api/user.js') ;
// const {wxApiPromisify}= require('../../utils/util.js');
// const {wxlogin}= require('../../utils/login.js');
// let wxloginApi = wxApiPromisify(wxlogin)
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
 postLogin(){

  wx.login({
  success:async ( res)=>{
      let {code} = res
       let {openid,token}= await fetchWxLogin(code)
     wx.setStorageSync('openid', openid)
     wx.setStorageSync('token', token)
     wx.showToast({
       title: '登录成功',
     })
     wx.switchTab({
        url: '/pages/index/index',
    })
    }
  })
     

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})