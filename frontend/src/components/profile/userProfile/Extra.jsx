
import axios from "axios";
function Extra() {
    const uploadFile = (e)=>{
        e.preventDefault()
        let file = e.target.uploadFile.files[0]
        let bodyFormData = new FormData()
        bodyFormData.append('photo', file)
        bodyFormData.append('description',"post api")
        bodyFormData.append('userId',"ttn596")
        console.log(bodyFormData);
        for (var pair of bodyFormData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        function fetchPostData(){
            axios({
                    method: "post",
                    url: 'http://localhost:3000/api/feed/post',
                    data:bodyFormData,
                    headers: { "Content-Type": "undefined" }
                })
                    .then(res => {
                    console.log(res.data)
                    }).catch(err => {
                    console.log(err);
                    })
        }
        fetchPostData();
    }

  return (
    <form onSubmit={(e)=>uploadFile(e)}>
        <input type="file" name="uploadFile" accept="image/jpeg,image/jpg,image/png"/>
        <input type='submit'/>
    </form>
  )
}

export default Extra