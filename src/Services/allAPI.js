import commonApi from "./commonAPI"
import serverUrl from "./serverUrl"

// upload called by create.jsx
export const uploadAPI = async (postContent) => {
    return await commonApi("POST",`${serverUrl}/allPost`,postContent)
}

// get called by home.jsx & profile
export const getAllPostAPI = async ()=>{
    return await commonApi("GET",`${serverUrl}/allPost`,"")
}

// get called by edit.jsx
export const getPostForEditAPI = async (postId) => {
    return await commonApi("GET",`${serverUrl}/allPost/${postId}`)
}

// update called by edit.jsx
export const updateAPI= async (postDetails,postId) => {
    return await commonApi("PUT",`${serverUrl}/allPost/${postId}`,postDetails)
}

// delete called by home.jsx
export const deletePostAPI = async (postId)=>{
    return await commonApi("DELETE",`${serverUrl}/allPost/${postId}`,"")
}

// add user called by register.jsx
export const addUser = async (userDetails)=>{
    return await commonApi("POST",`${serverUrl}/allUsers`,userDetails)
}

// get user called by register.jsx
export const getAllUserDetails = async ()=>{
    return await commonApi("GET",`${serverUrl}/allUsers`,"")
}