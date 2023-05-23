import { Form, FormItem, Input, useForm, useModal } from "@/common";
import { Option, Select } from "@/common/Select";
import { SearchForm } from "@/components/search";
import {
  useDelFileListMutation,
  useLazyGetIssuesDetailQuery,
  useModifyIssuesMgtListMutation,
  useUpDateFileListMutation,
} from "@/features/issues/redux";
import { UpdateIssuesListReq } from "@/features/issues/types";
import { useAppSelector } from "@/redux/hooks";
import { Button, Descriptions, Spin, Upload } from "antd";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import IssuesModifyQuill from "../IssuesModifyQuill";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const IssuesModifyContainer = () => {
  const authOptions = [
    { value: "000", label: "관리자(운영자)" },
    { value: "001", label: "프로젝트 사용자" },
    { value: "002", label: "NEXCORE J2EE Framework 담당자" },
    { value: "003", label: "NEXCORE C/.NET Framework 담당자" },
    { value: "004", label: "Batch Scheduler 담당자" },
    { value: "005", label: "Alopex UI/Grid 담당자" },
    { value: "006", label: "Alopex Runtime 담당자" },
    { value: "007", label: "NMP/NSWP 담당자" },
    { value: "008", label: "PMS(Project Management System) 담당자" },
    { value: "009", label: "TMS(Test Management System) 담당자" },
    { value: "010", label: "ITS(Issue Tracker System) 담당자" },
    { value: "011", label: "QMS(Quality Management System) 담당자" },
  ];

  const [fileList, setFileList] = useState<any[]>([]);

  const handleFileChange = (info: any) => {
    // const files = info.fileList.map((file: any) => file.originFileObj);
    setFileList(info.fileList);
    // setFileList(files);
  };

  const [upDateFiles] = useUpDateFileListMutation();

  const props: UploadProps = {
    name: "file",
    // action: "http://coverdreamit.co.kr:8001/file/upload",
    beforeUpload: () => false,
    onChange: handleFileChange,
  };

  const router = useRouter();
  const [modal, contextHolder] = useModal();
  const [form] = useForm();
  const [detail, setDetail] = useState<string>("");
  const { issue_id } = router.query;
  const token = useAppSelector((state) => state.login.userInfo);
  const userInfoDetail = useAppSelector((state) => state.login.userInfoDetail);

  const [modifyIssue] = useModifyIssuesMgtListMutation();

  const [getDetail, { data: issuesDetail, isLoading }] =
    useLazyGetIssuesDetailQuery();

  const [delFile] = useDelFileListMutation();

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
  const handleFileDelete = (file) => {
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

  useEffect(() => {
    getDetail({
      project_no: "newsupport2",
      issue_id: issue_id,
      jwt: token?.jwt,
      login_id: userInfoDetail?.jwt?.user_id,
    });
  }, [token?.jwt, issue_id, userInfoDetail?.jwt?.user_id]);

  useEffect(() => {
    form.setFieldsValue({
      issue_request_type: issuesDetail?.issueInfo[0]?.issue_request_type,
      issue_status: issuesDetail?.issueInfo[0]?.issue_status,
      issue_name: issuesDetail?.issueInfo[0]?.issue_name,
      charger: issuesDetail?.issueInfo[0]?.charger
        ? issuesDetail?.issueInfo[0]?.charger.split(",")
        : [],
    });
    setDetail(issuesDetail?.qaInfo[0]?.detail || "");
  }, [issuesDetail]);

  const handleFinish = (v) => {
    const formData: UpdateIssuesListReq = {
      ...v,
      charger: v.charger ? v.charger.join(",") : "",
      issue_id: issue_id,
      project_no: "newsupport2",
      jwt: token.jwt,
      login_id: userInfoDetail.jwt.user_id,
      detail: detail,
    };

    if (v.issue_request_type !== undefined || null) {
      if (v.issue_name !== undefined || null) {
        if (detail !== "") {
          modal.confirm({
            title: "저장하시겠습니까?",
            onOk() {
              modifyIssue(formData)
                .unwrap()
                .then((data) => {
                  if (fileList.length > 0) {
                    const fileData = new FormData();
                    fileList.forEach((file) => {
                      fileData.append("files", file.originFileObj);
                    });
                    fileData.append("project_no", "newsupport2");
                    fileData.append("board_type", "issues");
                    fileData.append("ui_id", String(issue_id));
                    fileData.append("sub_ui_id", "1");
                    fileData.append("jwt", token.jwt);
                    fileData.append("login_id", userInfoDetail.jwt.user_id);

                    // upDateFiles(fileData);

                    axios
                      .post(
                        "http://coverdreamit.co.kr:8001/file/upload",
                        fileData,
                        {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        }
                      )
                      .then((response) => {
                        // 파일 업로드 성공 시
                        console.log(response);
                        modal.success({
                          title: "저장되었습니다.",
                          onOk() {
                            router.push(`/issues/detail?issue_id=${issue_id}`);
                          },
                        });
                      })
                      .catch((error) => {
                        // 파일 업로드 실패 시 처리
                        console.log(error);
                      });
                  }
                });
            },
          });
        } else {
          modal.error({
            title: "내용을 입력해 주세요.",
          });
        }
      } else {
        modal.error({
          title: "제목을 입력해 주세요.",
        });
      }
    } else {
      modal.error({
        title: "요청사항을 선택해주세요!",
      });
    }
  };

  const goIssues = () => {
    modal.confirm({
      title: "변경사항은 저장되지 않습니다. 목록으로 이동하시겠습니까?",
      onOk() {
        router.push("/issues");
      },
    });
  };
  const cancelIssues = () => {
    modal.confirm({
      title: "변경사항은 저장되지 않습니다. 취소하시겠습니까?",
      onOk() {
        router.push("/issues");
      },
    });
  };

  return (
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
          <Button type="primary" onClick={() => form.submit()}>
            본문저장
          </Button>
          <Button className="ml-2" onClick={cancelIssues}>
            취소
          </Button>
        </div>
      </div>
      <Spin spinning={isLoading}>
        <Form form={form} onFinish={handleFinish}>
          <SearchForm className="">
            <Descriptions bordered className="issuesDetail" column={4}>
              <Descriptions.Item label="프로젝트" span={2}>
                {issuesDetail?.issueInfo[0]?.project_name}
              </Descriptions.Item>
              <Descriptions.Item label="요청사항" span={2}>
                <FormItem name="issue_request_type">
                  <Select className="!w-[110px]">
                    {issuesDetail?.issueRequest.map((request) => (
                      <Option key={request.code_id} value={request.code_id}>
                        {request.code_name}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
              </Descriptions.Item>
              <Descriptions.Item label="솔루션" span={2}>
                {issuesDetail?.issueInfo[0]?.nexcore_solution_name}
              </Descriptions.Item>
              <Descriptions.Item label="상태" span={1}>
                <FormItem name="issue_status">
                  <Select className="!w-[110px]">
                    {issuesDetail?.issueStatus.map((status) => (
                      <Option key={status.code_id} value={status.code_id}>
                        {status.code_name}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
              </Descriptions.Item>
              <Descriptions.Item label="작성자" span={1}>
                {issuesDetail?.issueInfo[0]?.crtr_name}
              </Descriptions.Item>
              <Descriptions.Item label="담당자" span={2}>
                <FormItem name="charger">
                  <Select
                    className="!w-[100%]"
                    mode="multiple"
                    options={authOptions}
                  ></Select>
                </FormItem>
              </Descriptions.Item>
              <Descriptions.Item label="등록일시" span={1}>
                {issuesDetail?.issueInfo[0]?.crtr_dt}
              </Descriptions.Item>
              <Descriptions.Item label="수정일시" span={1}>
                {issuesDetail?.issueInfo[0]?.upd_dt}
              </Descriptions.Item>
              <Descriptions.Item label="제목" span={4}>
                <FormItem name="issue_name" className="!mb-0">
                  <Input placeholder="제목을 입력하세요." />
                </FormItem>
              </Descriptions.Item>
              <Descriptions.Item label="내용" span={4}>
                <IssuesModifyQuill detail={detail} setDetail={setDetail} />
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
                <FormItem name="file">
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>파일을 선택하세요</Button>
                  </Upload>
                </FormItem>
              </Descriptions.Item>
            </Descriptions>
          </SearchForm>
        </Form>
      </Spin>
    </div>
  );
};

export default IssuesModifyContainer;
