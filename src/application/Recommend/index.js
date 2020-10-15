import React from 'react'
import Slider from '../../components/slider'
import RecommendList from '../../components/recommendList'
import Scroll from '../../components/scroll'
import {Content} from './style'
import {getBannerList,getRecommendList} from './store/actionCreators'
import { connect } from "react-redux"
import { forceCheck } from 'react-lazyload';
import Loading from '../../baseUI/loading/';
function Recommend(props){
  const {bannerList,recommendList,enterLoading} = props
  const {getBannerDataDispatch,getRecommendListDataDispatch} = props
  React.useEffect(()=>{
    if(!bannerList.size){
      getBannerDataDispatch()
    }
    if(!recommendList.size){
      getRecommendListDataDispatch()
    } 
  },[bannerList.size,recommendList.size,getBannerDataDispatch,getRecommendListDataDispatch])
  const bannerListJS = bannerList ? bannerList.toJS () : [];
  const recommendListJS = recommendList ? recommendList.toJS () :[];
  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading?(<Loading />):null}
    </Content>
  )
}
const mapStateToProps = (state)=>({
  bannerList:state.getIn(['recommend','bannerList']),
  recommendList:state.getIn(['recommend','recommendList']),
  enterLoading:state.getIn(['recommend','enterLoading'])
})
const mapDispatchToProps = (dispatch)=>({
  getBannerDataDispatch(){
    dispatch(getBannerList())
  },
  getRecommendListDataDispatch (){
    dispatch(getRecommendList())
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Recommend))