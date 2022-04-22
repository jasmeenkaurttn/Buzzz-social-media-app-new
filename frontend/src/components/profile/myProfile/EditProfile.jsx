import Button from '../../commons/button/FormButton';
import './EditProfile.css'
import InputBox from "../../commons/input/InputBox"
import { useFormik } from 'formik';
import {useSelector, useDispatch} from 'react-redux'
import {loginScucess} from '../../../redux/Login/loginAction'
import axios from 'axios';
import { toast } from 'react-toastify';

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (values.pincode > 999999 || values.pincode < 100000) {
    errors.pincode = 'Enter valid Pincode';
  }
  if (values.myWebsite && !values.myWebsite.endsWith('.com')) {
    errors.myWebsite = 'Enter valid website addresss ';
  }

  return errors;
};


function EditProfile() {
  const updateProfile = useSelector(state => state.login)
  const {
    userId,firstName,lastName,gender,designation,myWebsite,birthday,city,stateAddress,pinCode
  } = updateProfile

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: firstName,
      lastName: lastName,
      designation: designation,
      myWebsite: myWebsite,
      gender: gender,
      birthday: birthday && birthday.length > 10 ? birthday.substring(0,10) : birthday,
      city: city,
      stateAddress: stateAddress,
      pinCode: pinCode,
    },
    validate,
    enableReinitialize:true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: values => {
      console.log("submitted");
      values.userId = userId;
      axios({
        method: "put",
        url: `http://localhost:3000/api/users/${userId}`,
        data: JSON.stringify(values),
        headers: {"Content-Type": "application/json"}
    })
    .then((res) => {    
      if(res.data.message){
        dispatch(loginScucess(true, 
          values.userId,
          values.firstName,
          values.lastName,
          values.gender,
          values.designation,
          values.myWebsite,
          values.birthday,
          values.city,
          values.stateAddress,
          values.pinCode,
          false));
        
          toast.success("You account details have been updated",{
            position: toast.POSITION.BOTTOM_RIGHT
          });
      }
    }).catch(err => {
      console.log(err);
    }) 
    },
  });

  const data = [
    ["text", "firstName", "First Name", formik.values.firstName, formik.handleChange, formik.handleBlur, formik.errors.firstName],
    ["text", "lastName", "Last Name", formik.values.lastName, formik.handleChange, formik.handleBlur],
    ["text", "designation", "Designation", formik.values.designation, formik.handleChange, formik.handleBlur],
    ["text", "myWebsite", "My Website", formik.values.myWebsite, formik.handleChange, formik.handleBlur, formik.errors.myWebsite],
    ["text", "gender", "Gender", formik.values.gender, formik.handleChange, formik.handleBlur],
    ["date", "birthday", "Birthday", formik.values.birthday, formik.handleChange, formik.handleBlur],
    ["text", "city", "City", formik.values.city, formik.handleChange, formik.handleBlur]
  ]

  const handleGenderChange = (val) => {
    formik.setFieldValue("gender", val);
  }

  const resetForm = () => {
    formik.resetForm({
      values: { firstName: '', 
      lastName: '',
      designation: '',
      myWebsite: '',
      gender: '',
      birthday: '',
      city: '',
      stateAddress: '',
      pinCode: '' },
    });

    dispatch(loginScucess(true, 
      userId,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      false));

    toast.warning("Please enter new values and click on Save",{
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  return (
    <form className="mt-5 ps-5 d-flex flex-wrap edit-form" onSubmit={formik.handleSubmit} noValidate>
      {data && data.map((item, index) => <>
        <InputBox type={item[0]} id={item[1]} name={item[2]} values={item[3]}
          onchange={item[1] === "gender" ? handleGenderChange : item[4]} onblurr={item[5]} key={index}
          errors={item[1]==="firstName"? formik.errors.firstName : item[1] === 'myWebsite'? formik.errors.myWebsite :'' }
          // initialValues = {initialValues}
        />      
      </>
      )}

      <div className='d-flex justify-content-between' style={{ width: "45%" }} >
        <InputBox type="text" id="stateAddress" name="State" values={formik.values.stateAddress}
          onchange={formik.handleChange} onblurr={formik.handleBlur} />
        <InputBox type="number" id="pinCode" name="Pin Code" values={formik.values.pinCode}
          onchange={formik.handleChange} onblurr={formik.handleBlur} errors={formik.errors.pinCode} />
        {
          formik.errors.pinCode ? <div style={{ color: 'red' }}>{formik.errors.pinCode}</div> : null
        }
      </div>
      <Button color="blue-filled" name="Save" />
      <button type="reset"  className='btn btn-outline-primary p-3' onClick={() => resetForm()}>Reset All</button>
      {/* <Button color="blue" name="Reset All" /> */}
    </form>
  )
}

export default EditProfile