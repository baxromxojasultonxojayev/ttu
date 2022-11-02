import { useMemo } from "react"
import ReactQuill from "react-quill" // ES6
import "react-quill/dist/quill.snow.css" // ES6
import "./style.scss"

const Redactor = ({ value, onChange }) => {

  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
        const file = input.files[0];
        const formData = new FormData();

        formData.append('image', file);

        // Save current cursor state
        const range = this.quill.getSelection(true);

        // Insert temporary loading placeholder image
        this.quill.insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);

        // Move cursor to right side of image (easier to continue typing)
        this.quill.setSelection(range.index + 1);

        const res = null // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

        // Remove placeholder image
        this.quill.deleteText(range.index, 1);

        // Insert uploaded image
        // this.quill.insertEmbed(range.index, 'image', res.body.image);
        this.quill.insertEmbed(range.index, 'image', res);
    };
}

  const customModules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }
  }, [])

  return (
    <div className="Redactor">
      <ReactQuill
      
        style={{ header: "600px" }}
        value={value}
        onChange={onChange}
        modules={customModules}
      />
    </div>
  )
}

export default Redactor
