import { combineReducers } from 'redux'

const test = (state=0,action) => {
  return state
}

const user = (state={name:'li hai'},action) => {
  return state
}

const reducer = combineReducers({
  test,
  user
})

export default reducer