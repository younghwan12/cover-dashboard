import { Form, FormItem, Input, Space, useForm } from "@/common";
import { Option, Select } from "@/common/Select";
import { SearchForm } from "@/components/search";
import { Button, Descriptions, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { useModal } from "@/common";
import { useRouter } from "next/router";
import IssuesAddQuill from "../IssuesAddQuill";
import { useUpDateFileListMutation, useUpDateIssuesMgtListMutation } from "@/features/issues/redux";
import { UpdateIssuesListReq } from "@/features/issues/types";
import { useAppSelector } from "@/redux/hooks";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import axios from "axios";

const IssuesAddContainer = () => {
  const router = useRouter();
  const [modal, contextHolder] = useModal();
  const [form] = useForm();
  const [detail, setDetail] = useState("");

  const token = useAppSelector((state) => state.login.userInfo);
  const userInfoDetail = useAppSelector((state) => state.login.userInfoDetail);

  const [fileList, setFileList] = useState<any[]>([]);

  const handleFileChange = (info) => {
    setFileList(info.fileList);
  };

  const [upDateIssues] = useUpDateIssuesMgtListMutation();

  const [upDateFiles] = useUpDateFileListMutation();

  const props: UploadProps = {
    name: "file",
    // action: "http://coverdreamit.co.kr:8001/file/upload",
    beforeUpload: () => false,
    onChange: handleFileChange,
  };

  const handleFinish = (v) => {
    const formData: UpdateIssuesListReq = {
      ...v,
      project_no: "newsupport2",
      create_route: "newsupport",
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
              upDateIssues(formData)
                .unwrap()
                .then((data) => {
                  const fileData = new FormData();
                  fileList.forEach((file) => {
                    fileData.append("files", file.originFileObj);
                  });
                  fileData.append("project_no", "newsupport2");
                  fileData.append("board_type", "issues");
                  fileData.append("ui_id", String(data.issue_id));
                  fileData.append("sub_ui_id", "1");
                  fileData.append("jwt", token.jwt);
                  fileData.append("login_id", userInfoDetail.jwt.user_id);

                  axios
                    .post("http://coverdreamit.co.kr:8001/file/upload", fileData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    })
                    .then((response) => {
                      modal.success({
                        title: "저장되었습니다.",
                        onOk() {
                          router.push("/issues");
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
        <Button className="bg-gray-200" onClick={goIssues}>
          목록
        </Button>
        <div>
          <Button type="primary" onClick={() => form.submit()}>
            저장
          </Button>
          <Button className="ml-2" onClick={cancelIssues}>
            취소
          </Button>
        </div>
      </div>
      <Form form={form} onFinish={handleFinish}>
        <SearchForm className="w100">
          <Descriptions bordered className="issuesAdd">
            <Descriptions.Item label="프로젝트" span={3}>
              KB IQ+ 빌드배포테스트 자동화 시스템 구축 프로젝트
            </Descriptions.Item>
            <Descriptions.Item label="솔루션" span={3}>
              J2EE Framework, C Framework
            </Descriptions.Item>
            <Descriptions.Item label="요청사항" className="required-label" span={3}>
              <Space>
                <FormItem name="issue_request_type" className="!mb-0">
                  <Select className="min-w-[150px]">
                    <Option value="001">기술 문의</Option>
                    <Option value="002">장애 문의</Option>
                    <Option value="003">License 문의</Option>
                    <Option value="004">기능 개선</Option>
                    <Option value="005">사업지원 문의</Option>
                    <Option value="006">설치 문의</Option>
                    <Option value="007">교육 문의</Option>
                    <Option value="008">기타 문의</Option>
                  </Select>
                </FormItem>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="제목" className="required-label" span={3}>
              <FormItem name="issue_name" className="!mb-0">
                <Input placeholder="제목을 입력하세요." />
              </FormItem>
            </Descriptions.Item>
            <Descriptions.Item label="내용" className="required-label" span={3}>
              <IssuesAddQuill detail={detail} setDetail={setDetail} />
            </Descriptions.Item>
            <Descriptions.Item label="첨부파일">
              <FormItem name="file">
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>파일을 선택하세요</Button>
                </Upload>
              </FormItem>
            </Descriptions.Item>
          </Descriptions>
        </SearchForm>
      </Form>
    </div>
  );
};

export default IssuesAddContainer;
