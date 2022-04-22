import React from 'react';
import "./ProfileCard.css";
import profileImage from '../posts/defaultProfilePicture.png';
import { useSelector } from "react-redux"

function ProfileCard(props) {
  const profile = useSelector(state => state.login)
  const {
    firstName,
    designation,
    profilePicture
  } = profile;
  return (
    <div className="card">
      <div className="cover-img">
        <img src={`${process.env.REACT_APP_CONTEXT_PATH}/assets/images/cover.jpg`} 
        className="cover-img"
        alt=""  />
      </div>
      <img className='profile-img' src={profilePicture || profileImage} alt="" />

      <div className="card-body">
        <h4 className='card-title'>{firstName}</h4>
        <p className='card-text'>{designation}</p>
        <p className='profileviews-wrapper'>
          <div className="profileviews">
            <span>234</span>
            <span className='profile-view-text'>Profile View</span>
          </div>
          <div className="postviews">
            <span>10</span>
            <span>Post</span>
          </div>
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
