import React,{useEffect} from 'react'
import { useParams } from "react-router-dom";

function IndividualProfile() {
    const {id } =useParams();
    useEffect(()=>{
        console.log(id);
    },[])
  return (
    <div>IndividualProfile</div>
  )
}

export default IndividualProfile
