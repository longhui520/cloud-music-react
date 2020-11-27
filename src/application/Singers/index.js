import React from 'react'
import Horizen from '../../baseUI/horizen-item/'
import { categoryTypes,alphaTypes } from '../../api/config'
import { NavContainer,ListContainer,List,ListItem} from "./style";
import Scroll from '../../baseUI/scroll'
import {connect} from 'react-redux'
import LazyLoad, {forceCheck} from 'react-lazyload';
import { 
  getHotSingerList,
  getSingerList,
  changeEnterLoading, 
  changePageCount, 
  refreshMoreSingerList, 
  changePullUpLoading, 
  changePullDownLoading, 
  refreshMoreHotSingerList  
} from './store/actionCreators';
import Loading from '../../baseUI/loading';
import {CategoryDataContext,CHANGE_CATEGORY,CHANGE_ALPHA} from './data'
function Singers(props){
  // const [category,setCategory] = React.useState('')
  // const [alpha,setAlpha] = React.useState('')
  const {data,dispatch} = React.useContext(CategoryDataContext)
  const {category,alpha} = data.toJS()
  const {singerList,enterLoading,pullUpLoading,pullDownLoading,pageCount} = props
  const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;
  React.useEffect(()=>{
    getHotSingerDispatch()
    // eslint-disable-next-line  
  },[])
  const handleUpdateCategory = (val)=>{
    // setCategory(val)
    dispatch({type:CHANGE_CATEGORY,data:val})
    updateDispatch(category,val)
  }
  const handleUpdateAlpha = (val)=>{
    // setAlpha(val)
    dispatch({type:CHANGE_ALPHA,data:val})
    updateDispatch(category,val)
  }
  const handlePullUp = ()=>{
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  }
  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  }
  const renderSingerList = ()=>{
    return (
      <List>
        {
          singerList.toJS().map((item,index)=>{
            return (
              <ListItem key={item+index}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('../../assets/images/singer.png')} alt="music"/>}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }


  return (
    <div>
      <NavContainer>
        <Horizen list={categoryTypes} title={"分类 (默认热门):"} oldVal={category} handleClick={handleUpdateCategory} ></Horizen>
        <Horizen list={alphaTypes} title={"首字母:"} oldVal={alpha} handleClick={handleUpdateAlpha}></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          { renderSingerList () }
        </Scroll>
        { enterLoading?(<Loading></Loading>):""} 
      </ListContainer>
    </div>
    
  )
}
const mapStateToProps = (state)=>({
  singerList:state.getIn(['singers','singerList']),
  enterLoading:state.getIn(['singers','enterLoading']),
  pullUpLoading:state.getIn(['singers','pullUpLoading']),
  pullDownLoading:state.getIn(['singers','pullDownLoading']),
  pageCount:state.getIn(['singers','pageCount'])
})
const mapDispatchToProps = (dispatch)=>({
  getHotSingerDispatch(){
    dispatch(getHotSingerList())
  },
  updateDispatch(category,alpha){
    dispatch(changePageCount(0))
    dispatch(changeEnterLoading(true))
    dispatch(getSingerList(category,alpha))
  },
  pullUpRefreshDispatch(category,alpha,hot,count){
    dispatch(changePullUpLoading(true))
    dispatch(changePageCount(count+1))
    if(hot){
      dispatch(refreshMoreHotSingerList())
    } else{
      dispatch(refreshMoreSingerList(category,alpha))
    }
  },
  pullDownRefreshDispatch(category,alpha){
    dispatch(changePullDownLoading(true))
    dispatch(changePageCount(0))
    if(category === '' && alpha === ''){
      dispatch(getHotSingerList())
    }else {
      dispatch(getSingerList(category,alpha))
    }
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Singers))