const {request} = require("./request")
const API_URL = 'https://maoyanapi.w0824.com';
// 获取城市定位
exports.getcity = function(latitude,longitude){
        var url = `http://api.map.baidu.com/geocoder/v2/?location=${latitude},${longitude}&output=json&ak=WEc8RlPXzSifaq9RHxE1WW7lRKgbid6Y`
  return   request({
          url
  })
}
// 待映
exports.fetchWaitMovie = function(){
  return request({
      url:`https://m.maoyan.com/ajax/movieOnInfoList`
  })
}
// 获取好评电影
exports.fetchGoodsMovie = function(){
    return request({
        url:`https://m.maoyan.com/ajax/topRatedMovies`
    })
}
// 热映
exports.fetchHotMovie  =  function(page,pagesize){
  return request({
    url:`${API_URL}/comingList?page=${page}&pagesize=${pagesize}`
  })
}
// 获取电影详情
exports.fetchMovieDetail = function(id){
    return request({
        url:`https://m.maoyan.com/api/mtrade/mmdb/movie/v5/${id}.json`
    })
}
// 点击加入用户想看的电影
exports.fetchUpdSeeMovie = function(movieid){
    return request({
        method:"POST",
        url:`${API_URL}/updSeeMovie`,
        data:{
            movieid
        }
    })
}

// 获取用户想看的电影
exports.fetchUserSeeMovie = function(movieid){
    return request({
        url:`${API_URL}/seeMovie`
    })
}
