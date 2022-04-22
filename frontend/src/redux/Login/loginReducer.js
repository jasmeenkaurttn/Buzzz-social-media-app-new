const initialState ={
    loggedIn: false,
    profilePhoto :'https://res.cloudinary.com/di4mjqigh/image/upload/v1650441396/blank-profile-picture_oof4j6.png',
    userId:'',
    firstName:'',
    lastName:'',
    gender:'female',
    isAdmin:false,
    designation:'',
    myWebsite:'',
    birthday:'',
    city:'',
    stateAddress:'Delhi',
    pinCode: 0,
    friends:[],
    friendsId:[],
    loggedInUsingGoogle:false
}

const loginReducer = (state = initialState,action)=>{
    switch(action.type){
        // case 'ISLOGGEDIN':
        //     return{
        //         ...state,
        //         loggedIn:true
        //     }
        case 'SETPROFILEPHOTO':
            return {
                ...state, 
                profilePhoto: action.profilePhoto
            }
        case 'SETFRIENDSLIST':
            return {
                ...state, 
                friends: action.friends
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state, 
                loggedIn: action.loggedIn,
                userId:action.userId,
                firstName: action.firstName,
                lastName: action.lastName,
                gender: action.gender,
                designation: action.designation,
                myWebsite: action.myWebsite,
                birthday: action.birthday,
                city: action.city,
                stateAddress: action.stateAddress,
                pinCode: action.pinCode,
                isAdmin: action.isAdmin,             
            }
        case 'IS_LOGGEDIN_USING_GOOGLE':
            return {
                ...state, 
                loggedInUsingGoogle: action.loggedInUsingGoogle
            }
        case 'GET_FRIENDS_ID':
            return {
                ...state, 
                friendsId: action.friendsId
            }
        
        default: return state;
    }
}

export default loginReducer