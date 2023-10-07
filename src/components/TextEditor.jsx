import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor() {
    const [editorHtml, setEditorHtml] = useState('');
    
    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            [{ 'align': [] }],
            ["table"],
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
               
                value={editorHtml}
                modules={modules}
                formats={formats}
                className="h-[250px]"
            />
        </div>
    );
}
