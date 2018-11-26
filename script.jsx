const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}
//将state保存在变量中， getState返回当前变量的值，
//getState与单个对象上的dispatch函数项结合， subscribe就是reudx 的store
const { createStore } = (reducer) => {
    let state
    let listeners = []
    const getState = () => state
    //dispatch是更改内部状态的唯一办法
    //每次更新state之后，都要通知时间监听器调用
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }
    //因为subscribe可以多次调用， 所以需要追踪所有的事件监听，将新的事件监听送入数组中，
    const subscribe = (listener) => {
        listeners.push(listener)
        return ()=> {
            listeners = listeners.filter(l => l!== listener)
        }
    }
    dispatch({})
    return {getState, dispatch, subscribe}
}


const store = createStore(counter)
const render = () => {
    document.body.innerText = store.getState()
}

store.subscribe(render)
render()

document.addEventListener('click', ()=> {
    store.dispatch({ type: 'INCREMENT'})
})
