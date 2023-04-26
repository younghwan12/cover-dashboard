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
import { setSearchParams } from "../../redux/usersSlice";
const UserMgtSearch = () => {
    const [form] = useForm();
    const dispatch = useAppDispatch();

    const handleFinish = (v) => {
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
                        <SearchForm>
                            <SearchFormBox className="flex justify-between">
                                <FormItem className="" label="그룹코드명">
                                    <Space className="ml-5 relative">
                                        <FormItem name="srch_project_no">
                                            <Select className="min-w-[200px]">
                                                <Option value="">(All)</Option>
                                                <Option value="newsupport1">
                                                    KB IQ+ 빌드배포테스트 자동화
                                                    시스템 구축 프로젝트
                                                </Option>
                                                <Option value="newsupport2">
                                                    나라키움 차세대 소스코드
                                                    점검 시스템 구축
                                                </Option>
                                            </Select>
                                        </FormItem>
                                        <Space className="absolute top-0">
                                            <Button>선택</Button>
                                        </Space>
                                    </Space>
                                </FormItem>
                                <FormItem label="사용자 ID">
                                    <Space className="ml-5">
                                        <FormItem name="srch_user_id">
                                            <Input />
                                        </FormItem>
                                    </Space>
                                </FormItem>
                                <FormItem label="이름">
                                    <Space className="ml-5">
                                        <FormItem name="srch_user_name">
                                            <Input />
                                        </FormItem>
                                    </Space>
                                </FormItem>
                            </SearchFormBox>
                            <SearchFormBox className="flex justify-between">
                                <FormItem className="" label="권한">
                                    <Space className="ml-5">
                                        <FormItem name="srch_auth">
                                            <Select className="min-w-[200px]">
                                                <Option value="">(All)</Option>
                                                <Option value="001">
                                                    프로젝트사용자
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Space>
                                </FormItem>
                                <FormItem label="피엠에스플러스 사용 제품">
                                    <Space className="ml-5">
                                        <FormItem name="srch_nexcore_solution">
                                            <Select className="min-w-[200px]">
                                                <Option value="framework_j2ee">
                                                    J2EE Framework
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Space>
                                </FormItem>
                                <FormItem label="상태">
                                    <Space className="ml-5">
                                        <FormItem name="srch_active_status">
                                            <Select className="min-w-[200px]">
                                                <Option value="wait">
                                                    대기
                                                </Option>
                                                <Option value="active">
                                                    활성
                                                </Option>
                                            </Select>
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

export default UserMgtSearch;
