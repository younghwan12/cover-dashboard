import { Form, FormItem, Input, Modal, useForm } from "@/components";
import { SearchForm } from "@/components/search";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";

import { Option, Select } from "@/common/Select";
import { AuthInfo } from "@/features/main/types";
import { Button, Tabs } from "antd";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import {
  useDelUserMutation,
  useLazyGetUserMgtDetailQuery,
  useUpDateUserMgtListMutation,
} from "@/features/userMgt/redux";
import { useModal } from "@/components/Modal";
import { prjList } from "@/features/userMgt/types";

interface IModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  rowData: any;
}

const UserInfoMgtModal = ({ visible, setVisible, rowData }: IModalProps) => {
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
  const [selectedDatas, setSelectedDatas] = useState([]);
  const [products, setProducts] = useState<prjList[]>([]);
  const [form] = useForm();
  const [modal, contextHolder] = useModal();
  const dispatch = useAppDispatch();
  const [selectedAuthes, setSelectedAuthes] = useState([]);

  const token = useAppSelector((state) => state.login.userInfo);
  const userInfoDetail = useAppSelector((state) => state.login.userInfoDetail);

  const [upDateUser] = useUpDateUserMgtListMutation();

  const [getDetail, { data: profile, isFetching: profileIsFetching }] = useLazyGetUserMgtDetailQuery();

  const [delUser] = useDelUserMutation();

  // 팝업 열리면 데이터 호출
  useEffect(() => {
    if (visible) {
      getDetail({
        user_id: rowData.user_id,
        jwt: token?.jwt,
        login_id: userInfoDetail?.jwt?.user_id,
      });
    }
  }, [getDetail, token?.jwt, userInfoDetail?.jwt.user_id, visible]);

  // profileData.myInfo가 업데이트될 때마다 폼 데이터 업데이트
  useEffect(() => {
    if (profile?.userInfo) {
      form.setFieldsValue({
        user_id: profile.userInfo[0]?.user_id,
        user_name: profile.userInfo[0]?.user_name,
        email: profile.userInfo[0]?.email,
        phone_number: profile.userInfo[0]?.phone_number,
        company: profile.userInfo[0]?.company,
        project_name: profile.userInfo[0]?.project_name,
        // 수정요망...
        nexcore_solution: profile.userInfo[0]?.nexcore_solution ? profile.userInfo[0]?.nexcore_solution.split(",") : [],
        auth: profile.userInfo[0]?.auth ? profile.userInfo[0]?.auth.split(",") : [],
        active_status: profile.userInfo[0]?.active_status,
        mail_active_status: profile.userInfo[0]?.mail_active_status,
        remarks: profile.userInfo[0]?.remarks,
        create_route: profile.userInfo[0]?.create_route,
      });
    }
  }, [profile?.userInfo, form]);

  useEffect(() => {
    if (profile?.prjAuth) {
      setProducts(profile?.prjAuth ?? []);
    }
  }, [profile?.prjAuth]);

  const handleFinish = (v) => {
    const result: Array<{ project_no: string; auth: string }> = [];

    profile?.prjAuth?.forEach((item) => {
      const authList = item?.auth?.split(",");
      const projectNo = item?.project_no;

      authList?.forEach((auth) => {
        result.push({
          project_no: projectNo!,
          auth: auth,
        });
      });
    });

    console.log(result);

    modal.confirm({
      title: "저장하시겠습니까?",
      onOk() {
        upDateUser({
          ...v,
          jwt: token.jwt,
          login_id: userInfoDetail.jwt.user_id,
          auth: v.auth ? v.auth.join(",") : "",
          pwd: v.password ? v.password : "",
          nexcore_solution: v.nexcore_solution ? v.nexcore_solution.join(",") : "",
          projects: JSON.stringify(result),
        })
          .unwrap()
          .then((data) => {
            modal.success({
              title: "저장되었습니다.",
              onOk() {
                setVisible(false);
              },
            });
          });
      },
    });
  };

  const modalOnCancelFun = () => {
    setVisible(false);
  };

  const modalOnOkFun = (r, e) => {
    form.submit();
  };

  const modalOnDeleteFun = () => {
    const formData = {
      user_id: rowData.user_id,
      jwt: token.jwt,
      login_id: userInfoDetail.jwt.user_id,
    };
    modal.confirm({
      title: "삭제하시겠습니까?",
      onOk() {
        delUser(formData)
          .unwrap()
          .then((data) => {
            modal.success({
              title: "삭제되었습니다.",
              onOk() {
                setVisible(false);
              },
            });
          });
      },
    });
  };

  return (
    <>
      <Modal
        title="사용자 정보"
        width={800}
        open={visible}
        onCancel={() => modalOnCancelFun()}
        onOk={(e) => modalOnOkFun(selectedDatas, e)}
        footer={[
          <Button key="save" type="primary" onClick={(e) => modalOnOkFun(selectedDatas, e)}>
            저장
          </Button>,
          <Button key="delete" type="dashed" onClick={() => modalOnDeleteFun()}>
            삭제
          </Button>,
          <Button key="close" onClick={() => modalOnCancelFun()}>
            닫기
          </Button>,
        ]}
      >
        <Tabs
          defaultActiveKey="1"
          type="card"
          items={[
            {
              label: "기본정보",
              key: "1",
              children: (
                <Form form={form} onFinish={handleFinish}>
                  <SearchForm>
                    <FormItem label="사용자 ID" name="user_id" required={true}>
                      <Input disabled />
                    </FormItem>
                    <FormItem label="이름" name="user_name" required={true}>
                      <Input />
                    </FormItem>
                    <FormItem label="메일" name="email" required={true}>
                      <Input />
                    </FormItem>
                    <FormItem label="연락처" name="phone_number" required={true}>
                      <Input />
                    </FormItem>
                    <FormItem label="회사" name="company" required={true}>
                      <Input />
                    </FormItem>
                    <FormItem label="프로젝트" name="project_name" required={true}>
                      <Input />
                    </FormItem>
                    <FormItem label="PMS PLUS 사용 제품" name="nexcore_solution" required={true}>
                      <Select mode="multiple">
                        <Option value="framework_j2ee">J2EE Framework</Option>
                        <Option value="framework_c">C Framework</Option>
                        <Option value="framework_dotnet">.NET Framework</Option>
                        <Option value="framework_open">Open Framework</Option>
                        <Option value="framework_batch">Batch Scheduler</Option>
                        <Option value="framework_nmp">NMP/NSWP</Option>
                        <Option value="alopex_ui">Alopex UI</Option>
                        <Option value="alopex_grid">Alopex Grid</Option>
                        <Option value="alopex_dash">Alopex Dash</Option>
                        <Option value="alopex_runtime">Alopex Runtime</Option>
                        <Option value="codeinspector_nci">NCI</Option>
                        <Option value="testmanage_ntm">NTM</Option>
                        <Option value="pims_its">ITS</Option>
                        <Option value="pims_pms">PMS</Option>
                        <Option value="pims_qms">QMS</Option>
                        <Option value="pims_tms">TMS</Option>
                        <Option value="pims_agile">AGILE</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="권한" name="auth" required={true}>
                      <Select mode="multiple" options={authOptions}></Select>
                    </FormItem>
                    <FormItem label="상태" name="active_status" required={true}>
                      <Select>
                        <Option value="wait">대기</Option>
                        <Option value="wait_transfer">대기(데이터 이관)</Option>
                        <Option value="active">활성</Option>
                        <Option value="inactive">비활성</Option>
                        <Option value="inactive_pw">비활성(비밀번호 입력오류)</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="메일 알림" name="mail_active_status">
                      <Select>
                        <Option value="Y">활성</Option>
                        <Option value="N">비활성</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="비고" name="remarks">
                      <Input />
                    </FormItem>

                    <FormItem label="비밀번호" name="password">
                      <Input placeholder="비밀번호를 변경할 시에만 입력하세요." />
                    </FormItem>
                    <FormItem label="비밀번호 확인" name="passwordCheck">
                      <Input placeholder="최소한 8글자 이상, 특수문자/영문/숫자 모두 포함되어야 합니다." />
                    </FormItem>
                    <FormItem label="등록경로" name="create_route">
                      <Input disabled />
                    </FormItem>
                  </SearchForm>
                </Form>
              ),
            },
            {
              label: "프로젝트 정보",
              key: "2",
              children: (
                <DataTable value={products} className="datatable-custom">
                  <Column field="project_name" header="프로젝트명" style={{ width: "35%" }}></Column>
                  <Column field="nexcore_solution_name" header="PMS PLUS 솔루션" style={{ width: "35%" }}></Column>
                  <Column field="auth_name" header="프로젝트 권한"></Column>
                </DataTable>
              ),
            },
          ]}
        />
      </Modal>
      {contextHolder}
    </>
  );
};
export default UserInfoMgtModal;
