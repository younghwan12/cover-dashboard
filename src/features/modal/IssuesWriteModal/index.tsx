import { Form, FormItem, Input, Modal, useForm } from "@/components";
import { SearchForm } from "@/components/search";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";

import { Option, Select } from "@/common/Select";
import { useModal } from "@/components/Modal";
import { AuthInfo } from "@/features/main/types";
import { Button, Descriptions } from "antd";

import {
    useAddCodeListMutation,
    useDelCodeMutation,
    useUpDateCodeListMutation,
} from "@/features/codeMgt/redux";
import { DefaultOptionType } from "antd/es/select";
import { AddCodeMgtReq, DelCode } from "@/features/codeMgt/types";
import { Space } from "@/common";

interface IModalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const IssuesWriteModal = ({ visible, setVisible }: IModalProps) => {
    const [form] = useForm();
    const [modal, contextHolder] = useModal();
    const [selectedDatas, setSelectedDatas] = useState([]);
    const dispatch = useAppDispatch();
    const [groupCdName, setGroupCdName] = useState<string>("그룹솔루션");

    const token = useAppSelector((state) => state.login.userInfo);
    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    const [upDateCode] = useUpDateCodeListMutation();

    const [delCode] = useDelCodeMutation();

    const handleFinish = (v) => {
        const regex = /^[0-9]*$/;
        if (!v.code_name) {
            modal.warning({
                title: "코드명을 입력해 주세요.",
            });
        } else if (!v.code_order) {
            modal.warning({
                title: "정렬순서를 입력해 주세요.",
            });
        } else if (!regex.test(v.code_order)) {
            modal.warning({
                title: "정렬순서는 숫자만 입력해 주세요.",
            });
        } else {
            const formData: AddCodeMgtReq = {
                ...v,
                code_group_name: groupCdName,
                parent_code_group_id: "",
                mapping_code: "",
                jwt: token.jwt,
                login_id: userInfoDetail.jwt.user_id,
            };

            modal.confirm({
                title: "저장하시겠습니까?",
                onOk() {
                    upDateCode(formData)
                        .unwrap()
                        .then((data) => {
                            modal.success({
                                title: "저장되었습니다.",
                                onOk() {
                                    setVisible(false);
                                    form.resetFields();
                                },
                            });
                        });
                },
            });
        }
    };
    const modalOnCancelFun = () => {
        setVisible(false);
    };

    const modalOnOkFun = (r, e) => {
        form.submit();
        // setVisible(false);
    };

    const handleCodeGroupIdChange = (value, option) => {
        setGroupCdName(option?.children || "");
    };

    return (
        <>
            <Modal
                title="문의 등록"
                width={1200}
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
                        <Descriptions.Item label="프로젝트" span={3}>
                            나라키움 차세대 소스코드 점검 시스템 구축
                        </Descriptions.Item>
                        <Descriptions.Item label="솔루션" span={3}>
                            J2EE Framework, NTM
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="요청사항"
                            span={3}
                            className="required-label"
                        >
                            <Select style={{ width: "210px" }}>
                                <Option value="Y">Y</Option>
                                <Option value="N">N</Option>
                            </Select>
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="제목"
                            span={3}
                            className="required-label"
                        >
                            <Input placeholder="제목을 입력하세요." />
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="내용"
                            span={3}
                            className="required-label"
                        >
                            <Input placeholder="제목을 입력하세요." />
                        </Descriptions.Item>
                        <Descriptions.Item label="첨부파일" span={3}>
                            <Input placeholder="제목을 입력하세요." />
                        </Descriptions.Item>
                    </Descriptions>
                </Form>
            </Modal>
            {contextHolder}
        </>
    );
};
export default IssuesWriteModal;
