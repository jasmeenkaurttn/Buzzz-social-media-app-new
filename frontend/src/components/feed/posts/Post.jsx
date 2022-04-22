import React, { useEffect, useState } from 'react'
import "./Post.css";
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux';
import defaultProfilePicture from './defaultProfilePicture.png';
import { createPostSuccess, setPostData } from '../../../redux/Post/postAction';
import { loginScucess } from '../../../redux/Login/loginAction';

function Post(props) {
  const[comment, setComment] = useState('');
  const postData = useSelector(state => state.post)
  const userData = useSelector(state => state.login)

  const { userId, firstName, profilePicture } = userData;
  const {
    _id,
    description,
    url,
    creationDate,
    likes,
    comments,
    createdAt,
    updatedAt,
    postArr
  } = postData;

  const dispatch = useDispatch();

  useEffect(() => {
    fetchPostData();
  }, []);

  function fetchPostData() {
    axios({ 
      method: "get",
      url: `http://localhost:3000/api/feed/allPosts/${userId}`,
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        var postArr = [];
        postArr = res.data;
         dispatch(createPostSuccess(_id, description, url, creationDate, likes, comments, userId, createdAt, updatedAt))
        dispatch(loginScucess(userId, firstName, profilePicture))
        dispatch(setPostData(postArr))
      }).catch(err => {
        console.log(err);
      })
  }

  function likeHandler() {
    let json = {
      // "id": _id
      "id": "62623a1d8bba6fe6717e05ff"
    };
    axios({
      method: "put",
      url: "http://localhost:3000/api/feed/likes",
      data: json,
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        dispatch(createPostSuccess(_id, description, url, creationDate, likes, comments, userId, createdAt, updatedAt))
      }).catch(err => {
        console.log(err);
      });
  }

  function commentHandler() {
    let json = {
      "id": _id,
      "firstName": firstName,
      "comment": comment
    };
    axios({
      method: "put",
      url: "http://localhost:3000/api/feed/comment",
      data: json,
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        dispatch(createPostSuccess(_id, description, url, creationDate, likes, comments, userId, createdAt, updatedAt))
      }).catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="post-wrapper">
      {/* {console.log(postArr)} */}
      {postArr.map((item) => <>
        <div className="card-post" key={item._id}>
          <div className="card-header">
            <img src={defaultProfilePicture} className="card-profile-img" alt="" />
            <div className="profile-name">
              <div>{firstName}</div>
              <span className='date-time'>{item.creationDate.substring(0, 10)}</span>
            </div>
          </div>


          <p className='card-desc'>{item.description}</p>
          {item.url ? (
            <img src={item.url} className="post-img" alt="" />
          ) : null}

          <div className="card-post-bottom">
            <div className="card-post-bottom-left">
              <img src={`${process.env.REACT_APP_CONTEXT_PATH}/assets/icons/like.png`} alt=""
                onClick={likeHandler}
                className="postLike"
              /> &nbsp;
              <img src={`${process.env.REACT_APP_CONTEXT_PATH}/assets/icons/heart.png`} alt=""
                onClick={likeHandler}
                className="postLike"
              />
              <span className="postLikeCounter"> {item.likes} people like it</span>
            </div>
          </div>
          <div className="comment-wrapper">
            <img src={defaultProfilePicture} className="img" alt="" />

            <input type="text"
              placeholder='Write a comment...'
              name="comment"
              onChange={(event) => setComment(event.target.value)}
            />
          </div>
        </div>
      </>
      )}
    </div>
  )
}

export default Post