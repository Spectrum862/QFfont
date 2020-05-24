import React,{Component} from 'react'
import theme from '../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import {Container,Button,TextField, Link, Paper, Grid, CircularProgress,Snackbar} from '@material-ui/core/'
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import Axios from 'axios';
import { login } from '../reducers/action';
import Server from '../serverconfig'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            errmessage:"",
            loading:false,
            snackbar:false
        }
        this.dispatch = this.props.dispatch
    }
    

    onChange = e =>{
        const {name,value} = e.target
        this.setState({
            [name]: value
        })
    }  

    onSubmit = (e) =>{
        e.preventDefault()
        this.auth()
    }

    auth = () =>{
        this.setState({ loading: true });
        const data = {
            username : this.state.username,
            password : this.state.password,          
        }
        const url = `${Server.url}api/auth/login`
        Axios.post(url,data)
            .then(respond =>{
                this.setState({loading:false})
                this.dispatch(login(respond.data.token,respond.data.user))
                this.props.history.replace('/home')
                
            })
            .catch(error=>{
                this.setState({loading:false,snackbar:true,errmessage:error.response.data.non_field_errors[0]})            
            })

    }

    isNull =()=> this.state.username===""||this.state.password===""

    handleClose = (event, reason) => {
        this.setState({snackbar:false})
    }

    render(){
        
        return(
            
            <div className='fullscreenBG'>
                <Container maxWidth="xs" className='paddingtop1'>
                    <ThemeProvider theme={theme}>
                        <Paper elevation={0} style={{backgroundColor:'transparent'}} >                 
                            <img src='./static/media/Logo.png' width='100%'></img>
                            <form  onSubmit={this.onSubmit}>
                                <TextField name='username' label="Username" fullWidth variant="outlined" margin="normal" required onChange={this.onChange}/>
                                <TextField name= 'password'label="Password" fullWidth type='password' variant="outlined" margin="normal" required onChange={this.onChange}/>
                                <Button type='submit'className='margintop2' variant="contained" color='primary' fullWidth disabled={this.isNull()}>
                                    {this.state.loading && <CircularProgress color='inherit' size={30}/>}
                                    {!this.state.loading && 'Sign in'}
                                </Button>
                            </form>
                            <Grid container className="margintop3">   
                                <Grid item xs>
                                </Grid>
                                <Grid item>
                                <Link href="/home" variant="body2">
                                    Forgot password?
                                </Link>
                                </Grid>
                            </Grid>
                        </Paper>      
                        <Snackbar open={this.state.snackbar} autoHideDuration={6000} onClose={this.handleClose}>
                            <Alert onClose={this.handleClose} severity="error">
                            {this.state.errmessage}
                            </Alert>
                        </Snackbar>
                    </ThemeProvider>
                </Container>
            </div>           
        )
    }
}

const mapStateToProps = function(state){
    return{
        
    }
}

export default connect(mapStateToProps)(Login)
