import { Form, FormItem, Input, Modal, useForm } from "@/components";
import { SearchForm } from "@/components/search";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";

import { Option, Select } from "@/common/Select";
import { useModal } from "@/components/Modal";
import { AuthInfo } from "@/features/main/types";
import { Button } from "antd";

import {
    useAddCodeListMutation,
    useDelCodeMutation,
    useUpDateCodeListMutation,
} from "@/features/codeMgt/redux";
import { DefaultOptionType } from "antd/es/select";
import { AddCodeMgtReq, DelCode } from "@/features/codeMgt/types";

interface IModalProps {
    visible2: boolean;
    setVisible2: React.Dispatch<React.SetStateAction<boolean>>;
    rowData: any;
}

const DetailCodeModal = ({ visible2, setVisible2, rowData }: IModalProps) => {
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
                                    setVisible2(false);
                                    form.resetFields();
                                },
                            });
                        });
                },
            });
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            code_group_id: rowData.code_group_id,
            code_id: rowData.code_id,
            code_name: rowData.code_name,
            code_order: rowData.code_order,
            use_yn: rowData.use_yn,
        });
    }, [visible2]);

    const modalOnCancelFun = () => {
        setVisible2(false);
    };

    const modalOnOkFun = (r, e) => {
        form.submit();
        // setVisible(false);
    };
    const modalOnDeleteFun = () => {
        const formData: DelCode = {
            code_group_id: rowData.code_group_id,
            code_id: rowData.code_id,
            jwt: token.jwt,
            login_id: userInfoDetail.jwt.user_id,
        };

        modal.confirm({
            title: "삭제하시겠습니까?",
            onOk() {
                delCode(formData)
                    .unwrap()
                    .then((data) => {
                        modal.success({
                            title: "삭제되었습니다.",
                            onOk() {
                                setVisible2(false);
                            },
                        });
                    });
            },
        });
    };

    const handleCodeGroupIdChange = (value, option) => {
        setGroupCdName(option?.children || "");
    };

    return (
        <>
            <Modal
                title="코드 정보"
                width={700}
                open={visible2}
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
                    <Button
                        key="delete"
                        type="dashed"
                        onClick={() => modalOnDeleteFun()}
                    >
                        삭제
                    </Button>,
                    <Button key="close" onClick={() => modalOnCancelFun()}>
                        닫기
                    </Button>,
                ]}
            >
                <Form form={form} onFinish={handleFinish}>
                    <SearchForm>
                        <FormItem
                            label="그룹코드"
                            name="code_group_id"
                            required={true}
                        >
                            <Select onChange={handleCodeGroupIdChange} disabled>
                                <Option value="GROUP_SOLUTION">
                                    그룹솔루션
                                </Option>
                                <Option value="SOLUTION">솔루션</Option>
                                <Option value="ISSUE_STATUS">처리상태</Option>
                                <Option value="ISSUE_REQUEST_TYPE">
                                    요청사항
                                </Option>
                                <Option value="USER_AUTH">사용자권한</Option>
                            </Select>
                        </FormItem>
                        <FormItem name="code_group_name" hidden>
                            <Input value={groupCdName} />
                        </FormItem>
                        <FormItem label="코드ID" name="code_id" required={true}>
                            <Input disabled />
                        </FormItem>
                        <FormItem
                            label="코드명"
                            name="code_name"
                            required={true}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label="정렬순서"
                            name="code_order"
                            required={true}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label="사용여부"
                            name="use_yn"
                            required={true}
                        >
                            <Select>
                                <Option value="Y">Y</Option>
                                <Option value="N">N</Option>
                            </Select>
                        </FormItem>
                    </SearchForm>
                </Form>
            </Modal>
            {contextHolder}
        </>
    );
};
export default DetailCodeModal;
