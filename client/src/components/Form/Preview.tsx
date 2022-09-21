import React from 'react'
// import { Image } from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';
import Avatar from '../Avatar/Avatar';

const Preview = ({file}) => {
    const [selectedImage, setSelectedImage] = useState(URL.createObjectURL(file));
    useEffect(()=>{
        setSelectedImage(URL.createObjectURL(file))
            // console.log(URL.createObjectURL(file))

    },[file])
  return (
    <div>
        <Avatar imgUrl={selectedImage} sizeClass='h-20 w-20' radius='30'  />
        {/* <div>Preview</div> */}
    </div>
  )
}

export default Preview