import React from "react";
// import { Image } from 'next/image';
import { useState } from "react";
import { useEffect } from "react";
import Avatar from "../Avatar/Avatar";

const Preview = ({ file, url }:any) => {
  const [selectedImage, setSelectedImage] = useState(URL.createObjectURL(file));
  const [Image, setImage] = useState("");
  useEffect(() => {
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    } else if (url) {
      setImage(url);
    }

    // console.log(URL.createObjectURL(file))
  }, [file]);
  return (
    <div>
      {file && (
        <Avatar imgUrl={selectedImage} sizeClass="h-20 w-20" radius="30" />
      )}
      {url && <Avatar imgUrl={Image} sizeClass="h-20 w-20" radius="30" />}
      {/* <div>Preview</div> */}
    </div>
  );
};

export default Preview;
