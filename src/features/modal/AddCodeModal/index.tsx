import { Form, FormItem, Input, Modal, useForm } from "@/components";
import { SearchForm } from "@/components/search";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";

import { Option, Select } from "@/common/Select";
import { useModal } from "@/components/Modal";
import { AuthInfo } from "@/features/main/types";
import { Button } from "antd";

import { useAddCodeListMutation } from "@/features/codeMgt/redux";
import { DefaultOptionType } from "antd/es/select";
import { AddCodeMgtReq } from "@/features/codeMgt/types";

interface IModalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCodeModal = ({ visible, setVisible }: IModalProps) => {
    const [form] = useForm();
    const [modal, contextHolder] = useModal();
    const [selectedDatas, setSelectedDatas] = useState([]);
    const dispatch = useAppDispatch();
    const [groupCdName, SetgroupCdName] = useState<string>("그룹솔루션");

    const token = useAppSelector((state) => state.login.userInfo);
    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    const [addCode] = useAddCodeListMutation();

    const handleFinish = (v) => {
        console.log("v", v);
        console.log("Selected value:", groupCdName);

        const regex = /^[0-9]*$/;
        if (!v.code_id) {
            modal.warning({
                title: "코드ID를 입력해 주세요.",
            });
        } else if (!v.code_name) {
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
            // const formData = new FormData();
            // formData.append("code_group_id", v.code_group_id);
            // formData.append("code_group_name", groupCdName);
            // formData.append("code_id", v.code_id);
            // formData.append("code_name", v.code_name);
            // formData.append("parent_code_group_id", "");
            // formData.append("mapping_code", "");
            // formData.append("code_order", v.code_order);
            // formData.append("use_yn", v.use_yn);
            // formData.append("jwt", token.jwt);
            // formData.append("login_id", userInfoDetail.jwt.user_id);

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
                    addCode(formData)
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

    useEffect(() => {
        form.setFieldsValue({
            code_group_id: "GROUP_SOLUTION",
            use_yn: "Y",
        });
    }, []);

    const modalOnCancelFun = () => {
        setVisible(false);
    };

    const modalOnOkFun = (r, e) => {
        form.submit();
        // setVisible(false);
    };

    return (
        <>
            <Modal
                title="코드 정보"
                width={700}
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
                    <SearchForm>
                        <FormItem
                            label="그룹코드"
                            name="code_group_id"
                            required={true}
                        >
                            <Select
                                onChange={(value, option: any) => {
                                    SetgroupCdName(option?.label);
                                }}
                            >
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
                        <FormItem label="코드ID" name="code_id" required={true}>
                            <Input />
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
export default AddCodeModal;
