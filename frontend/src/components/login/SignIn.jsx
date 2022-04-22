import { upload } from "@testing-library/user-event/dist/upload"
import { useState } from "react"
import SignUpForm from "./SignUpForm"

function SignIn() {
  const[fileInputState, setFileInputState] = useState('')
  const[selectedFile,setSelectedFile] =useState('')
  const[previewSource, setPreviewSource] =useState('')

  const handleFileInputChange = (e)=>{
    const file = e.target.files[0]
    previewFile(file)
    setSelectedFile(file)
  }

  const previewFile = (file)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file)//converts image to url
    reader.onloadend = ()=>{
      setPreviewSource(reader.result)
    }
  }

  const handleSubmitFile =(e)=>{
    console.log('submitting');
    e.preventDefault();
    if(!previewSource)return;
    uploadImage(previewSource)
  }

  const uploadImage = async(base64EncodedImage)=>{
    console.log(base64EncodedImage);
    try {
      await fetch('/api/feed/post',{
        method:'POST',
        body: JSON.stringify({data: base64EncodedImage}),
        headers:{'Content-type':'application/json'}
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="d-flex justify-content-center login">
        <form onSubmit={handleSubmitFile}>
          <input 
            type="file" 
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
             />
            <button type="submit">Submit</button>
        </form>
        
    </div>
  )
}

export default SignIn