import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

interface ISettingQuillProps {
    detail: string;
    setDetail: React.Dispatch<React.SetStateAction<string>>;
}

const SettingMgtQuill = ({ detail, setDetail }: ISettingQuillProps) => {
    const QuillWrapper = useMemo(
        () =>
            dynamic(() => import("react-quill"), {
                ssr: false,
                loading: () => <div>Loading...</div>,
            }),
        []
    );

    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    };
    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
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
    ];

    const handleDetailChange = (value, _, source) => {
        if (source === "user") {
            setDetail(value);
        }
    };

    return (
        <QuillWrapper
            modules={modules}
            formats={formats}
            theme="snow"
            value={detail}
            onChange={handleDetailChange}
        />
    );
};

export default SettingMgtQuill;
