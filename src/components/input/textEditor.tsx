import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { ImSpinner2 } from "react-icons/im";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <ImSpinner2 className="animate-spin" />,
});

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
    ["link", "image", "video"],
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
  "link",
  "image",
  "video",
];

export default function TextEditor({ className, ...props }: any) {
  return (
    <div className={className}>
      <QuillNoSSRWrapper
        placeholder="Write your Article Content  here ..."
        value={props.value}
        onChange={props.onChange}
        modules={modules}
        formats={formats}
        theme="snow"
        className="h-[35vh] md:h-[250px]"
      />
    </div>
  );
}
