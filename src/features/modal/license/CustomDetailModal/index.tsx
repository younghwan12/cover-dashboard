import { Form, Input, Modal, useForm } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";

import { useModal } from "@/components/Modal";
import { Button, Descriptions } from "antd";
import { FormItem } from "@/common";

interface IModalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    customRowData: any;
}

const CustomDetailModal = ({
    visible,
    setVisible,
    customRowData,
}: IModalProps) => {
    const [form] = useForm();
    const [modal, contextHolder] = useModal();
    const [selectedDatas, setSelectedDatas] = useState([]);
    const dispatch = useAppDispatch();

    const token = useAppSelector((state) => state.login.userInfo);
    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    const handleFinish = (v) => {
        console.log(v);
    };
    const modalOnCancelFun = () => {
        setVisible(false);
    };

    const modalOnOkFun = (r, e) => {
        form.submit();
    };

    return (
        <>
            <Modal
                title="라이센스 발급"
                // width={1200}
                open={visible}
                onCancel={() => modalOnCancelFun()}
                onOk={(e) => modalOnOkFun(selectedDatas, e)}
                footer={[
                    <Button
                        key="save"
                        type="primary"
                        onClick={(e) => modalOnOkFun(selectedDatas, e)}
                    >
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
                    initialValues={{ 고객: customRowData.고객 }}
                >
                    <Descriptions bordered>
                        <Descriptions.Item
                            label="고객"
                            span={3}
                            className="required-label"
                        >
                            <FormItem name="고객">
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
export default CustomDetailModal;
