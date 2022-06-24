// index.js
import {
    getcity,
    fetchWaitMovie,
    fetchHotMovie,
    fetchGoodsMovie
} from '../../api/index.js'
// 获取应用实例
const app = getApp()

Page({
    data: {
        city: '湖南',
        tabs: [{
                title: '热映'
            },
            {
                title: '待映'
            }
        ],
        activeTab: 0, //默认选中第一个
        islocation: true, //是否获取到定位信息
        movielist: [], //热映数据
        page: 1,
        pagesize: 20,
        movieDatalist:{}, // 分组待映列表
        praiseMovie:'',
        hostHigth: 900,
        triggered: true, //设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发
        hasMore:true,   //是否加载完毕
    },
onShow(){
    if(!this.data.islocation){
        this._getcity()
    }
},
    // 获取城市定位
    async _getcity() {
        let _this = this
        wx.getLocation({
            fail(err) {
                wx.showLoading({
                    title:err,
                })
                _this.setData({
                    islocation: false //获取不到定位改为false
                })
            },
            async success(res) {
                let {
                    result
                } = await getcity(res.latitude, res.longitude)
                _this.setData({
                    city: result.addressComponent.city,
                    islocation: true //获取到位置信息改为true
                })
            }
        })
    },


    //   热映
    async _fetchHotMovie(page,pagesize) {
        let result = await fetchHotMovie(page,pagesize)
        if(result.length<this.data.pagesize){
           this.data({
            hasMore:false
           })
           wx.showToast({
             title: '数据加载完毕',
           })
           return;
        }
        // 替换图片w.h为空
        result.forEach(item => {
            item.img = item.img.replace(/\w.h/, "")
        })
        // 拼接合并参数
        let dataList = [...this.data.movielist,...result]
        this.setData({
            movielist: dataList
        })

    },
    // 获取待映热映下标，显示不同内容
    onChange(e) {
        this.setData({
            activeTab: e.detail.index
        })
    },
    //   获取手机屏幕高度，固定tabs栏
    async getsystemInfo() {
        let _this = this
        wx.getSystemInfo({
            success: (result) => {
                _this.setData({
                    hostHigth: result.windowHeight
                })
            }

        })
    },

  async  onLoad() {
        this._getcity()
        this._fetchHotMovie(this.data.page, this.data.pagesize)
        this.getsystemInfo()
        // 待映分组数据，好评电影数据
   let result= await Promise.all([fetchWaitMovie(),fetchGoodsMovie()])
   let {movieList} = result[0]
   let htmlLst = result[1]
   htmlLst =  htmlLst.replace(/<img/g,'<img class="btn"')

   this.setData({
    praiseMovie:htmlLst
   })
let movieDatalist={}
movieList= movieList.map(item=>{
    if(movieDatalist[item.comingTitle]){
        movieDatalist[item.comingTitle].push(item)
    }else{
        movieDatalist[item.comingTitle]=[item]
    }
    return item;
})
this.setData({
    movieDatalist:movieDatalist
})
    },


    //   自定义下拉刷新
    onRefresh(){
        this.setData({
          page:1,
          movielist:[]
        })
        this._fetchHotMovie(this.data.page,this.data.pagesize)
        this.setData({
          triggered:false
        })
    
      },
    // 自定义上拉加载
    movieupdata(){
        if(!this.data.hasMore){
            return;
        }
        this.setData({
          page:this.data.page+1
        })
        this._fetchHotMovie(this.data.page,this.data.pagesize)
    },


    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })
    },
    getUserInfo(e) {
        // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})