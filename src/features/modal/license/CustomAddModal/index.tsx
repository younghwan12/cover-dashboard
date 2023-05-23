import { Form, Input, Modal, useForm } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";

import { useModal } from "@/components/Modal";
import { Button, Descriptions } from "antd";

interface IModalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomAddModal = ({ visible, setVisible }: IModalProps) => {
    const [form] = useForm();
    const [modal, contextHolder] = useModal();
    const [selectedDatas, setSelectedDatas] = useState([]);
    const dispatch = useAppDispatch();

    const token = useAppSelector((state) => state.login.userInfo);
    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    const handleFinish = (v) => {};
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
                <Form form={form} onFinish={handleFinish}>
                    <Descriptions bordered>
                        <Descriptions.Item
                            label="고객"
                            span={3}
                            className="required-label"
                        >
                            <Input />
                        </Descriptions.Item>
                    </Descriptions>
                </Form>
            </Modal>
            {contextHolder}
        </>
    );
};
export default CustomAddModal;
