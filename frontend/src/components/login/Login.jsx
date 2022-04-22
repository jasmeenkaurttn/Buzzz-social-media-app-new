import './Login.css';
import FormButton from '../commons/button/FormButton';
import SignUpForm from './SignUpForm'
import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import  axios  from 'axios';
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import {isLoggedInUsingGoogle, loginScucess, setProfilePhoto, getFriendsId} from '../../redux/Login/loginAction'

const clientId = '623160788953-gb3fi0trvm7avd3beqsk4f9cl8huj69v.apps.googleusercontent.com';

function Login() {
    let [loginType, setLoginType] = useState('Sign In')

    let navigate = useNavigate();
    const dispatch = useDispatch()

    const changeLoginType = ()=>{
        if(loginType==='Sign Up'){
            setLoginType('Sign In')
        }
        else{
            setLoginType('Sign Up')
        }
    }
    const notify = () => toast.success("You have been registered. Please proceed to login",{
        position: toast.POSITION.BOTTOM_RIGHT
    });

    function GSignup(name,email,password) {
        let json = { 
          "name": name,
          "email": email,
          "password": password
        };  
        axios({
            method: "post",
            url: "http://localhost:3000/api/auth/signup",
            data: json,
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }

    function GLogin(email,password) {
        let json = {
          "email": email,
          "password": password
        };  
        axios({
            method: "post",
            url: "http://localhost:3000/api/auth/login",
            data: json,
            headers: {"Content-Type": "application/json"}
        })
        .then((res) => {
          if(res.data.email){
            let {
              firstName,lastName,_id,profilePicture,gender,isAdmin,designation,birthday,stateAddress,city,pinCode,myWebsite
            } = res.data
            dispatch(setProfilePhoto(profilePicture))
            dispatch(loginScucess(true, _id,firstName,lastName,gender,designation,myWebsite,birthday,city,stateAddress,pinCode,isAdmin))
            navigate('/editProfile')
          }
        }).catch(err => {
          console.log(err);
        }) 
      }

    function checkEmail(name,email,password){
        let json = {
            "email": email,
          };  
          axios({
              method: "post",
              url: "http://localhost:3000/api/profile/checkEmail",
              data: json,
              headers: {"Content-Type": "application/json"}
          })
          .then((res) => {
            if(res.data.message==='no'){
                GSignup(name,email,password)
                GLogin(email,password)
            }

            else{
                let {
                    firstName,lastName,_id,gender,profilePicture,isAdmin,designation,birthday,stateAddress,city,pinCode,myWebsite,followings
                    } = res.data.data
                dispatch(setProfilePhoto(profilePicture))
                dispatch(loginScucess(true, _id,firstName,lastName,gender,designation,myWebsite,birthday,city,stateAddress,pinCode,isAdmin))
                dispatch(getFriendsId(followings))
                navigate('/editProfile')
            }
          }).catch(err => {
            console.log(err);
          }) 
    }

    const onGoogleSuccess = (res) => {
        console.log("first name "+res.profileObj.givenName);

        dispatch(isLoggedInUsingGoogle(true))
        checkEmail(res.profileObj.givenName, res.profileObj.email, res.profileObj.googleId);
    }

    const onGoogleFailure = (error) => {
        console.log(error);
    }

    return (
        <div className="d-flex justify-content-center login">
            <div className='gooogleLogin col-md-6 col-lg-6 text-center pe-5 me-5'>
                <img src={`${process.env.REACT_APP_CONTEXT_PATH}/assets/images/logo.PNG`} alt="logo" className='ttn-logo mb-5' />
                <h2>Enter your details and Start your journey with us.</h2>
                <h5>Don't stop until you are proud</h5>
                {/* <FormButton name="Sign In With Google" buttonStyle="circular" color="pink" onSuccess="onSignIn"/> */}
                <GoogleLogin
                    clientId={clientId}
                    // render={renderProps => (
                    //     <FormButton name="Sign In With Google" buttonStyle="circular" color="pink"/>
                    // )}
                    buttonText="Sign In With Google"
                    onSuccess={onGoogleSuccess}
                    onFailure={onGoogleFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                    data-auto_select="false"
                />
            </div>
                <div className='emailLogin col-md-6 col-lg-6 text-center ps-5 ms-5'>
                <h3 className='fw-bold'>{loginType}</h3>
                <SignUpForm loginType={loginType} notify={notify} setLoginType={setLoginType}/>
                <hr/>
                {
                loginType==='Sign Up'?
                <div><span>You already have an account </span><a onClick={()=>changeLoginType()} style={{color: "#9816f3",cursor:'pointer'}}>Sign-In</a></div>
                :
                <div><span>Don't have an account </span><a onClick={()=>changeLoginType()} style={{color: "#9816f3",cursor:'pointer'}}>Sign-Up</a></div> 
                }
            </div> 
                 
        </div>
    )
}


export default Login