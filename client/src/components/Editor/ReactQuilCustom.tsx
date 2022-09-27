import React, { useCallback, useEffect, useRef } from 'react'
import ReactQuill from 'react-quill';
import { toast } from "react-toastify";
import { useAppDispatch } from '../../app/hook';
import { postAPI } from './../../utils/fetchData';


const ReactQuilCustom = ({field}) => {

    const dispatch=useAppDispatch()
    const quillRef = useRef<ReactQuill>(null);
    const container = [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
  
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ align: [] }],
  
      ["clean", "link", "image", "video"],
    ];
  
  
    const modules = { toolbar: { container } };

     const checkImage = (file: File) => {
      const types = ['image/png', 'image/jpeg']
      let err = ''
      if(!file) return err = "File does not exist."
    
      if(file.size > 1024 * 1024) // 1mb
        err = "The largest image size is 1mb"
    
      if(!types.includes(file.type))
        err = "The image type is png / jpeg"
    
      return err;
    }
    
     const imageUpload = async (file: File) => {
      const formData = new FormData()
      formData.append("image", file)
     
    
      const res:any = await postAPI('/image',formData)
    
      const data = await res.json()
      return {  url: data.secure_url };
    }
    // Custom image
  const handleChangeImage = useCallback(() => {
    const input = document.createElement('input')
    input.type = "file"
    input.accept = "image/*"
    input.click()

    input.onchange = async () => {
      const files = input.files
      if(!files) {
        toast("File does not exist", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          return;

      }

      const file = files[0]
      const check = checkImage(file)
      if(check) {
        toast(check, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          return;
      }
      
      const photo = await imageUpload(file)

      const quill = quillRef.current;
      const range = quill?.getEditor().getSelection()?.index
      if(range !== undefined){
        quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`)
      }

    
    }
  },[dispatch])


  useEffect(() => {
    const quill = quillRef.current;
    if(!quill) return;

    let toolbar = quill.getEditor().getModule('toolbar')
    toolbar.addHandler('image', handleChangeImage)
  },[handleChangeImage])

  return (
    <ReactQuill
    value={field.value}
    onChange={field.onChange(field.name)}
    modules={modules}
    placeholder="Write Something"
  />
    )
}

export default ReactQuilCustom