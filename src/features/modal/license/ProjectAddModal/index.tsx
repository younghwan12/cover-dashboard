import { Form, Input, Modal, useForm } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";

import { useModal } from "@/components/Modal";
import { Button, DatePicker, Descriptions } from "antd";
import { FormItem, Space } from "@/common";
import { Option, Select } from "@/common/Select";

interface IModalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectAddModal = ({ visible, setVisible }: IModalProps) => {
    const [form] = useForm();
    const [modal, contextHolder] = useModal();
    const [selectedDatas, setSelectedDatas] = useState([]);
    const dispatch = useAppDispatch();

    const token = useAppSelector((state) => state.login.userInfo);
    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    const handleFinish = (v) => {
        console.log({
            ...v,
        });
    };
    const modalOnCancelFun = () => {
        setVisible(false);
    };

    const modalOnOkFun = () => {
        form.submit();
    };

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
                    initialValues={{ IP: "0.0.0.0" }}
                >
                    <Descriptions bordered className="tal">
                        <Descriptions.Item
                            label="고객"
                            span={3}
                            className="required-label"
                        >
                            <FormItem
                                name="고객"
                                rules={[
                                    {
                                        required: true,
                                        message: "선택해주세요",
                                    },
                                ]}
                            >
                                <Select className="!w-[200px]">
                                    <Option value="CDI">CDI</Option>
                                    <Option value="GSTIM">GSTIM</Option>
                                    <Option value="SKWELL">SKWELL</Option>
                                </Select>
                            </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="IP"
                            span={3}
                            className="required-label"
                        >
                            <FormItem
                                name="IP"
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
                                <Select className="!w-[200px]">
                                    <Option value="0.0.0.0">0.0.0.0</Option>
                                    <Option value="110.111.12.1">
                                        110.111.12.1
                                    </Option>
                                    <Option value="110.111.133.2">
                                        110.111.133.2
                                    </Option>
                                    <Option value="110.120.10.12">
                                        110.120.10.12
                                    </Option>
                                </Select>
                            </FormItem>
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="Project Number"
                            span={3}
                            className="required-label"
                        >
                            <FormItem
                                name="projectNum"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    {
                                        message:
                                            "숫자만 입력해주시기 바랍니다.",
                                        pattern: /^\d+$/,
                                    },
                                ]}
                            >
                                <Input />
                            </FormItem>
                        </Descriptions.Item>
                    </Descriptions>
                </Form>
            </Modal>
            {contextHolder}
        </>
    );
};
export default ProjectAddModal;
