import { Form, FormItem, Input, Modal, useForm } from "@/components";
import { SearchForm } from "@/components/search";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { Option, Select } from "@/common/Select";
import { useModal } from "@/components/Modal";
import { AuthInfo } from "@/features/main/types";
import { Button, DatePicker, DatePickerProps, Radio } from "antd";

import { useAddCodeListMutation } from "@/features/codeMgt/redux";
import { DefaultOptionType } from "antd/es/select";
import { AddCodeMgtReq } from "@/features/codeMgt/types";
import { Space } from "@/common";
import TextArea from "@/common/TextArea";
import moment from "moment";

interface IModalProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProjectModal = ({ visible, setVisible }: IModalProps) => {
    const [startDate, setStartDate] = useState("");
    const [fStartDate, setFStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [fEndDate, setFEndDate] = useState("");
    const [form] = useForm();
    const [modal, contextHolder] = useModal();
    const [selectedDatas, setSelectedDatas] = useState([]);
    const dispatch = useAppDispatch();
    const [groupCdName, setGroupCdName] = useState<string>("그룹솔루션");

    const token = useAppSelector((state) => state.login.userInfo);
    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    const [addCode] = useAddCodeListMutation();

    const dateFormat = "YYYY-MM-DD";
    const handleFinish = (v) => {
        // const newSolutions = solutions.map((solution, index) => ({
        //     nexcoreSolutionCd: v.nexcore_solution_cd[index],
        //     solutionPrice: v.solution_price[index],
        // }));
        // console.log("solutions: ", newSolutions);

        // v = {
        //     ...v,
        //     start_dt: startDate,
        //     end_dt: endDate,
        //     free_maintenance_start_dt: fStartDate,
        //     free_maintenance_end_dt: fEndDate,
        //     // solutions: [
        //     //     {
        //     //         nexcore_solution_cd: v.nexcore_solution_cd,
        //     //         solution_price: v.solution_price,
        //     //     },
        //     // ],
        // };
        console.log("v", v);
    };

    const modalOnCancelFun = () => {
        setVisible(false);
    };

    const modalOnOkFun = (r, e) => {
        form.submit();
        // setVisible(false);
    };

    const [solutions, setSolutions] = useState([
        { nexcore_solution_cd: "", solution_price: "" },
    ]);

    const handleAdd = () => {
        setSolutions([
            ...solutions,
            { nexcore_solution_cd: "", solution_price: "" },
        ]);
    };

    const handleRemove = (indexToRemove) => {
        if (indexToRemove === 0) {
            return;
        }
        setSolutions(solutions.filter((_, index) => index !== indexToRemove));
    };

    return (
        <>
            <Modal
                title="프로젝트 정보"
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
                            label="프로젝트 명"
                            name="project_name"
                            required={true}
                        >
                            <Input placeholder="프로젝트 명을 입력하세요." />
                        </FormItem>
                        <FormItem label="프로젝트 기간" required={true}>
                            <Space>
                                <FormItem name="start_dt">
                                    <DatePicker
                                        placeholder="시작일"
                                        onChange={(date, dateString) => {
                                            setStartDate(dateString);
                                        }}
                                    />
                                </FormItem>
                                <span>~</span>
                                <FormItem name="end_dt">
                                    <DatePicker
                                        placeholder="종료일"
                                        onChange={(date, dateString) => {
                                            setEndDate(dateString);
                                        }}
                                    />
                                </FormItem>
                            </Space>
                        </FormItem>
                        <FormItem label="계약처" name="company" required={true}>
                            <Input placeholder="계약처를 입력하세요." />
                        </FormItem>
                        <FormItem label="사업금액" name="business_price">
                            <Input placeholder="사업 금액을 입력하세요." />
                        </FormItem>
                        <FormItem
                            label="피엠에스플러스 솔루션 / 금액"
                            required={true}
                        >
                            <Space>
                                <FormItem name="nexcore_solution_cd">
                                    <Select className="!w-[200px]">
                                        <Option value="framework_j2ee">
                                            J2EE Framework
                                        </Option>
                                        <Option value="framework_c">
                                            C Framework
                                        </Option>
                                        <Option value="framework_dotnet">
                                            .NET Framework
                                        </Option>
                                        <Option value="framework_open">
                                            Open Framework
                                        </Option>
                                        <Option value="framework_batch">
                                            Batch Scheduler
                                        </Option>
                                        <Option value="framework_nmp">
                                            NMP/NSWP
                                        </Option>
                                        <Option value="alopex_ui">
                                            Alopex UI
                                        </Option>
                                        {/* Alopex Grid부터 추가 */}
                                    </Select>
                                </FormItem>
                                <FormItem name="solution_price">
                                    <div className="flex w-[150px]">
                                        <Input placeholder="금액" />
                                        <span className="ml-2 grid items-center">
                                            원
                                        </span>
                                    </div>
                                </FormItem>
                                <Button onClick={handleAdd}>추가</Button>
                            </Space>
                            {solutions.slice(1).map((_, index) => (
                                <Space key={index}>
                                    <FormItem
                                        name={`nexcore_solution_cd[${
                                            index + 1
                                        }]`}
                                    >
                                        <Select className="!w-[200px]">
                                            <Option value="framework_j2ee">
                                                J2EE Framework
                                            </Option>
                                            <Option value="framework_c">
                                                C Framework
                                            </Option>
                                            <Option value="framework_dotnet">
                                                .NET Framework
                                            </Option>
                                            <Option value="framework_open">
                                                Open Framework
                                            </Option>
                                            <Option value="framework_batch">
                                                Batch Scheduler
                                            </Option>
                                            <Option value="framework_nmp">
                                                NMP/NSWP
                                            </Option>
                                            <Option value="alopex_ui">
                                                Alopex UI
                                            </Option>
                                            {/* Alopex Grid부터 추가 */}
                                        </Select>
                                    </FormItem>
                                    <FormItem
                                        name={`solution_price[${index + 1}]`}
                                    >
                                        <div className="flex w-[150px]">
                                            <Input placeholder="금액" />
                                            <span className="ml-2 grid items-center">
                                                원
                                            </span>
                                        </div>
                                    </FormItem>
                                    <Button
                                        onClick={() => handleRemove(index + 1)}
                                    >
                                        삭제
                                    </Button>
                                </Space>
                            ))}
                        </FormItem>
                        <FormItem
                            label={`사업내용\n(개요 특징 특이사항)`}
                            name="business_desc"
                            className="pre"
                        >
                            <TextArea placeholder="사업내용을 간략하게 적어주세요." />
                        </FormItem>
                        <FormItem label="영업대표" name="sales_manager">
                            <Input placeholder="이름을 입력하세요." />
                        </FormItem>
                        <FormItem
                            label="사업 수행 솔루션 담당자"
                            name="solution_charger"
                        >
                            <Input placeholder="이름을 입력하세요." />
                        </FormItem>
                        <FormItem label="예상 무상 유지보수 기간">
                            <Space>
                                <FormItem name="free_maintenance_start_dt">
                                    <DatePicker
                                        placeholder="시작일"
                                        onChange={(date, dateString) => {
                                            setFStartDate(dateString);
                                        }}
                                    />
                                </FormItem>
                                <span>~</span>
                                <FormItem name="free_maintenance_end_dt">
                                    <DatePicker
                                        placeholder="종료일"
                                        onChange={(date, dateString) => {
                                            setFEndDate(dateString);
                                        }}
                                    />
                                </FormItem>
                            </Space>
                        </FormItem>
                        <FormItem
                            label="유상 유지보수 여부"
                            name="pay_maintenance_yn"
                        >
                            <Radio.Group>
                                <Radio value="N">없음</Radio>
                                <Radio value="Y">있음</Radio>
                            </Radio.Group>
                        </FormItem>
                        <FormItem
                            label="유상 유지보수 금액"
                            name="pay_maintenance_price"
                        >
                            <Input placeholder="유상 유지보수 금액을 입력하세요." />
                        </FormItem>
                        <FormItem
                            label="정기점검 여부"
                            name="regular_maintenance_state"
                        >
                            <Radio.Group>
                                <Radio value="N">없음</Radio>
                                <Radio value="month">월</Radio>
                                <Radio value="quarter">분기</Radio>
                                <Radio value="half">반기</Radio>
                            </Radio.Group>
                        </FormItem>
                        <FormItem
                            label="고객사 담당자(정기정검)"
                            name="customer_charger"
                        >
                            <Input placeholder="고객사 담당자(정기정검)을 입력하세요." />
                        </FormItem>
                        <FormItem label="상태" name="project_status">
                            <Select>
                                <Option value="active">활성</Option>
                                <Option value="inactive">비활성</Option>
                            </Select>
                        </FormItem>
                    </SearchForm>
                </Form>
            </Modal>
            {contextHolder}
        </>
    );
};
export default AddProjectModal;
