import React, { useEffect, useRef } from 'react'
import uploadImage from '../assets/uploadimage.jpg'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import { uploadAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar'

function Create({postDetails,setPostDetails}) {
  const uploadRef = useRef(null)
  const navigate = useNavigate()

  useEffect(()=>{
    if (sessionStorage.getItem("username")) {
      setPostDetails({
        ...postDetails, username: sessionStorage.getItem("username")
      })
    } else {
      toast.error("Please Login")
      setTimeout(() => {
          navigate("/")
      }, 1000);
  }  
  },[])

  const handleClick = () => {
    uploadRef.current.click()
  }

  const handleInput = (e) => {
    e.preventDefault()

    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      console.log('RESULT :', reader.result)
      setPostDetails({ ...postDetails, image: reader.result })
    }
    reader.readAsDataURL(file);
  }

  const handleUpload = async () => {
    console.log(postDetails);
    const { image, username, locations, caption } = postDetails
    if (image && username) {
      try {
        
        const result = await uploadAPI(postDetails)
        console.log(result);
        if (result.status>=200 && result.status<300) {
          toast.success("Your Post Uploaded")
          setTimeout(() => {
            navigate('/home')
        }, 1000);
        }else{
          toast.error(result.response.data)
        }
      } catch (error) {
        console.log(error);
      }

    } else {
      toast.error("Please provide the username and File")
    }
    setPostDetails({
      image: "", username: "", location: "", caption: ""
    })

  }

  console.log(postDetails);

  return (
    <>
      <Navbar/>
      <div style={{ float: "right", width: "80%", minHeight: "100vh", padding: "80px 8px 5px 0", backgroundColor: "#141414" }} className='flex flex-col items-center'>

        <div className='inputDiv' onClick={handleClick}>
          {
            postDetails.image ?
              <img width={"100%"} src={postDetails.image} alt="Image" />
              :
              <img width={"100%"} style={{ borderRadius: "38px" }} src={uploadImage} alt="Image" />
          }
          <input ref={uploadRef} type="file" onChange={e => handleInput(e)} style={{ display: "none" }} />
        </div>
        <TextField value={sessionStorage.getItem("username")} inputProps={{ readOnly: true }}  color="secondary" sx={{ marginTop: "60px", width: "34%" }} id="outlined-basic" label="@username *" variant="outlined" />
        <TextField onChange={e => setPostDetails({ ...postDetails, locations: e.target.value })} sx={{ marginTop: "60px", width: "34%" }} id="outlined-basic" label="locations" variant="outlined" />
        <TextField onChange={e => setPostDetails({ ...postDetails, caption: e.target.value })} sx={{ marginTop: "60px", width: "34%" }} id="outlined-multiline-static" label="caption" multiline rows={4} />
        <Button onClick={handleUpload} sx={{ marginTop: "60px", marginBottom: "60px" }} variant="contained">Upload</Button>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default Create
