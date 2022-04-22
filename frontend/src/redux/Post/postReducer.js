const initialState= {
  _id: '',
  description: '',
  url: '',
  creationDate: '',
  likes: [],
  comments: [],
  userId: '',
  createdAt: '',
  updatedAt: '',
  postArr: []
}

const postReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CREATE_POST_SUCCESS':
      return {
        ...state,
        _id: action._id,
        description: action.description,
        url: action.url,
        creationDate: action.creationDate,
        likes: action.likes,
        comments: action.comments,
        userId: action.userId,
        createdAt: action.createdAt,
        updatedAt: action.updatedAt
      }

    case 'SET_POST_DATA':
      return {
        ...state,
        postArr: action.postArr
      }

    default: return state;
  }
}

export default postReducer