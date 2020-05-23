export const login = (ptoken,puser) =>({
  type:'LOGIN',
  value:{
    isLogin:true,
    token:ptoken,
    user:{
        username: puser.username,
        first_name:puser.first_name,
        last_name: puser.last_name,
        user_type: puser.user_type
    }
  }
})

export const logout = () =>({
  type:'LOGIN',
  value:{
    isLogin:false,
    token: null,
    user:{
        username: "",
        first_name: "",
        last_name: "",
        user_type: null
    }
  }
})