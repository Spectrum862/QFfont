import { combineReducers } from 'redux'
import session from './session'
import profile from './profile'

export default combineReducers({
    session,
    profile
})