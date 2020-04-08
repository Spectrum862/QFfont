import React,{Fragment,Component} from 'react'
import theme from '../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import {Container,Button,TextField,Typography, Link, Paper, Grid,Divider} from '@material-ui/core/'
import auth from '../firebase/index'
import {connect} from 'react-redux'

class Regis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            confirm:"",
            name:"",
            confirmCheck:false,
            confirmText:""
        }
        this.isLogin = props.isLogin
        if(this.isLogin) props.history.replace('/')
    }
    
    onChange = e =>{
        const {name,value} = e.target
        this.setState({
            [name]: value
        })
        
        // if(this.state.username==="") this.plsId
        // if(this.state.password==="") this.plsPass
    }  

    register() {
        const {username,password,name} = this.state
        auth.createUserWithEmailAndPassword(username, password)
        .then(respond=>{
            if(respond) auth.currentUser.updateProfile({displayName: name}) 
        })
        .catch(
            error=>console.log(error)
        )
	}

    onSubmit=(e)=>{
        e.preventDefault()
        if(!this.isnotEqua()) this.register()
    }
    
    isnotEqua =()=>{
        const {password,confirm} = this.state
        const result = !(password===confirm)
        this.setState({confirmCheck:result})
        if(result) this.setState({confirmText:'Confirm Password Incorrect'})
        else this.setState({confirmText:""})
        return result
    }

    

    render(){

        return(
        
            <Container maxWidth="xs">
                <ThemeProvider theme={theme}>
                    <Paper elevation={0} className='margintop1'>                 
                        <Link href='\' underline='none' color='inherit'> <Typography variant='h2' align='center'>HOTELER</Typography></Link>
                        <Divider></Divider>
                        <Typography variant='h5' align='center'>Sign up</Typography> 
                        <form onSubmit={this.onSubmit}>
                            <TextField name='username' label="Email" fullWidth variant="outlined" margin="normal" required onChange={this.onChange}/>
                            <TextField name= 'password'label="Password" fullWidth type='password' variant="outlined" margin="normal" required onChange={this.onChange}/>
                            <TextField 
                                error={this.state.confirmCheck} helperText={this.state.confirmText} name= 'confirm'label="Confirm Password" fullWidth type='password' variant="outlined" margin="normal" required onChange={this.onChange} onBlur={this.isnotEqua}/>
                            <TextField name='name' label="Name" fullWidth variant="outlined" margin="normal" required onChange={this.onChange}/>
                            <Button className='margintop2' type="submit" variant="contained" color='primary' fullWidth >Sign in</Button>
                        </form>
                        <Grid container className="margintop3">
                            <Grid item xs>

                            </Grid>
                            <Grid item>
                            <Link href="/login" variant="body2">
                                {"Already have an account? Sign In"}
                            </Link>
                            </Grid>
                        </Grid>
                    </Paper>      

                </ThemeProvider>
            </Container>           
        )
    }
}
const mapStateToProps = function(state) {
    return {
      message: 'This is message from mapStateToProps',
      isLogin : state.session.isLogin
    }
}

const AppWithConnect = connect(mapStateToProps)(Regis)
export default AppWithConnect
