import { Form, FormItem, Input, Space, useForm, useModal } from "@/common";
import { SearchForm, SearchFormBox } from "@/components/search";
import {
  useDelFileListMutation,
  useLazyGetIssuesDetailQuery,
} from "@/features/issues/redux";
import { useAppSelector } from "@/redux/hooks";
import { Button, Descriptions, Spin, Upload } from "antd";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import Image from "next/image";
import { IssuesAddQuill } from "@/features/issues/add/component";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Option, Select } from "@/common/Select";
import qs from "query-string";

const IssuesDetailContainer = () => {
  const router = useRouter();
  const [modal, contextHolder] = useModal();
  const [visible, setVisible] = useState(false);
  const [form] = useForm();
  const [detail, setDetail] = useState("");

  const { issue_id } = router.query;

  const token = useAppSelector((state) => state.login.userInfo);
  const userInfoDetail = useAppSelector((state) => state.login.userInfoDetail);

  const [getDetail, { data: issuesDetail, isLoading }] =
    useLazyGetIssuesDetailQuery();

  const [delFile] = useDelFileListMutation();

  useEffect(() => {
    getDetail({
      project_no: "newsupport2",
      issue_id: issue_id,
      jwt: token?.jwt,
      login_id: userInfoDetail?.jwt?.user_id,
    });
  }, [token?.jwt, issue_id, userInfoDetail?.jwt?.user_id]);

  const answerIssues = () => {
    setVisible(true);
  };

  const [fileList, setFileList] = useState([]);

  const handleFileChange = (info) => {
    setFileList(info.fileList);
  };

  const props: UploadProps = {
    name: "file",
    // action: "http://coverdreamit.co.kr:8001/file/upload",
    beforeUpload: () => false,
    onChange: handleFileChange,
  };

  // 파일 경로 수정 요망.
  // onclick='javascript:fnFileDownload(\"" + fileUid + "\")'>" + fileName + "</a>";
  //file download
  // fileDownload : function(fileUid) {
  // 	location.href= backendAddress + "/file/fileDownload.do?jwt=" + getCookie("jwt") + "&fileUid=" + fileUid;
  // },
  const handleFileDownload = (fileUid, fileName) => {
    const backendAddress = "http://coverdreamit.co.kr:8001"; // 파일 다운로드 서버 주소

    const fileUrl = `${backendAddress}/file/fileDownload.do?jwt=${token.jwt}&fileUid=${fileUid}`;

    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => saveAs(blob, fileName))
      .catch((error) => {
        console.error("파일 다운로드 중 오류가 발생했습니다.", error);
      });
  };

  // fnFileDelConfirm(\"" + fileUid + "\",\"" + filePath + "\",\"" + fileRealName + "\", this)'

  // url : http://coverdreamit.co.kr:8001/issues/fileDelete
  // formData : file_uid, file_path, file_name, project_no, issue_id, jwt, login_id
  const handleFileDelete = (file) => {
    console.log(file);
    const formData = {
      file_uid: file.file_uid,
      file_path: file.file_path,
      file_name: file.file_uid + "." + file.file_extention,
      issue_id: issue_id,
      project_no: issuesDetail?.qaInfo[0]?.project_no,
      jwt: token?.jwt,
      login_id: userInfoDetail?.jwt?.user_id,
    };

    modal.confirm({
      title: "삭제하시겠습니까?",
      onOk() {
        delFile(formData)
          .then((response) => {
            modal.success({
              title: "삭제되었습니다.",
            });
          })
          .catch((error) => {
            console.error(error);
          });
      },
    });
  };

  const formatFileSize = (size: number): string => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      const kbSize = (size / 1024).toFixed(2);
      return `${kbSize} KB`;
    } else {
      const mbSize = (size / (1024 * 1024)).toFixed(2);
      return `${mbSize} MB`;
    }
  };

  const handleFinish = (v) => {
    v = {
      ...v,
      project_no: "newsupport2",
      issue_id: issue_id,
      bf_issue_status: issuesDetail?.issueInfo[0]?.issue_status,
      qa_type: "answer",
      detail: detail,
      jwt: token?.jwt,
      login_id: userInfoDetail?.jwt?.user_id,
    };

    console.log("v", v);
  };

  return (
    <>
      <div className="mt-5 rounded-xl max-w-[80%] mx-auto">
        {contextHolder}
        <div className="pt-7 pb-2 flex justify-between items-center ">
          <div>
            <Button className="bg-gray-200">이력</Button>
            <Button
              className="bg-gray-200"
              onClick={() => router.push("/issues")}
            >
              목록
            </Button>
          </div>
          <div>
            <Button
              onClick={() => router.push(`/issues/modify?issue_id=${issue_id}`)}
            >
              본문수정
            </Button>
            <Button type="primary" className="ml-2" onClick={answerIssues}>
              답변
            </Button>
          </div>
        </div>
        <Spin spinning={isLoading}>
          <Descriptions bordered className="issuesDetail" column={4}>
            <Descriptions.Item label="프로젝트" span={2}>
              {issuesDetail?.issueInfo[0]?.project_name}
            </Descriptions.Item>
            <Descriptions.Item label="요청사항" span={2}>
              {issuesDetail?.issueInfo[0]?.issue_request_type_name}
            </Descriptions.Item>
            <Descriptions.Item label="솔루션" span={2}>
              {issuesDetail?.issueInfo[0]?.nexcore_solution_name}
            </Descriptions.Item>
            <Descriptions.Item label="상태" span={1}>
              {issuesDetail?.issueInfo[0]?.issue_status_name}
            </Descriptions.Item>
            <Descriptions.Item label="작성자" span={1}>
              {issuesDetail?.issueInfo[0]?.crtr_name}
            </Descriptions.Item>
            <Descriptions.Item label="담당자" span={2}>
              {issuesDetail?.issueInfo[0]?.charger_name}
            </Descriptions.Item>
            <Descriptions.Item label="등록일시" span={1}>
              {issuesDetail?.issueInfo[0]?.crtr_dt}
            </Descriptions.Item>
            <Descriptions.Item label="수정일시" span={1}>
              {issuesDetail?.issueInfo[0]?.upd_dt}
            </Descriptions.Item>
            <Descriptions.Item label="제목" span={4}>
              {issuesDetail?.issueInfo[0]?.issue_name}
            </Descriptions.Item>
            <Descriptions.Item label="내용" span={4}>
              <div
                dangerouslySetInnerHTML={{
                  __html: issuesDetail?.qaInfo[0]?.detail || "",
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="첨부파일" span={4}>
              {issuesDetail?.fileInfo.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center text-[#888] text-[12px]"
                >
                  <div>
                    <span
                      onClick={() =>
                        handleFileDownload(file.file_uid, file.file_name)
                      }
                      className="mr-1 text-[#007bff] cursor-pointer"
                    >
                      {file.file_name}
                    </span>
                    {formatFileSize(parseInt(file.file_size))}
                  </div>
                  <BsTrash
                    className="mx-1 cursor-pointer"
                    onClick={() => handleFileDelete(file)}
                  />
                  <div>
                    {file.crtr_name}, {file.crtr_dt}
                  </div>
                </div>
              ))}
            </Descriptions.Item>
          </Descriptions>
        </Spin>
      </div>
      {visible && (
        <div className="rounded-xl max-w-[80%] mx-auto">
          <Form
            form={form}
            onFinish={handleFinish}
            initialValues={{ issue_status: "001" }}
          >
            <div className="bg-[#F3F3F3]">
              <div className="p-2 flex border-b-[1px] border-[#E0E0E0]">
                <Image
                  className="px-2"
                  alt="icon_in"
                  width="37"
                  height="19"
                  src="/images/icon_in.png"
                />
                <span>
                  답변 :{" "}
                  <em className="not-italic"> {userInfoDetail.user_name}</em>
                </span>
              </div>
              <div className="pl-[40px] py-2 px-1">
                <div className="border-l-[2px] border-[#CECECE] px-2">
                  <FormItem>
                    <IssuesAddQuill detail={detail} setDetail={setDetail} />
                  </FormItem>
                  <FormItem>
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>
                        파일을 선택하세요
                      </Button>
                    </Upload>
                  </FormItem>
                  <div className="border-t-[1px] pt-2">
                    <div className="text-right">
                      <Space className="mr-2">
                        상태 :
                        <FormItem name="issue_status">
                          <Select className="!w-[120px] text-left">
                            <Option value="001">요청중</Option>
                            <Option value="002">담당자 접수</Option>
                            <Option value="003">담당자 진행중</Option>
                            <Option value="004">답변완료</Option>
                          </Select>
                        </FormItem>
                      </Space>
                      <Button
                        className="!mr-2"
                        onClick={() => setVisible(false)}
                      >
                        취소
                      </Button>
                      <Button type="primary" onClick={() => form.submit()}>
                        답변 저장
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};

export default IssuesDetailContainer;
