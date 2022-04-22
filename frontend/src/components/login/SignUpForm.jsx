import FormButton from '../commons/button/FormButton';
import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import  axios  from 'axios';
import { toast } from 'react-toastify';
import { Form, Row, Col } from 'react-bootstrap'
import {loginScucess, setProfilePhoto,getFriendsId} from '../../redux/Login/loginAction'
import './SignUpForm.css'

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(values.password)) {
    errors.password = 'Minimum eight characters, at least one letter, one number and one special character';
  }
  else if (values.password.length > 20) {
    errors.password = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  else if(!values.email.endsWith('tothenew.com')){
    errors.email = 'Enter TTN email addresss ';
  }

  return errors;
};

function SignUpForm(props) {
  const {
    loginType,
    notify,
    setLoginType
  } = props;
  let navigate = useNavigate();
  const dispatch = useDispatch()

  // const{
  //   firstName,
  //   lastName,
  //   gender,
  //   isAdmin,
  //   designation,
  //   myWebsite,
  //   birthday,
  //   city,
  //   stateAddress,
  //   pinCode
  // } = updateProfile

  let [showPass, setShowPass] = useState(false);
  // let [showName, setShowName] = useState("block");
  let passRef = useRef(null);

  // let [name, setName] = useState();
  // let [email, setEmail] = useState();
  // let [password, setPassword] = useState();

  const formik = useFormik({
    initialValues: {
      name: loginType==="Sign In" ? "undefined": '',
      email: '',
      password: ''
    },
    enableReinitialize:true,
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: values => {
      console.log("submitted");
      formik.resetForm();
      formik.resetForm({ name: ''});
      if(loginType==='Sign In'){
        Login() 
      }
       else{
        Signup()
       } 
    },
  });

  const showPassword = () => {
    if (passRef.current.type === 'password') {
      setShowPass(true);
    }
    else {
      setShowPass(false);
    }
  }

  function Signup() {
    let json = { 
      "name": formik.values.name,
      "email": formik.values.email,
      "password": formik.values.password
    };  
    axios({
        method: "post",
        url: "http://localhost:3000/api/auth/signup",
        data: json,
        headers: {"Content-Type": "application/json"}
    })
    .then(res => {
      if(res.data.name){
        notify()
        setLoginType('Sign In')
      }
    })
    .catch(err => {
      console.log(err);
    })
  }


  function Login() {
    let json = {
      "email": formik.values.email,
      "password": formik.values.password
    };  
    axios({
        method: "post",
        url: "http://localhost:3000/api/auth/login",
        data: json,
        headers: {"Content-Type": "application/json"}
    })
    .then((res) => {
      if(res.data.message==='success'){
        // setUserInfo(res);
        localStorage.setItem("user", JSON.stringify(res));

        let {
          firstName,lastName,_id,gender,profilePicture,isAdmin,designation,birthday,stateAddress,city,pinCode,myWebsite,followings
        } = res.data.data
        dispatch(setProfilePhoto(profilePicture))
        dispatch(loginScucess(true, _id,firstName,lastName,gender,designation,myWebsite,birthday,city,stateAddress,pinCode,isAdmin))
        dispatch(getFriendsId(followings))
        navigate('/editProfile')
      }
      else{
        toast.warning("Please enter correct credentials",{
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    }).catch(err => {
      console.log(err);
    }) 
  }
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group as={Row} className="mb-5 justify-content-center w-75 mx-auto" controlId="formPlaintextText"
        style={{ display: loginType === 'Sign Up' ? "flex" : "none" }}>
        <Col sm="10">
          <Form.Control plaintext
            type='text'
            placeholder="Name"
            className='input ps-3'
            name='name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={loginType==='Sign Up'? formik.values.name:"null"} />
        </Col>
        {formik.errors.name ? <div style={{ color: 'red' }}>{formik.errors.name}</div> : null}
      </Form.Group>

      <Form.Group as={Row} className="mb-5 justify-content-center w-75 mx-auto" controlId="formPlaintextEmail">
        <Col sm="10">
          <Form.Control plaintext
            placeholder="Email: abc123@tothenew.com"
            className='input ps-3'
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email} />
        </Col>
        {formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
      </Form.Group>

      <Form.Group as={Row} className="mb-5 justify-content-center w-75 mx-auto" controlId="formPlaintextPassword">
        <Col sm="10" className='d-flex position-relative'>
          <Form.Control plaintext
            ref={passRef}
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className='password input ps-3'
            name='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password} />

          <img onClick={() => showPassword()}
            src={showPass ? `${process.env.REACT_APP_CONTEXT_PATH}/assets/icons/show.PNG` : `${process.env.REACT_APP_CONTEXT_PATH}/assets/icons/hide.PNG`}
            alt='hide'
            className='eye' />
        </Col>
        {formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
        <Col sm="10 text-end mt-3">
          {loginType==='Sign In'? <a href="/">Forgot Password ?</a>:null }
         
        </Col>
      </Form.Group>
      <FormButton name={loginType}
        disabled={formik.values.email.trim() === '' || formik.values.password.trim() === '' || formik.values.name.trim() === ''
        }
        buttonStyle="circular" color="purple" />
      {/* <Button name="Existing User" buttonType="circular" color="fff" borderColor="9816f3" bgColor="9816f3" ml={3}/> */}
    </Form>
  )
}

export default SignUpForm;