import { UploadOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { Upload as AnddUpload, UploadProps } from "antd";

// const props: UploadProps = {
//   name: "file",
//   // action: "http://coverdreamit.co.kr:8001/file/upload",
//   onChange(info) {
//     if (info.file.status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === "done") {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

const Upload = (props: UploadProps) => {
  return (
    <AnddUpload {...props}>
      <Button icon={<UploadOutlined />}>파일을 선택하세요</Button>
    </AnddUpload>
  );
};

export default Upload;
