import * as constants from './constants'
import {getAlbumDetailRequest} from '../../../api/request'
import {fromJS} from 'immutable'
export const changeCurrentAlbum = data=>({
    type:constants.CHANGE_CURRENT_ALBUM,
    data:fromJS(data)
})
export const changePullupLoading = data=>({
    type:constants.CHANGE_PULLUP_LOADING,
    data
})
export const changeEnterLoading = data=>({
    type:constants.CHANGE_ENTER_LOADING,
    data
})
export const changeTotalCount = data=>({
    type:constants.CHANGE_TOTAL_COUNT,
    data
})
export const changeStartIndex = data=>({
    type:constants.CAHNGE_START_INDEX,
    data
})

export const getAlbumList = id=>{
    return dispatch=>{
        getAlbumDetailRequest(id).then(res=>{
            const data = res.playlist
            dispatch(changeCurrentAlbum(data))
            dispatch(changeEnterLoading(false))
            dispatch(changeStartIndex(0))
            dispatch(changeTotalCount(data.tracks.length))
        }).catch(err=>{
            console.error(err)
            console.log("获取album数据失败!")
        })
    }
}