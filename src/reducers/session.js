const init_state = {
    isLogin:false,
    token:null,
    user:{
        username: "",
        first_name: "",
        last_name: "",
        user_type: null
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