import { Form, Input, Modal, useForm } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";

import { FormItem, Space } from "@/common";
import { Option, Select } from "@/common/Select";
import { useModal } from "@/components/Modal";
import { Button, DatePicker, Descriptions } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import axios from "axios";
const { RangePicker } = DatePicker;

interface IModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  ipRowData: any;
}

const IpDetailModal = ({ visible, setVisible, ipRowData }: IModalProps) => {
  const [form] = useForm();
  const [modal, contextHolder] = useModal();
  const [selectedDatas, setSelectedDatas] = useState([]);
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.login.userInfo);
  const userInfoDetail = useAppSelector((state) => state.login.userInfoDetail);

  const handleFinish = (v) => {
    const startDte = dayjs(v.StartDte).format("YYYYMMDD");
    const expriyDte = dayjs(v.ExpiryDte).format("YYYYMMDD");

    console.log({
      ...v,
      startDte: startDte,
      expriyDte: expriyDte,
      ip_uid: ipRowData.ip_uid,
    });

    const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
        <request>
          <transaction>
            <id>common.BCLicenseManager2#pmCreateLicense</id>
          </transaction>
          <attributes>
            <customer_uid>${v.customerName}</customer_uid>
            <mac_address>${v.macAddress}</mac_address>
            <host_ip>${v.host_ip}</host_ip>
            <ip_uid>${ipRowData.ip_uid}</ip_uid>
          </attributes>
          <dataSet>
            <fields>
              <start_dt>${startDte}</start_dt>
              <expriy_dt>${expriyDte}</expriy_dt>
              <type>ip</type>
              <sub_type>ip_mod</sub_type>
            </fields>
          </dataSet>
          <validation>
            <result>true</result>
            <errors/>
          </validation>
        </request>`;
    const url =
      "/api/coverdreamit/web/common/BCLicenseManager2/pmCreateLicense.xmd";

    modal.confirm({
      title: "수정하시겠습니까?",
      onOk() {
        axios
          .post(url, xmlData, {
            headers: {
              Accept: "application/xml, text/xml, */*; q=0.01",
              "Content-Type": "text/xml; charset=UTF-8",
              "X-Requested-With": "XMLHttpRequest",
            },
          })
          .then((response) => {
            // 성공적인 응답 처리
            console.log(response.data);
          })
          .catch((error) => {
            // 오류 처리
            console.log(error);
          });
      },
    });
  };
  const modalOnCancelFun = () => {
    setVisible(false);
  };

  const modalOnOkFun = () => {
    form.submit();
  };

  useEffect(() => {
    console.log(ipRowData);
  }, [ipRowData]);

  return (
    <>
      <Modal
        title="라이센스 발급"
        // width={1200}
        open={visible}
        onCancel={() => modalOnCancelFun()}
        onOk={modalOnOkFun}
        footer={[
          <Button key="save" type="primary" onClick={modalOnOkFun}>
            저장
          </Button>,
          <Button key="close" onClick={() => modalOnCancelFun()}>
            닫기
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={handleFinish}
          initialValues={{
            ...ipRowData,
            startDte: dayjs(ipRowData.start_dt),
            expriyDte: dayjs(ipRowData.expriy_dt),
          }}
        >
          <Descriptions bordered className="tal">
            <Descriptions.Item label="고객" span={3} className="required-label">
              <FormItem
                name="customer_uid"
                rules={[
                  {
                    required: true,
                    message: "선택해주세요",
                  },
                ]}
              >
                <Select className="!w-[200px]">
                  <Option value="0000000012">CDI</Option>
                  <Option value="0000000007">GSTIM</Option>
                  <Option value="0000000004">SKWELL</Option>
                  <Option value="0000000009">SK-증권금융_임시</Option>
                  <Option value="0000000008">디앤아이컨설팅</Option>

                  <Option value="0000000011">루키도</Option>
                  <Option value="0000000006">창의테크</Option>
                  <Option value="0000000010">카카오_임시</Option>
                  <Option value="0000000005">피엠에스플러스</Option>
                </Select>
              </FormItem>
            </Descriptions.Item>
            <Descriptions.Item label="IP" span={3} className="required-label">
              <FormItem
                name="host_ip"
                rules={[
                  {
                    required: true,
                  },
                  {
                    pattern:
                      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                    message: "유효한 IP 주소를 입력하세요.",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Descriptions.Item>
            <Descriptions.Item
              label="MAC Address"
              span={3}
              className="required-label"
            >
              <FormItem
                name="mac_address"
                rules={[
                  { required: true },
                  {
                    pattern:
                      /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\.[0-9a-fA-F]{4}\.[0-9a-fA-F]{4})$/,
                    message: "올바른 MAC 주소 형식이 아닙니다.",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Descriptions.Item>
            <Descriptions.Item
              label="Start Date"
              span={3}
              className="required-label"
            >
              <Space className="block">
                <FormItem
                  name="startDte"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    presets={[
                      {
                        label: "어제",
                        value: dayjs().add(-1, "d"),
                      },
                      {
                        label: "오늘",
                        value: dayjs(),
                      },
                      {
                        label: "내일",
                        value: dayjs().add(1, "d"),
                      },
                      {
                        label: "7일",
                        value: dayjs().add(7, "d"),
                      },
                      {
                        label: "1개월",
                        value: dayjs().add(1, "month"),
                      },
                    ]}
                  />
                </FormItem>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item
              label="Expiry Date"
              span={3}
              className="required-label"
            >
              <Space>
                <FormItem
                  name="expriyDte"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    presets={[
                      {
                        label: "어제",
                        value: dayjs().add(-1, "d"),
                      },
                      {
                        label: "오늘",
                        value: dayjs(),
                      },
                      {
                        label: "내일",
                        value: dayjs().add(1, "d"),
                      },
                      {
                        label: "7일",
                        value: dayjs().add(7, "d"),
                      },
                      {
                        label: "1개월",
                        value: dayjs().add(1, "month"),
                      },
                    ]}
                  />
                </FormItem>
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Form>
      </Modal>
      {contextHolder}
    </>
  );
};
export default IpDetailModal;
