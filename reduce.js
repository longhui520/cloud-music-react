function createStore(reducer,preloadedState){
  let curReducer = reducer
  let curState = preloadedState
  function getState(){
    return  curState
  }
  function dispatch(action){
    curState = curReducer(curState,action)
  }
  return {
    getState,
    dispatch
  }
}
function createStoreByenhancer(enhancer,reducer,preloadedState){
  return enhancer(createStore)(reducer,preloadedState)
}
function compose(...fns){
  if(fns.length === 0){
    return arg=>arg
  }
  if(fns.length==1){
    return fns[0]
  }
  return fns.reducer((a,b)=>(...args)=>a(b(...args)))
}
function applyMiddleWare(...middlewares){
  return createStore=>(...args)=>{
    let store = createStore(...args)
    let dispatch = ()=>{console.log("这个函数必须被修改")}
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
let a = next=>arg2=>{
  console.log(arg1,arg2,1)
  next()
}
let b = next=>arg2=>{
  console.log(arg1,arg2,2)
}
compose(a,b)