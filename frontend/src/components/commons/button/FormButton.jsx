import './FormButton.css';
import {Button} from 'react-bootstrap';
function FormButton(props) {

  const {
    name,
    buttonStyle,
    color,
    disabled,
    onSuccess,
    src
  } = props;
  
  // function signOut() {
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //     console.log('User signed out.');
  //   });
  // }
  return(
    <>
    {
      buttonStyle === 'circular' ? 
      <Button variant="outline-primary" 
        type="submit"
        // disabled={disabled}
        className={color==='pink' ? 'circularButton pink': color==='purple'? 'circularButton purple':''}>
          {name}
      </Button>
        : buttonStyle==="withImg"?
      <Button variant="outline-primary"
        type='submit'
        className={color==='blue' ? 'blue': 'blue-filled'}
        >
          {src?<>
            <img src={src} alt="add" className='button-image'/>
            <span className='button-text'>{name}</span>
          </>:<>{name}</>}
      </Button>
      :
      <Button variant="outline-primary"
        type='submit'
        className={color==='blue' ? 'blue btn-padding': 'blue-filled btn-padding'}>
          {name}
      </Button>

    }
    {/* <div><a href="#" onclick={signOut}>Sign out</a></div> */}
    </>
  )
    
}

export default FormButton