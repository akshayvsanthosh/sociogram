import React, { useEffect } from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom'
import { getPostForEditAPI, updateAPI, uploadAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar'

function Edit({postDetails,setPostDetails}) {
    const location =  useLocation()
    const navigate = useNavigate()
    
    useEffect(()=>{
      if (sessionStorage.getItem("username")) {
        var {pId} = location.state
        getPostForEdit(pId)
      } else {
        toast.error("Please Login")
        setTimeout(() => {
            navigate("/")
        }, 1000);
    }  
    },[])

    console.log(postDetails);

    const getPostForEdit = async (pId) =>{
       try {
         const result = await getPostForEditAPI(pId)
         if (result.status>=200 && result.status<300) {
            console.log(result);
            setPostDetails(result.data)
         }
       } catch (error) {
         console.log(error);
       }
    }

    const handleUpdate = async (id) => {
      const { image, username, locations, caption } = postDetails
      if (image && username) {
        try {
          const result = await updateAPI(postDetails,id)
          console.log(result);
          if (result.status>=200 && result.status<300) {
            toast.success("Your Post Update")
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

    const handleCancel = () => {
        setPostDetails({
            image: "", username: "", location: "", caption: ""
          })
        navigate('/home')  
    }
  
  
    return (
      <>
        <Navbar/>
        <div style={{ float: "right", width: "80%", minHeight: "100vh", padding: "80px 8px 5px 0", backgroundColor: "#141414" }} className='flex flex-col items-center'>
  
          <div className='inputDiv' >
            {
              postDetails.image &&
                <img width={"100%"} src={postDetails.image} alt="Image" />
            }
          </div>
          <TextField value={sessionStorage.getItem("username")} inputProps={{ readOnly: true }} sx={{ marginTop: "60px", width: "34%" }} id="outlined-basic" label="@username *" variant="outlined" />
          <TextField value={postDetails.locations} onChange={e => setPostDetails({ ...postDetails, locations: e.target.value })} sx={{ marginTop: "60px", width: "34%" }} id="outlined-basic" label="location" variant="outlined" />
          <TextField value={postDetails.caption} onChange={e => setPostDetails({ ...postDetails, caption: e.target.value })} sx={{ marginTop: "60px", width: "34%" }} id="outlined-multiline-static" label="caption" multiline rows={4} />
          <div className='flex justify-evenly' style={{ width: "34%" }}>
              <Button onClick={handleCancel}  sx={{ marginTop: "60px", marginBottom: "60px", backgroundColor:"red" }} variant="contained">Cancel</Button>
              <Button onClick={()=>handleUpdate(postDetails.id)} sx={{ marginTop: "60px", marginBottom: "60px" }} variant="contained">Update</Button>
          </div>
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

export default Edit
