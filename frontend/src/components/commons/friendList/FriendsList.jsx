import './FriendsList.css'
import { useEffect,useRef,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import {setFriendsList} from '../../../redux/Login/loginAction'

function FriendsList(props) {
    const {
        name
    } = props

    const updateProfile = useSelector(state => state.login)

    const {
        userId,
        friends,
        friendsId
    } = updateProfile

    const [showSearchInput,setShowSearchInput] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [foundUsers, setFoundUsers] = useState([]);

    const dispatch = useDispatch();

    const inputEl = useRef(null);

    function getFriends(){
        axios({
            method: "get",
            url: `http://localhost:3000/api/users/friends/${userId}`,
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => {
                dispatch(setFriendsList(res.data));
                setFoundUsers(res.data);
            }).catch(err => {
                console.log(err);
            })
    }

    function getSuggestions(){
        let json = {
            "friends":friendsId
        }

        axios({
            method: "post",
            url: `http://localhost:3000/api/users/suggestions/${userId}`,
            data: json,
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => {
                dispatch(setFriendsList(res.data));
                setFoundUsers(res.data);
            }).catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        if(name === 'Friends'){
            getFriends()
        }
        else{
            getSuggestions();
        }
        
        
    }, [])

    const updateSearchState = ()=>{
        if(showSearchInput === true){
            setShowSearchInput(false)
        }
        else{
            setShowSearchInput(true)
            // inputEl.current.focus();
        }
    }
    
    const filter = (e) => {
        const keyword = e.target.value;
    
        if (keyword !== '') {
          const results = friends && friends.filter((user) => {
            const fullName = user.firstName + ' ' + user.lastName;
            return fullName.toLowerCase().includes(keyword.toLowerCase());
          });
          setFoundUsers(results);
        } else {
          setFoundUsers(friends);
        }    
        setSearchInput(keyword);
      };

    return (
        <div className='friends-list'>
            <div className='d-flex justify-content-between w-100 friends-list-header'>
                { !showSearchInput ? <h2>{name}</h2>: null }
                { showSearchInput ? <input type='search' value={searchInput} onChange={filter} ref={inputEl}/> : null }
                <img src={`${process.env.REACT_APP_CONTEXT_PATH}/assets/icons/search.png`} 
                alt="search" className='search-image' onClick={updateSearchState}/>
            </div>
                
            <div className='suggestions-list mt-3 d-flex flex-column'>
                {foundUsers && foundUsers.length > 0 ? (
                foundUsers.map((item,index)=>
                    <div className='d-flex align-items-center suggestions-item mb-4' key={index}>
                        <img src={item.profilePicture} alt="" className='user-image me-4' />
                        <h4 className='me-4 mb-0'>
                            {item.firstName.charAt(0).toUpperCase()+item.firstName.slice(1)}  <> </> 
                            {(item.lastName !=='' ?  item.lastName.charAt(0).toUpperCase()+item.lastName.slice(1):'')}</h4>
                        {name === "Suggestions" ?
                            <a href='#'>+Friend</a>
                            : null
                        }
                    </div>
                )):
                <h1>No results found!</h1>
            }

            </div>

        </div>
    )
}

export default FriendsList