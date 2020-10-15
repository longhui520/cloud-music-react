import React from 'react'
import Horizen from '../../baseUI/horizen-item/'
import { categoryTypes,alphaTypes } from '../../api/config'
import { NavContainer,ListContainer,List,ListItem} from "./style";
import Scroll from '../../components/scroll/'
function Singers(){
  const [category,setCategory] = React.useState('')
  const [alpha,setAlpha] = React.useState('')
  const handleUpdateCategory = (val)=>{
    setCategory(val)
  }
  const handleUpdateAlpha = (val)=>{
    setAlpha(val)
  }
  const singerList = Array.apply(null,{length:10}).map(()=>{
    return {
      picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
      name: "隔壁老樊",
      accountId: 277313426,
    }
  })
  const renderSingerList = ()=>{
    return (
      <List>
        {
          singerList.map((item,index)=>{
            return (
              <ListItem key={item+index}>
                <div className="img_wrapper">
                  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
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
        <Scroll>
          { renderSingerList () }
        </Scroll>
      </ListContainer>
    </div>
    
  )
}
export default React.memo(Singers)