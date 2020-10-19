import axiosInstance from './config'
// 首页banner轮播图
export const getBannerRequest = ()=>{
    return axiosInstance.get("/banner")
}
// 推荐列表
export const getRecommendListRequest = ()=>{
    return axiosInstance.get("/personalized")
}
// 热点歌手
export const getHotSingerListRequest = (count) => {
    return axiosInstance.get(`/top/artists?offset=${count}`);
}
//歌手列表
export const getSingerListRequest= (category, alpha, count) => {
    return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}
export const getRankListRequest = () => {
    return axiosInstance.get (`/toplist/detail`);
};
