export const createPostSuccess = (_id, description, url, creationDate, likes, comments, userId, createdAt,updatedAt) => {
  return {
    type: "CREATE_POST_SUCCESS",
    _id: _id,
    description: description,
    url: url,
    creationDate: creationDate,
    likes: likes,
    comments: comments,
    userId: userId,
    createdAt: createdAt,
    updatedAt: updatedAt
  }
}

export const setPostData = (postArr) => {
  return {
    type: "SET_POST_DATA",
    postArr: postArr,
  }
}