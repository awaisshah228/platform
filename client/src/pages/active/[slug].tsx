import React,{useState,useEffect} from 'react'
import  PageActive from '../../containers/PageActive'
import { useParams } from 'react-router-dom'
import { IParams } from '../../utils/types'
import { postAPI } from '../../utils/fetchData'


const Active = () => {

    const { slug } = useParams()
  
  const [resp, setResp] = useState({})


  useEffect(() => {
    if(slug){
      postAPI('auth/active', { active_token: slug })
      .then(res => setResp({res:res.data.msg}))
      .catch(err => {setResp({err: err.response.data.errors})
       console.log(err)
    })
    }
    // console.log(err)
  },[slug])
  return (
    <div>
        <PageActive resp={resp}  />
    </div>
  )
}

export default Active