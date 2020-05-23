export const login = (ptoken,pname) =>({
  type:'LOGIN',
  value:{
    isLogin:true,
    token: ptoken,
    user: {
      name:pname
    }
  }
})

export const logout = () =>({
  type:'LOGIN',
  value:{
    isLogin:true,
    token: null,
    user: {
      name:""
    }
  }
})