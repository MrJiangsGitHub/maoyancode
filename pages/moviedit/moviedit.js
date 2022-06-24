// pages/moviedit/moviedit.js
import {
    fetchMovieDetail,fetchUpdSeeMovie
} from '../../api/index'
import {
    fetchPayOrder
} from '../../api/user'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movieData: {},
        id: '',
        value: 5,
        value4: 4,
        value3: 3,
        value2: 2,
        value1: 1,
        texts: '展开',
        limit_class: true, //简介的展开收起
        isSee:false  //想看的爱心颜色
    },
// 加入想看
async look(){
 let {errcode,message} =  await  fetchUpdSeeMovie(this.options.id)
 if(!errcode==200){
     wx.showToast({
       title: message,
     })
 }else{
    wx.showToast({
      title: message,
    })
    this.setData({
        isSee:true
    })
 }
},
    showAllDesc() {
        if (!this.data.limit_class) {
            this.setData({
                texts: '收起'
            })
        } else {
            this.setData({
                texts: '展开'
            })
        }
        this.setData({
            limit_class: !this.data.limit_class
        })

    },
    onChange(event) {
        this.setData({
            value: event.detail,
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        wx.setNavigationBarTitle({
            title: '电影详情',
        })
        let {
            id
        } = this.options.id
        this.setData({
            id
        })
        let {
            data
        } = await fetchMovieDetail(options.id)
        wx.setNavigationBarColor({
            backgroundColor: data.movie.backgroundColor,
            frontColor: "#ffffff"
        })
        data.movie.img = data.movie.img.replace(/\w.h/g, '')
        data.movie.photos = data.movie.photos.map(item => {
            item = item.replace(/\/w\.h/, '')
            return item;
        })
        this.setData({
            movieData: data.movie
        })
        console.log(this.data.movieData);
        // wx.setBackgroundColor({
        //   backgroundColor: 'backgroundColor',
        // })
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

    },
    async pay() {
        let openid = wx.getStorageSync('openid')
        if (!openid) {
            wx.navigateTo({
                url: '/pages/login/login',
            })
            return;
        }
try {
    let goodspay = await fetchPayOrder(this.options.id, openid)
    console.log(goodspay.result.xml);
    let {mypackage,nonce_str,paySign,timeStamp,sign_type}=goodspay.result.xml
    wx.requestPayment({
      nonceStr: nonce_str,
      package: mypackage,
      paySign: paySign,
      timeStamp: timeStamp,
      signType:sign_type,
      complete(){
          wx.navigateTo({
            url: '/pages/order/order',
          })
      }
    })
} catch (error) {
    wx.showToast({
      title: error.message,
    })
}

    },
})