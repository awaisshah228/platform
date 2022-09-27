import React, { useRef } from 'react'
import ReactQuill from 'react-quill';

const ReactQuilCustom = ({field}) => {
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