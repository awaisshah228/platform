import React from 'react'
import ReactQuill from 'react-quill';



interface IProps {
  body: string
  setBody: (value: string) => void
}

const LiteQuill: React.FC<IProps> = ({body, setBody}) => {

  const modules = { toolbar: { container }}


  return (
    <div>
      <ReactQuill theme="snow"
        modules={modules}
        placeholder="Write somethings..."
        onChange={e => setBody(e)}
        value={body}
      />
    </div>
  )
}

let container = [
  [{ 'font': [] }],
  ['bold', 'italic', 'underline', 'strike'],        
  ['blockquote', 'code-block', 'link'],
  [{ 'color': [] }, { 'background': [] }],          
  [{ 'script': 'sub'}, { 'script': 'super' }]
]

export default LiteQuill