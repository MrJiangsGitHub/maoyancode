exports.request = function (options) {
    return new Promise((resolve, rejects) => {
        wx.showLoading({
            title: '加载中。。。。',
            icon: "done"
        })
        let dataInfo = {
            ...options,
            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                wx.showLoading({
                    title: '网络错误',
                    icon: "error"
                })
                rejects(err)
            },
            complete(res) {
                // 关闭loding
                wx.hideLoading()
                let {
                    errcode
                } = res.data
                if (errcode == 40001) {
                    wx.showToast({
                        title: '请重新登录',
                    })
                    wx.navigateTo({
                        url: '/pages/login/login',
                    })
                }

            }
        }
        // 获取token，携带到请求头authorization中
        let token = wx.getStorageSync('token')
        if (token) {
            dataInfo.header = {
                authorization: token
            }
        }
        wx.request(dataInfo)
    })
}