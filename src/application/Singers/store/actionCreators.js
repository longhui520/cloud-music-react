import {getHotSingerListRequest,getSingerListRequest} from '../../../api/request'
import * as actionTypes from './constants'
import {fromJS} from 'immutable'

const changeSingerList = data=>({
    type:actionTypes.CHANGE_SINGER_LIST,
    data:fromJS(data)
})

const changePageCount = data=>({
    type:actionTypes.changePageCount,
    data:fromJS(data)
})
const changeEnterLoading = data=>({
    type:actionTypes.CHANGE_ENTER_LOADING,
    data
})
const changePullUpLoading = data=>({
    type:actionTypes.CHANGE_PULLDOWN_LOADING,
    data
})
const changePullDownLoading = data=({
    type:actionTypes.CHANGE_PULLDOWN_LOADING,
    data
})
// 第一次加载热门歌手
export const getHotSingerList = () =>{
    return (dispatch)=>{
        getHotSingerListRequest(0).then(res=>{
            const data = res.data
            dispatch(changeSingerList(data))
            dispatch(changeEnterLoading(false))
            dispatch(changePullDownLoading(false))
        }).catch(()=>{
            console.log('热门歌手数据获取失败')
        })
    }
}
// 加载更多歌手
export const refreshMoreSingerList = ()=>{
    return (dispatch,getState)=>{
        const pageCount = getState().getIn(['singers','pageCount'])
        const singerList = getState().getIn(['singer','singerList']).toJS()
        getHotSingerListRequest(pageCount).then(res=>{
            const data = [...singerList,...res.singerList]
            dispatch(changeSingerList(data))
            dispatch(changePullUpLoading(false))
        }).catch(()=>{
            console.log('热门歌手数据获取失败')
        })
    }
}

// 第一次加载对应类别的歌手
export const getSingerList = (category,alpha) =>{
    return (dispatch)=>{
        getSingerListRequest(category,alpha,0).then(res=>{
            const data = res.artists
            dispatch(changeSingerList(data))
            dispatch(changeEnterLoading(false))
            dispatch(changePullDownLoading(false))
        }).catch(()=>{
            console.log('热门歌手数据获取失败')
        })
    }
}