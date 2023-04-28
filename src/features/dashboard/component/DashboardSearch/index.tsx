import {
    Form,
    FormItem,
    Input,
    Button,
    useForm,
    Space,
    RangePicker,
} from "@/common";
import { Option, Select } from "@/common/Select";
import {
    SearchForm,
    SearchFormBox,
    SearchFormControls,
} from "@/components/search";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { DatePicker, Checkbox } from "antd";
import { setSearchParams } from "../../redux/dashboardSlice";
// const { RangePicker } = DatePicker;

const DashboardSearch = () => {
    const [form] = useForm();
    const dispatch = useAppDispatch();
    const [rangePickerDisabled, setRangePickerDisabled] = useState(true);

    useEffect(() => {
        form.setFieldsValue({
            srch_project_no: "",
            srch_issue_request: "",
        });
    }, []);

    const handleFinish = (v) => {
        dispatch(
            setSearchParams({
                ...v,
            })
        );
    };

    const handleDateChange = (dates, dateStrings) => {
        console.log("Selected Range:", dates);
        console.log("Formatted Selected Range:", dateStrings);
    };

    const allDatePicker = (e) => {
        if (e.target.checked) {
            setRangePickerDisabled(true);
        } else {
            setRangePickerDisabled(false);
        }
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
                                <FormItem label="프로젝트">
                                    <Space className="ml-5">
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
                                <FormItem label="유형">
                                    <Space className="ml-5">
                                        <FormItem name="srch_issue_request">
                                            <Select className="min-w-[200px]">
                                                <Option value="">(All)</Option>
                                                <Option value="기술 문의">
                                                    기술 문의
                                                </Option>
                                                <Option value="장애 문의">
                                                    장애 문의
                                                </Option>
                                                <Option value="License 문의">
                                                    License 문의
                                                </Option>
                                                <Option value="기능 개선">
                                                    기능 개선
                                                </Option>
                                                <Option value="사업지원 문의">
                                                    사업지원 문의
                                                </Option>
                                                <Option value="설치 문의">
                                                    설치 문의
                                                </Option>
                                                <Option value="교육 문의">
                                                    교육 문의
                                                </Option>
                                                <Option value="기타 문의">
                                                    기타 문의
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Space>
                                </FormItem>
                                <FormItem label="프로젝트 기간">
                                    <Space className="ml-5">
                                        <FormItem name="srch_auth">
                                            <RangePicker
                                                disabled={rangePickerDisabled}
                                            />
                                        </FormItem>
                                        <Checkbox
                                            onChange={allDatePicker}
                                            defaultChecked
                                        />
                                        <div>전체기간</div>
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

export default DashboardSearch;
