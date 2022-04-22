import React, { useState } from 'react';
import "./CreatePost.css";
import { useSelector, useDispatch } from 'react-redux';
import { createPostSuccess } from '../../../redux/Post/postAction';
import axios from "axios";
import { loginScucess } from '../../../redux/Login/loginAction';

function CreatePost() {
  const [postText, setPostText] = useState('');
  const postData = useSelector(state => state.post)
  const userData = useSelector(state => state.login)
  const { userId, designation } = userData;

  const {
    _id,
    description,
    url,
    creationDate,
    likes,
    comments,
    createdAt,
    updatedAt,
  } = postData;

  const dispatch = useDispatch();

  const uploadFile = (e) => {
    e.preventDefault()
    let file = e.target.uploadFile.files[0]
    let bodyFormData = new FormData()
    bodyFormData.append('photo', file)
    bodyFormData.append('description', postText)
    bodyFormData.append('userId', userId)
    console.log(userId)

    function fetchPostData() {
      axios({
        method: "post",
        url: 'http://localhost:3000/api/feed/post',
        data: bodyFormData,
        headers: { "Content-Type": "undefined" }
      })
        .then(res => {
          // console.log(res.data)
          dispatch(loginScucess(userId, designation))
          dispatch(createPostSuccess(_id, description, url, creationDate, likes, comments, userId, createdAt, updatedAt))
        }).catch(err => {
          console.log(err);
        })
    }
    fetchPostData();
  }

  return (
    <div>
      {/* <div className="search-wrapper">
        <img src={defaultProfilePicture} alt="" />
        <input
          type="text"
          className='search-field'
          placeholder='Start a post...'
          name='search'
          // onKeyDown={submitPost}
          onChange={(event) => setPostText(event.target.value)}
          value={postText}
        />

        <span className='photo-logo' onClick={(e) => uploadFile(e)}>
        <input type="file" name="uploadFile" accept="image/jpeg,image/jpg,image/png" />
          {" "}
        </span>
        <span className='photo-video'>Photo/Video</span>
      </div> */}
      <form onSubmit={(e) => uploadFile(e)} className="search-wrapper">
        <input
          type="text"
          className='search-field'
          placeholder='Start a post...'
          name='search'
          onChange={(event) => setPostText(event.target.value)}
          value={postText}
        />
        <input type="file" name="uploadFile" accept="image/jpeg,image/jpg,image/png" className='chooseFile' />
        <input type='submit' className='submit' />

      </form>
    </div>
  );
}

export default CreatePost;  
