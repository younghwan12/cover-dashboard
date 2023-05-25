import { Form, FormItem, Input, Space, useForm, useModal } from "@/common";
import { SearchForm, SearchFormBox } from "@/components/search";
import {
  useAddIssuesQAMutation,
  useDelFileListMutation,
  useLazyGetIssuesDetailQuery,
  useUpDateIssuesQAMutation,
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
import IssuesHistoryModal from "@/features/modal/IssuesHistoryModal";
import IssuesQaQuill from "../IssuesQaQuill";
import IssuesDetailQuill from "../IssuesDetailQuill";
import axios from "axios";

const IssuesDetailContainer = () => {
  const router = useRouter();
  const [modal, contextHolder] = useModal();
  const [visible, setVisible] = useState(false);
  const [hisVisible, setHisVisible] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [form] = useForm();
  const [detail2, setDetail2] = useState<string>("");

  const { issue_id } = router.query;

  const token = useAppSelector((state) => state.login.userInfo);
  const userInfoDetail = useAppSelector((state) => state.login.userInfoDetail);

  const [getDetail, { data: issuesDetail, isLoading }] = useLazyGetIssuesDetailQuery();

  const [delFile] = useDelFileListMutation();
  const [addQA] = useAddIssuesQAMutation();
  const [upDateQA] = useUpDateIssuesQAMutation();

  useEffect(() => {
    getDetail({
      project_no: "newsupport2",
      issue_id: issue_id,
      jwt: token?.jwt,
      login_id: userInfoDetail?.jwt?.user_id,
    });
  }, [token?.jwt, issue_id, userInfoDetail?.jwt?.user_id, addQA]);

  const answerIssues = () => {
    setVisible(true);
  };

  const [fileList, setFileList] = useState<any[]>([]);

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
      qa_type: issuesDetail?.qaInfo[issuesDetail?.qaInfo.length - 1]?.qa_type == "answer" ? "question" : "answer",
      detail: addDetail,
      jwt: token?.jwt,
      login_id: userInfoDetail?.jwt?.user_id,
    };
    modal.confirm({
      title: "저장하시겠습니까?",
      onOk() {
        addQA(v)
          .unwrap()
          .then((data) => {
            const fileData = new FormData();
            fileList.forEach((file) => {
              fileData.append("files", file.originFileObj);
            });
            fileData.append("project_no", "newsupport2");
            fileData.append("board_type", "issues");
            fileData.append("ui_id", String(issue_id));
            fileData.append("sub_ui_id", String(data.qa_id));
            fileData.append("jwt", token.jwt);
            fileData.append("login_id", userInfoDetail.jwt.user_id);

            axios
              .post("http://coverdreamit.co.kr:8001/file/upload", fileData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                setVisible(false);
                form.resetFields();
                modal.success({
                  title: "저장되었습니다.",
                  onOk() {
                    setFileList([]);
                  },
                });
              })
              .catch((error) => {
                // 파일 업로드 실패 시 처리
                console.log(error);
              });
          });
      },
    });
  };
  const [isHidden, setIsHidden] = useState(Array(30).fill(false));

  const createInitialDetailState = () => Array(30).fill("");
  const [detail, setDetail] = useState<string[]>(createInitialDetailState);

  const [addDetail, setAddDetail] = useState("");

  useEffect(() => {
    if (issuesDetail?.qaInfo) {
      const updatedDetail = [...detail];

      issuesDetail?.qaInfo.forEach((item, index) => {
        updatedDetail[index] = item.detail;
      });

      setDetail(updatedDetail);
    }
  }, [issuesDetail]);

  /** QA 수정 */
  const modiIssue = (index) => {
    const formData = {
      project_no: issuesDetail?.qaInfo[index + 1]?.project_no,
      issue_id: issuesDetail?.qaInfo[index + 1]?.issue_id,
      qa_id: issuesDetail?.qaInfo[index + 1]?.qa_id,
      detail: issuesDetail?.qaInfo[index + 1]?.detail,
      jwt: token.jwt,
      login_id: userInfoDetail.jwt.user_id,
    };
    console.log(issuesDetail);
    modal.confirm({
      title: "저장하시겠습니까?",
      onOk() {
        upDateQA(formData)
          .unwrap()
          .then((data) => {
            if (fileList.length > 0) {
              const fileData = new FormData();
              fileList.forEach((file) => {
                fileData.append("files", file.originFileObj);
              });
              fileData.append("project_no", String(issuesDetail?.qaInfo[index + 1]?.project_no));
              fileData.append("board_type", "issues");
              fileData.append("ui_id", String(issuesDetail?.qaInfo[index + 1]?.issue_id));
              fileData.append("sub_ui_id", String(issuesDetail?.qaInfo[index + 1]?.qa_id));
              fileData.append("jwt", token.jwt);
              fileData.append("login_id", userInfoDetail.jwt.user_id);

              axios
                .post("http://coverdreamit.co.kr:8001/file/upload", fileData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((response) => {
                  // 파일 업로드 성공 시
                  console.log(response);
                  modal.success({
                    title: "저장되었습니다.",
                    onOk() {
                      setFileList([]);
                    },
                  });
                })
                .catch((error) => {
                  // 파일 업로드 실패 시 처리
                  console.log(error);
                });
            } else {
              modal.success({
                title: "저장되었습니다.",
                onOk() {},
              });
            }
          });
      },
    });
  };

  return (
    <>
      <div className="mt-5 rounded-xl max-w-[80%] mx-auto">
        <div className="pt-7 pb-2 flex justify-between items-center ">
          <div>
            <Button className="bg-gray-200" onClick={() => setHisVisible(true)}>
              이력
            </Button>
            <Button className="bg-gray-200" onClick={() => router.push("/issues")}>
              목록
            </Button>
          </div>
          <div>
            <Button onClick={() => router.push(`/issues/modify?issue_id=${issue_id}`)}>본문수정</Button>
            <Button type="primary" className="ml-2" onClick={answerIssues}>
              {issuesDetail?.qaInfo[issuesDetail?.qaInfo.length - 1]?.qa_type == "answer" ? "재 질문" : "답변"}
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
              {issuesDetail?.fileInfo
                .filter((file) => file.sub_ui_id === "1")
                .map((file, index) => (
                  <div key={index} className="flex items-center text-[#888] text-[12px]">
                    <div>
                      <span
                        onClick={() => handleFileDownload(file.file_uid, file.file_name)}
                        className="mr-1 text-[#007bff] cursor-pointer"
                      >
                        {file.file_name}
                      </span>
                      {formatFileSize(parseInt(file.file_size))}
                    </div>
                    <BsTrash className="mx-1 cursor-pointer" onClick={() => handleFileDelete(file)} />
                    <div>
                      {file.crtr_name}, {file.crtr_dt}
                    </div>
                  </div>
                ))}
            </Descriptions.Item>
          </Descriptions>
        </Spin>
      </div>

      {issuesDetail?.qaInfo
        .filter((file) => file.qa_id !== "1")
        .map((qa, index) => (
          <div key={index} className="rounded-xl max-w-[80%] mx-auto border-t-[1px]">
            <div className="bg-[#F3F3F3]">
              <div className="p-2 border-b-[1px] border-[#E0E0E0]">
                {qa.qa_type === "answer" ? (
                  <>
                    <Image
                      className="px-2 inline-block"
                      alt="icon_in"
                      width="37"
                      height="19"
                      src="/images/icon_in.png"
                    />
                    <span>답변</span>
                    <span className="!float-right text-sm">{`${qa.upd_name}(${qa.upd_id}), ${qa.upd_dt}`}</span>
                  </>
                ) : (
                  <>
                    <i className="fa fa-quora mr-2 !inline-block" aria-hidden="true"></i>
                    <span>재 질문</span>
                    <span className="!float-right text-sm">{`${qa.upd_name}(${qa.upd_id}), ${qa.upd_dt}`}</span>
                  </>
                )}
              </div>
              <div className="py-3 px-3 border-y-2">
                <div>
                  <div className="relative">
                    <div
                      className={`absolute left-0 top-0 w-full h-full bg-[#F3F3F3] z-10 ${
                        isHidden[index] ? "hidden" : ""
                      }`}
                      dangerouslySetInnerHTML={{ __html: qa.detail }}
                    ></div>
                    <Image
                      className={`absolute right-1 top-1 z-20 cursor-pointer ${isHidden[index] ? "hidden" : ""}`}
                      alt="icon_sm_update"
                      width="370"
                      height="190"
                      src="/images/icon_sm_update.png"
                      onClick={() => {
                        const updatedHidden = [...isHidden];
                        updatedHidden[index] = true;
                        setIsHidden(updatedHidden);
                      }}
                    />
                    <IssuesQaQuill detail={detail[index]} index={index} setDetail={setDetail} />
                  </div>

                  <span className="text-sm">첨부파일</span>
                  {issuesDetail?.fileInfo
                    .filter((file) => file.sub_ui_id === qa.qa_id)
                    .map((file, fileIndex) => (
                      <div key={fileIndex} className="flex items-center text-[#888] text-[12px]">
                        <div>
                          <span
                            onClick={() => handleFileDownload(file.file_uid, file.file_name)}
                            className="mr-1 text-[#007bff] cursor-pointer"
                          >
                            {file.file_name}
                          </span>
                          {formatFileSize(parseInt(file.file_size))}
                        </div>
                        <BsTrash className="mx-1 cursor-pointer" onClick={() => handleFileDelete(file)} />
                        <div>
                          {file.crtr_name}, {file.crtr_dt}
                        </div>
                      </div>
                    ))}
                  {isHidden[index] && (
                    <>
                      <Upload {...props} className="pb5">
                        <Button icon={<UploadOutlined />}>파일을 선택하세요</Button>
                      </Upload>
                      <div className="border-t-[1px] pt-2">
                        <div className="text-right">
                          <Button
                            className="!mr-2"
                            onClick={() => {
                              const updatedHidden = [...isHidden];
                              updatedHidden[index] = false;
                              setIsHidden(updatedHidden);
                            }}
                          >
                            취소
                          </Button>
                          <Button
                            type="primary"
                            onClick={() => {
                              modiIssue(index);
                            }}
                          >
                            저장
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

      {visible && (
        <div className="rounded-xl max-w-[80%] mx-auto">
          <Form form={form} onFinish={handleFinish} initialValues={{ issue_status: "001" }}>
            <div className="bg-[#F3F3F3]">
              <div className="p-2 flex border-b-[1px] border-[#E0E0E0]">
                {issuesDetail?.qaInfo[issuesDetail?.qaInfo.length - 1].qa_type == "answer" ? (
                  <span className="font-bold">
                    재 질문 : <em className="not-italic font-normal"> {userInfoDetail.user_name}</em>
                  </span>
                ) : (
                  <>
                    <Image className="px-2" alt="icon_in" width="37" height="19" src="/images/icon_in.png" />
                    <span className="font-bold">
                      답변 : <em className="not-italic font-normal"> {userInfoDetail.user_name}</em>
                    </span>
                  </>
                )}
              </div>
              <div className="pl-[40px] py-2 px-1">
                <div className="border-l-[2px] border-[#CECECE] px-2">
                  <FormItem>
                    <IssuesDetailQuill detail={addDetail} setDetail={setAddDetail} />
                  </FormItem>
                  <FormItem>
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>파일을 선택하세요</Button>
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
                      <Button className="!mr-2" onClick={() => setVisible(false)}>
                        취소
                      </Button>
                      <Button type="primary" onClick={() => form.submit()}>
                        {issuesDetail?.qaInfo[issuesDetail?.qaInfo.length - 1].qa_type == "answer"
                          ? "재 질문 저장"
                          : "답변 저장"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}

      {contextHolder}
      <IssuesHistoryModal
        visible={hisVisible}
        setVisible={setHisVisible}
        issueId={String(issue_id)}
        projectNo={(issuesDetail && issuesDetail?.issueInfo[0]?.project_no) || ""}
      />
    </>
  );
};

export default IssuesDetailContainer;
