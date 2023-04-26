import { Form, FormItem, Input, Button, useForm, Space } from "@/common";
import { Option, Select } from "@/common/Select";
import {
    SearchForm,
    SearchFormBox,
    SearchFormControls,
} from "@/components/search";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";
import { setSearchParams } from "../../redux/codeSlice";
import { CodeMgtReq } from "../../types";
const CodeMgtSearch = () => {
    const [form] = useForm();
    const dispatch = useAppDispatch();

    const handleFinish = (v: CodeMgtReq) => {
        dispatch(
            setSearchParams({
                ...v,
            })
        );
    };

    return (
        <>
            <div className="mt-5 rounded-xl max-w-[85%] mx-auto border border-[#cdcdcd]">
                <div className="px-7 py-3 border-b-[1px] pb-2 bg-slate-100 rounded-t-xl">
                    검색
                </div>
                <div className="px-7 py-4">
                    <Form form={form} onFinish={handleFinish}>
                        <SearchForm className="flex justify-between ">
                            <SearchFormBox className="flex">
                                <FormItem className="mr-28" label="그룹코드명">
                                    <Space className="ml-5">
                                        <FormItem name="srch_code_group_id">
                                            <Select
                                                className="min-w-[200px]"
                                                defaultValue=""
                                            >
                                                <Option value="">(All)</Option>
                                                <Option value="GROUP_SOLUTION">
                                                    그룹솔루션
                                                </Option>
                                                <Option value="USER_AUTH">
                                                    사용자권한
                                                </Option>
                                                <Option value="SOLUTION">
                                                    솔루션
                                                </Option>
                                                <Option value="ISSUE_REQUEST_TYPE">
                                                    요청사항
                                                </Option>
                                                <Option value="ISSUE_STATUS">
                                                    처리상태
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Space>
                                </FormItem>
                                <FormItem label="코드명">
                                    <Space className="ml-5">
                                        <FormItem name="srch_code_name">
                                            <Input />
                                        </FormItem>
                                    </Space>
                                </FormItem>
                            </SearchFormBox>
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                            >
                                검색
                            </Button>
                        </SearchForm>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default CodeMgtSearch;
