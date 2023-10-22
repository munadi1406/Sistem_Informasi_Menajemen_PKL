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
    const initialValue =  '<h1 class="ql-align-center"><strong><u>NAMA SURAT </u></strong></h1><h2 class="ql-align-center"><span class="ql-size-small">Nomor : 400.3.8.6 / {nomor} -DM/SMAN1.KI/{date} </span></h2><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><p>Berdasarkan [berdasarkan], Perihal [perihal], maka dengan ini kami sampaikan siswa perwakilan SMA Negeri 1 Karang Intan untuk mengikuti kegiatan tersebut di atas sebagai berikut :</p><p><br></p><p>[isi:nama,alamat,kelas]</p><p><br></p><p><br></p><p>Demikian surat rekomendasi ini dibuat dengan sebenarnya, untukdapat dipergunakan sebagaimana mestinya.</p>'
    return (
        <div className="overflow-auto h-[200px] border-red-600 flex w-full ">
            <ReactQuill
                onChange={(e)=>onChange(e)}
                value={defaultValue ? defaultValue : initialValue}
                // defaultValue={initialValue}
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

   

