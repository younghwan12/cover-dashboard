import { Form, FormItem, Input, Button, useForm, Space } from "@/common";
import { Option, Select } from "@/common/Select";
import {
    SearchForm,
    SearchFormBox,
    SearchFormControls,
} from "@/components/search";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/hooks";
import React, { useState } from "react";
import { DatePicker, Checkbox } from "antd";
const { RangePicker } = DatePicker;

const ProjectMgtSearch = () => {
    // const dateCellRender = (currentDate) => {
    //     const date = currentDate.date();
    //     const isWeekend = currentDate.day() === 0 || currentDate.day() === 6;
    //     return (
    //         <div style={{ backgroundColor: isWeekend ? "inherit" : "" }}>
    //             {date}
    //         </div>
    //     );
    // };

    // const monthCellRender = (date) => {
    //     const month = date.month() + 1;

    //     return <div style={{ fontWeight: "bold" }}>{month}월</div>;
    // };

    const [form] = useForm();
    const dispatch = useAppDispatch();
    const [rangePickerDisabled, setRangePickerDisabled] = useState(false);

    const handleFinish = (v) => {
        // dispatch(
        //     setSearchParams({
        //         ...v,
        //     })
        // );
    };

    const handleDateChange = (dates, dateStrings) => {
        console.log("Selected Range:", dates);
        console.log("Formatted Selected Range:", dateStrings);
    };

    const allDatePicker = (e) => {
        setRangePickerDisabled(e.target.checked);
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
                                <FormItem className="" label="프로젝트">
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

                                <FormItem label="솔루션">
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
                                <FormItem label="계약처">
                                    <Space className="ml-5">
                                        <FormItem name="srch_user_name">
                                            <Input />
                                        </FormItem>
                                    </Space>
                                </FormItem>
                            </SearchFormBox>
                            <SearchFormBox className="flex justify-between">
                                <FormItem label="프로젝트 기간">
                                    <Space className="ml-5">
                                        <FormItem name="srch_auth">
                                            <RangePicker
                                                // cellRender={dateCellRender}
                                                // monthCellRender={
                                                //     monthCellRender
                                                // }
                                                disabled={rangePickerDisabled}
                                            />
                                        </FormItem>
                                        <Checkbox onChange={allDatePicker} />
                                        <div>전체기간</div>
                                    </Space>
                                </FormItem>
                                <FormItem label="상태">
                                    <Space className="ml-5">
                                        <FormItem name="srch_active_status">
                                            <Select className="min-w-[200px]">
                                                <Option value="">(all)</Option>
                                                <Option value="active">
                                                    활성
                                                </Option>
                                                <Option value="nactive">
                                                    비활성
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Space>
                                </FormItem>

                                <FormItem label="등록경로">
                                    <Space className="ml-5">
                                        <FormItem name="srch_user_id">
                                            <Select className="min-w-[200px]">
                                                <Option value="">(all)</Option>
                                                <Option value="old">
                                                    구 고객센터
                                                </Option>
                                                <Option value="new">
                                                    신 고객센터
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

export default ProjectMgtSearch;
