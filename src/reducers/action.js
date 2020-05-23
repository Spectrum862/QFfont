export const login = (ptoken,puser) =>({
  type:'LOGIN',
  value:{
    isLogin:false,
    token:ptoken,
    user:{
        username: puser[0],
        first_name:puser[1],
        last_name: puser[2],
        user_type: puser[3]
    }
  }
})

export const logout = () =>({
  type:'LOGIN',
  value:{
    isLogin:true,
    token: null,
    user:{
        username: "",
        first_name: "",
        last_name: "",
        user_type: null
    }
  }
})