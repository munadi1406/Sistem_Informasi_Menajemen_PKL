import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from 'prop-types'



export default function TextEditor({defaultValue,onChange}) {
    
    
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
        <div className="overflow-auto h-[200px] border-red-600 flex w-full ">
            <ReactQuill
                onChange={(e)=>onChange(e)}
                value={defaultValue}
                modules={modules}
                formats={formats}
                className="text-black overflow-y-hidden h-full w-full"
            />
        </div>
    );
}
TextEditor.propTypes={
    onChange:PropTypes.func
}
