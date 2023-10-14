import { useEffect } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from 'prop-types'



export default function TextEditor({onChange}) {
    const [editorHtml, setEditorHtml] = useState('');
    


    useEffect(()=>{
      onChange(editorHtml)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[editorHtml])
    
    const modules = {
        toolbar: [
            [{ header: ['1','2','3','4','5','6'] }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            [{ 'align': [] }],
            ["clean"],
        ],
        clipboard: {
            matchVisual: false,
        },
    };
    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "align",
    ];
    return (
        <div>
            <ReactQuill
                onChange={(e)=>setEditorHtml(e)}
                value={editorHtml}
                modules={modules}
                formats={formats}
                className="text-black h-max overflow-auto"
            />
        </div>
    );
}
TextEditor.propTypes={
    onChange:PropTypes.func
}
