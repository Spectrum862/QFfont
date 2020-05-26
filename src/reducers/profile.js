export default (state=null,action)=>{
    switch(action.type){
        case 'LOADPROFILE':
            return action.value
        case 'CLAERPROFILE':
            return action.value
        default:
            return state
    }

}