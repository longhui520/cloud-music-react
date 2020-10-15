import React from 'react'
import Horizen from '../../baseUI/horizen-item/'
import { categoryTypes,alphaTypes } from '../../api/config'
import { NavContainer} from "./style";
function Singers(){
  const [category,setCategory] = React.useState('')
  const [alpha,setAlpha] = React.useState('')
  const handleUpdateCategory = (val)=>{
    setCategory(val)
  }
  const handleUpdateAlpha = (val)=>{
    setAlpha(val)
  }
  return (
    <NavContainer>
      <Horizen list={categoryTypes} title={"分类 (默认热门):"} oldVal={category} handleClick={handleUpdateCategory} ></Horizen>
      <Horizen list={alphaTypes} title={"首字母:"} oldVal={alpha} handleClick={handleUpdateAlpha}></Horizen>
    </NavContainer>
  )
}
export default React.memo(Singers)