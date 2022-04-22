import './Common.css'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {setProfilePhoto} from '../../../redux/Login/loginAction'

function Common(props) {
  const {
    type
  } = props

  const updateProfile = useSelector(state => state.login)
  const dispatch = useDispatch()

  const{
    profilePhoto,
    userId
  } = updateProfile

  const applyProfilePhoto = (e)=>{
    let file = e.target.files[0]
    let bodyFormData = new FormData()
    bodyFormData.append('photo', file)
    bodyFormData.append('id',userId)
    axios({
      method: "post",
      url: 'http://localhost:3000/api/profile/profilePhoto',
      data:bodyFormData,
      headers: { "Content-Type": "undefined" }
      })
      .then(res => {
        console.log(res.data)
        dispatch(setProfilePhoto(res.data))
      }).catch(err => {
        console.log(err);
      })
  }
  
  return (
    <div className='common-cover position-relative'>
      <div className="cover-photo">
        <img src={`${process.env.REACT_APP_CONTEXT_PATH}/assets/images/cover.jpg`} alt="cover" />
      </div>
      <div className='profile-photo'>
        <img src={profilePhoto} alt="profile" className='' />
        {type === 'edit' ?
          <>
            <div className='add-photo'>
              <label htmlFor="file">
                <img src={`${process.env.REACT_APP_CONTEXT_PATH}/assets/icons/add-photo.png`} alt="add" />
                <input type="file" id="file" 
                  style={{display: "none"}} name="image" 
                  accept="image/jpeg,image/jpg,image/png" multiple="" 
                  data-original-title="upload photos" 
                  onChange={(e)=>applyProfilePhoto(e)}/>
              </label>
            </div>
          </> :
          null
        }

      </div>
    </div>

  )
}

export default Common