import axios from "axios"

const commonApi =async (httpMethode,url,reqBody) =>{
    const reqconfiq ={
        method : httpMethode,
        url,
        data:reqBody,
    }
    return await axios(reqconfiq,).then(result=>{
        return result
    }).catch(error=>{
        return error
    })

}

export default commonApi