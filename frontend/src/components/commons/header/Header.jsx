import "./Header.css";
import { useSelector, useDispatch } from 'react-redux';
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from 'react-router';
import { GoogleLogout } from 'react-google-login';
import { logoutUserSuccess } from '../../../redux/Login/loginAction';

const clientId = '623160788953-gb3fi0trvm7avd3beqsk4f9cl8huj69v.apps.googleusercontent.com';

function Header(props) {
  const updateProfile = useSelector(state => state.login);

  const{
    profilePhoto,
    firstName,
    loggedInUsingGoogle
  } = updateProfile;

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUserSuccess());
    navigate('/buzz')
  }

  const onSignoutSuccess = (res) => {
    dispatch(logoutUserSuccess());
    navigate('/buzz')
}


  return (
    <div className="container-fluid px-5 header">
    <header className="d-flex flex-wrap justify-content-center">
      <a href="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <img src={`${process.env.REACT_APP_CONTEXT_PATH}/assets/images/logo.PNG`} alt="logo" className="logo" onClick={()=>navigate('/feed')}/>
      </a>

      <ul className="nav nav-pills right-header align-items-center">
        <li className="nav-item me-2"><a href="#" className="nav-link">
            <img src={profilePhoto} alt="user" className="user-image header-user-image"/>
            <span style={{color:"black"}}>{firstName}</span>
        </a></li>
        <li className="nav-item me-3"><a href="#" className="nav-link p-3"><img src={`${process.env.REACT_APP_CONTEXT_PATH}/assets/images/user.PNG`} alt="friend-requests"/></a></li>
        {/* <li className="nav-item"><a href="#" className="nav-link"><img src={`${process.env.REACT_APP_CONTEXT_PATH}/assets/images/down-arrow.PNG`} alt="down-arrow"/></a></li> */}
        <li className="nav-item p-3" role="button">
          <OverlayTrigger
            trigger="click"
            placement="bottom-end"
            rootClose={true}
            overlay={
              <Popover id="popover-positioned-bottom" className='LogoutOverlay'>
                <Popover.Body className="LogoutPopover text-center">
                  {
                    loggedInUsingGoogle === true ?
                    <GoogleLogout
                      clientId={clientId}
                      buttonText="Sign Out"
                      onLogoutSuccess={onSignoutSuccess}
                    ></GoogleLogout>
                    :
                    <div onClick={() => logout()} className="d-flex align-items-center Logout">
                        <img src={`${process.env.REACT_APP_CONTEXT_PATH}/assets/icons/Logout.svg`}
                            alt="logout"
                            className='me-3' />
                        Logout
                    </div>
                  }
                </Popover.Body>
              </Popover>
            }
          >            
            <img src={`${process.env.REACT_APP_CONTEXT_PATH}/assets/images/down-arrow.PNG`} alt="down-arrow"/>
          </OverlayTrigger>
        </li>
      </ul>
    </header>
  </div>
  )
}

export default Header