import { Form, FormItem, Input, Modal, useForm } from "@/components";
import { SearchForm } from "@/components/search";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef, useState } from "react";

import { Option, Select } from "@/common/Select";
import { useLazyGetProfileListQuery } from "@/features/main/redux/userApi";
import { AuthInfo } from "@/features/main/types";
import { Button, Tabs } from "antd";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import Draggable from "react-draggable";
import type { DraggableData, DraggableEvent } from "react-draggable";

interface IModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserInfoModal = ({ visible, setVisible }: IModalProps) => {
  const [selectedDatas, setSelectedDatas] = useState([]);
  const [products, setProducts] = useState<AuthInfo[]>([]);
  const [form] = useForm();
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.login.userInfo);
  const userInfoDetail = useAppSelector((state) => state.login.userInfoDetail);

  const [getProfile, { data: profileData, isFetching: profileIsFetching }] = useLazyGetProfileListQuery();

  // 팝업 열리면 데이터 호출
  useEffect(() => {
    if (visible) {
      getProfile({
        user_id: userInfoDetail?.jwt.user_id,
        jwt: token?.jwt,
        login_id: userInfoDetail?.jwt.user_id,
      });
    }
  }, [getProfile, token?.jwt, userInfoDetail?.jwt.user_id, visible]);

  // profileData.myInfo가 업데이트될 때마다 폼 데이터 업데이트
  useEffect(() => {
    if (profileData?.myInfo) {
      form.setFieldsValue({
        user_id: profileData.myInfo[0]?.user_id,
        user_name: profileData.myInfo[0]?.user_name,
        email: profileData.myInfo[0]?.email,
        phone_number: profileData.myInfo[0]?.phone_number,
        company: profileData.myInfo[0]?.company,
        project_name: profileData.myInfo[0]?.project_name,
        nexcore_solution_name: profileData.myInfo[0]?.nexcore_solution_name,
        auth_name: profileData.myInfo[0]?.auth_name,
        mail_active_status: profileData.myInfo[0]?.mail_active_status,
      });
    }
  }, [profileData?.myInfo, form]);

  useEffect(() => {
    if (profileData?.prjAuth) {
      setProducts(profileData?.prjAuth ?? []);
    }
  }, [profileData?.prjAuth]);

  const handleFinish = (v) => {
    console.log(v);
  };

  const modalOnCancelFun = () => {
    setVisible(false);
  };

  const modalOnOkFun = (r, e) => {
    // resetModal();
    form.submit();
    // setVisible(false);
  };

  /** 드래그기능 */
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);
  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <Modal
      title={
        <div
          className="cursor-move"
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
        >
          사용자 정보
        </div>
      }
      width={800}
      open={visible}
      onCancel={() => modalOnCancelFun()}
      onOk={(e) => modalOnOkFun(selectedDatas, e)}
      footer={[
        <Button key="save" type="primary" onClick={(e) => modalOnOkFun(selectedDatas, e)}>
          저장
        </Button>,
        <Button key="close" onClick={() => modalOnCancelFun()}>
          닫기
        </Button>,
      ]}
      modalRender={(modal) => (
        <Draggable disabled={disabled} bounds={bounds} onStart={(event, uiData) => onStart(event, uiData)}>
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
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
                  <FormItem label="프로젝트" name="project_name">
                    <Input disabled />
                  </FormItem>
                  <FormItem label="PMS PLUS 사용 제품" name="nexcore_solution_name">
                    <Input disabled />
                  </FormItem>
                  <FormItem label="권한" name="auth_name">
                    <Input disabled />
                  </FormItem>
                  <FormItem label="메일 알림" name="mail_active_status">
                    <Select>
                      <Option value="Y">활성</Option>
                      <Option value="N">비활성</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="비밀번호" name="password">
                    <Input placeholder="비밀번호를 변경할 시에만 입력하세요." />
                  </FormItem>
                  <FormItem label="비밀번호 확인" name="passwordCheck">
                    <Input placeholder="최소한 8글자 이상, 특수문자/영문/숫자 모두 포함되어야 합니다." />
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
  );
};
export default UserInfoModal;
