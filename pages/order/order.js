// pages/order/order.js
let {fetchMovieDetail} = require('../../api/index')  //详情接口
let {fetchUserOrder} = require('../../api/user.js')  // 订单接口
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
 async onLoad(options) {
  let {data} = await  fetchUserOrder()
  let allData = data.map(item=>{
      return fetchMovieDetail(item.movieid)
  })
  let result =await Promise.all(allData)
  result=result.map((item,index)=>{
      item.data.movie.status= data[index].status
      item.data.movie.orderid = data[index].orderid
      item.data.movie.img =  item.data.movie.img.replace(/\w.h/g,'')
      return     item.data.movie;

  })
  this.setData({
    orderlist:result
  })
  console.log(this.data.orderlist);
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