const init_state = {
    isLogin:false,
    token:null,
    user:{
        name:""
    }
}

export default (state=init_state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return action.value
        case 'LOGOUT':
            return action.value
        default:
            return state
    }

}