import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

interface ISettingQuillProps {
    detail: string;
    setDetail: React.Dispatch<React.SetStateAction<string>>;
}

const IssuesAddQuill = ({ detail, setDetail }: ISettingQuillProps) => {
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
            [{ color: [] }, { background: [] }], // 색상 관련 모듈 추가
            ["code-block"],
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
        "color",
        "background",
        "code-block",
    ];

    const handleDetailChange = (value, _, source) => {
        if (source === "user") {
            setDetail(value);
        }
        if (source === "user" && value.indexOf("[code]") !== -1) {
            const div = document.createElement("div");
            div.innerHTML = value
                .replace(/\[code\]/g, "")
                .replace(/\[\/code\]/g, "");
            console.log(div.innerHTML);
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

export default IssuesAddQuill;
