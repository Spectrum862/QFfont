import React,{Component} from 'react'
import theme from '../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import {Container,Button,TextField, Link, Paper, Grid, CircularProgress,Snackbar} from '@material-ui/core/'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            message:"",
            loading:false,
            snackbar:false
        }
    }
    

    onChange = e =>{
        const {name,value} = e.target
        this.setState({
            [name]: value
        })
        // if(this.state.username==="") this.plsId
        // if(this.state.password==="") this.plsPass
    }  

    onSubmit = (e) =>{
        e.preventDefault()
        this.auth()
    }

    auth = () =>{
        this.setState({ loading: true });
        if(this.state.username==='test'){
                    setTimeout(() => {
            this.setState({ loading: false })
            this.props.history.replace('/home')
        }, 3000);
        }
        else setTimeout(()=> {this.setState({snackbar:true});this.setState({ loading: false })},3000) 

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
                            Username or Password is incorrect.
                            </Alert>
                        </Snackbar>
                    </ThemeProvider>
                </Container>
            </div>           
        )
    }
}
export default Login
