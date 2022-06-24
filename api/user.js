const {request} = require("./request")
const API_URL = 'https://maoyanapi.w0824.com';
//登录
exports.fetchWxLogin = function(code){
    let url=`${API_URL}/wxlogin`
    return request({
        method:"POST",
        url,
        data:{
            code
        }
    })
}

// 获取支付所需openid
exports.fetchGetOpenid = function(code){
    let url=`${API_URL}/getOpenid`
    return request({
        method:"POST",
        url,
        data:{
            code
        }
    })
}

//支付接口
exports.fetchPayOrder = function(movieid,openid){
    let url=`${API_URL}/wxpay`
    return request({
        method:"POST",
        url,
        data:{
            movieid,openid
        }
    })
}

//获取订单接口
exports.fetchUserOrder = function(){
    let url=`${API_URL}/userOrder`
    return request({
        url
    })
}


// 获取用户的订单
exports.fetchUserOrder = function(){
    let url=`${API_URL}/userOrder`
    return request({
        url
    })
}