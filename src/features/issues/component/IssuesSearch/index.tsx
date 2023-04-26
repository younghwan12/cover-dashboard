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
const IssuesSearch = () => {
    const [form] = useForm();
    const dispatch = useAppDispatch();

    const handleFinish = (v) => {
        // dispatch(
        //     setSearchParams({
        //         ...v,
        //     })
        // );
    };

    return (
        <>
            <div className="mt-5 rounded-xl max-w-[85%] mx-auto border border-[#cdcdcd]">
                <div className="px-7 py-3 border-b-[1px] pb-2 bg-slate-100 rounded-t-xl">
                    검색
                </div>
                <div className="px-7 py-4">
                    <Form form={form} onFinish={handleFinish}>
                        <SearchForm>
                            <SearchFormBox className="flex justify-between">
                                <FormItem label="요청사항">
                                    <Space className="ml-5">
                                        <FormItem name="srch_issue_request_type">
                                            <Select
                                                className="min-w-[200px]"
                                                defaultValue=""
                                            >
                                                <Option value="">(All)</Option>
                                                <Option value="001">
                                                    기술 문의
                                                </Option>
                                                <Option value="002">
                                                    장애 문의
                                                </Option>
                                                <Option value="003">
                                                    License 문의
                                                </Option>
                                                <Option value="004">
                                                    기능 개선
                                                </Option>
                                                <Option value="005">
                                                    사업지원 문의
                                                </Option>
                                                <Option value="006">
                                                    설치 문의
                                                </Option>
                                                <Option value="007">
                                                    교육 문의
                                                </Option>
                                                <Option value="008">
                                                    기타 문의
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Space>
                                </FormItem>
                                <FormItem label="상태">
                                    <Space className="ml-5">
                                        <FormItem name="srch_issue_request_type">
                                            <Select
                                                className="min-w-[200px]"
                                                defaultValue=""
                                            >
                                                <Option value="">(All)</Option>
                                                <Option value="001">
                                                    요청중
                                                </Option>
                                                <Option value="002">
                                                    담당자 접수
                                                </Option>
                                                <Option value="003">
                                                    담당자 진행중
                                                </Option>
                                                <Option value="004">
                                                    답변 완료
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Space>
                                </FormItem>
                                <FormItem label="담당자">
                                    <Space className="ml-5">
                                        <FormItem name="srch_charger">
                                            <Select
                                                className="min-w-[200px]"
                                                defaultValue=""
                                            >
                                                <Option value="">(All)</Option>
                                                <Option value="001">
                                                    NEXCORE J2EE Framework
                                                    담당자
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Space>
                                </FormItem>

                                <FormItem label="제목">
                                    <Space className="ml-5">
                                        <FormItem name="srch_issue_name">
                                            <Input />
                                        </FormItem>
                                    </Space>
                                </FormItem>
                            </SearchFormBox>
                            <Button
                                className="mx-auto block"
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

export default IssuesSearch;
