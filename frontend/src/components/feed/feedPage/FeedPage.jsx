import React from 'react'
import "./FeedPage.css";
import ProfileCard from '../ProfileCard/ProfileCard'
import InfoCard from '../InfoCard/InfoCard'
import Header from '../../commons/header/Header'
import FriendsList from '../../commons/friendList/FriendsList'
import CreatePost from '../posts/CreatePost'
import Post from '../posts/Post'
import {useSelector} from 'react-redux';

function FeedPage(props) {
    const {
      name
  } = props

  const updateProfile = useSelector(state => state.login)

  return (
    <div className='feed-page-wrapper'>
      <Header />
      <div className="main">
        <div className="leftbar">
          <ProfileCard className="profileCard" />
          <InfoCard />
        </div>

        <div className="center">
          <CreatePost />
          <Post />
        </div>

        <div className="rightbar">
          <FriendsList name="Friends"/>
        </div>
      </div>
    </div>
  )
}

export default FeedPage
