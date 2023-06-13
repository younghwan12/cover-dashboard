import React, { useEffect, useState } from "react";
import SettingMgtQuill from "../SettingMgtQuill";
import { Descriptions, Tabs, Button } from "antd";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useAppSelector } from "@/redux/hooks";
import { useModal } from "@/components/Modal";
import {
  useLazyGetSettingDetailListQuery,
  useLazyGetSettingMenuListQuery,
  useLazyGetSettingMgtListQuery,
  useUpDateMenuListMutation,
  useUpDateSettingMgtListMutation,
} from "../../redux";
import { Form, FormItem, Input, useForm, Space } from "@/common";
import { SearchForm, SearchFormBox, SearchFormControls } from "@/components/search";
import { Option, Select } from "@/common/Select";

import { MenuListReq, SettingListReq } from "@/features/settingMgt/types";

const SettingMgtContainer = () => {
  const [codeId, setCodeId] = useState("");
  const [detail, setDetail] = useState("");
  const [disable, setDisable] = useState(true);
  const [modal, contextHolder] = useModal();
  const [form] = useForm();
  const [form2] = useForm();
  const token = useAppSelector((state) => state.login.userInfo);
  const userInfoDetail = useAppSelector((state) => state.login.userInfoDetail);

  const [getSettingList, { data: settingList, isFetching: isFetchingSetList }] = useLazyGetSettingMgtListQuery();

  const [getMenuList, { data: menuList, isFetching: isFetchingMenuList }] = useLazyGetSettingMenuListQuery();

  const [getSettingDetail, { data: settingDetail, isFetching }] = useLazyGetSettingDetailListQuery();

  const [upDateSetting] = useUpDateSettingMgtListMutation();

  const [upDateMenu] = useUpDateMenuListMutation();

  useEffect(() => {
    if (token?.jwt) {
      getSettingList({
        jwt: token?.jwt,
        login_id: userInfoDetail?.jwt?.user_id,
      });
    }
  }, [token?.jwt]);

  const detailSetting = (e) => {
    getSettingDetail({
      code_id: e.data.code_id,
      jwt: token.jwt,
      login_id: userInfoDetail.jwt.user_id,
    });
  };

  const detailMenu = (e) => {
    setDisable(false);
    form2.setFieldsValue({
      menu_name: e.data.menu_name,
      menu_ord: e.data.menu_ord,
      menu_desc: e.data.menu_desc,
      menu_id: e.data.menu_id,
    });
  };

  useEffect(() => {
    if (settingDetail) {
      setCodeId(settingDetail?.detailInfo[0].code_id);
      setDetail(settingDetail?.detailInfo[0].detail);
      form.setFieldsValue({
        use_yn: settingDetail?.detailInfo[0].use_yn,
      });
    }
  }, [settingDetail]);

  // 텍스트 변환
  const stripHtml = (html) => {
    const tmp = document.createElement("p");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const handleFinish = (v) => {
    if (codeId !== "") {
      const formData: SettingListReq = {
        code_id: codeId,
        use_yn: v.use_yn,
        detail: stripHtml(detail),
        jwt: token.jwt,
        login_id: userInfoDetail.jwt.user_id,
      };
      modal.confirm({
        title: "저장하시겠습니까?",
        onOk() {
          upDateSetting(formData)
            .unwrap()
            .then((data) => {
              modal.success({
                title: "저장되었습니다.",
                onOk() {
                  setCodeId("");
                },
              });
            });
        },
      });
    } else {
      modal.error({
        title: "코드를 먼저 선택해 주세요.",
      });
    }
  };

  const handleFinish2 = (v) => {
    const formData: MenuListReq = {
      ...v,
      jwt: token.jwt,
      login_id: userInfoDetail.jwt.user_id,
    };
    modal.confirm({
      title: "저장하시겠습니까?",
      onOk() {
        upDateMenu(formData)
          .unwrap()
          .then((data) => {
            modal.success({
              title: "저장되었습니다.",
              onOk() {},
            });
          });
      },
    });
  };

  const changeDe = (e) => {
    if (e === "1") {
      getSettingList({
        jwt: token?.jwt,
        login_id: userInfoDetail?.jwt?.user_id,
      });
    } else if (e === "2") {
      getMenuList({
        jwt: token?.jwt,
        login_id: userInfoDetail?.jwt?.user_id,
      });
    }
  };

  return (
    <div className="mt-5 rounded-xl max-w-[85%] mx-auto">
      {contextHolder}
      <Tabs
        defaultActiveKey="1"
        onChange={(e) => changeDe(e)}
        type="card"
        items={[
          {
            key: "1",
            label: "요청사항 내용 템플릿",
            children: (
              <div className="flex justify-between">
                <DataTable
                  className="w-[35%]"
                  value={settingList?.list}
                  loading={isFetchingSetList}
                  stripedRows
                  lazy
                  rowHover
                  onRowClick={detailSetting}
                >
                  <Column field="no" header="No." className="!text-center"></Column>
                  <Column className="w-[65%] cursor-pointer text-blue-600" field="code_name" header="코드명"></Column>
                  <Column field="use_yn" header="사용여부" className="!text-center"></Column>
                </DataTable>
                <div className="w-[60%]">
                  <Form form={form} onFinish={handleFinish}>
                    <SearchForm>
                      <Descriptions bordered>
                        <Descriptions.Item label="코드명" span={3}>
                          {/* 코드명 */}
                          {settingDetail && settingDetail?.detailInfo[0].code_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="사용여부" span={3}>
                          <Space>
                            <FormItem name="use_yn">
                              <Select>
                                <Option value="N">N</Option>
                                <Option value="Y">Y</Option>
                              </Select>
                            </FormItem>
                          </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="내용" span={3}>
                          <SettingMgtQuill detail={detail} setDetail={setDetail} />
                        </Descriptions.Item>
                      </Descriptions>
                    </SearchForm>
                  </Form>
                  <div className="mt-5 text-center">
                    <Button type="primary" size="large" onClick={() => form.submit()}>
                      저장
                    </Button>
                  </div>
                </div>
              </div>
            ),
          },
          {
            key: "2",
            label: "메뉴 목록",
            children: (
              <div className="flex justify-between">
                <DataTable
                  loading={isFetchingMenuList}
                  className="w-[49%] Tleft"
                  value={menuList?.list}
                  stripedRows
                  lazy
                  rowHover
                  onRowClick={detailMenu}
                >
                  <Column className="cursor-pointer text-blue-600" field="menu_name2" header="메뉴명"></Column>
                  <Column field="menu_depth" header="메뉴 순서" className="!text-center"></Column>
                  <Column className="w-[60%]" field="menu_desc" header="화면설명"></Column>
                </DataTable>
                <div className="w-[49%]">
                  <Form form={form2} onFinish={handleFinish2}>
                    <SearchForm>
                      <Descriptions bordered className="desLeft">
                        <Descriptions.Item label="메뉴명" span={3} className="required-label whitespace-nowrap">
                          <FormItem name="menu_name">
                            <Input />
                          </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item className="required-label whitespace-nowrap" label="메뉴 순서" span={3}>
                          <FormItem name="menu_ord">
                            <Input />
                          </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item label="화면설명">
                          <FormItem name="menu_desc">
                            <Input />
                          </FormItem>
                          <FormItem name="menu_id" hidden>
                            <Input />
                          </FormItem>
                        </Descriptions.Item>
                      </Descriptions>
                      {/* <Button>저장</Button> */}
                    </SearchForm>
                    <div className="mt-5 text-center">
                      <Button type="primary" size="large" onClick={() => form2.submit()} disabled={disable}>
                        저장
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default SettingMgtContainer;
