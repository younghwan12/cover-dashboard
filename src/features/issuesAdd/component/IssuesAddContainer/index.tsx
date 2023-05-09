import { Form, FormItem, Input, useForm, Space } from "@/common";
import { Option, Select } from "@/common/Select";
import { SearchForm } from "@/components/search";
import { Button, Descriptions } from "antd";
import IssuesAddQuill from "../IssuesAddQuill";
import React, { useState } from "react";
import CodeEditor from "../IssuesAddQuill";

const IssuesAddContainer = () => {
    const handleFinish = (v) => {
        console.log("폼데이터", v);
        console.log("detail", detail);
    };

    const [form] = useForm();
    const [detail, setDetail] = useState("");
    return (
        <div className="mt-5 rounded-xl max-w-[80%] mx-auto">
            <div className="pt-7 pb-2 flex justify-between items-center ">
                <Button className="bg-gray-200">목록</Button>
                <div>
                    <Button type="primary" onClick={() => form.submit()}>
                        저장
                    </Button>
                    <Button className="ml-2">취소</Button>
                </div>
            </div>
            <Form form={form} onFinish={handleFinish}>
                <SearchForm>
                    <Descriptions bordered className="issuesAdd">
                        <Descriptions.Item label="프로젝트" span={3}>
                            KB IQ+ 빌드배포테스트 자동화 시스템 구축 프로젝트
                        </Descriptions.Item>
                        <Descriptions.Item label="솔루션" span={3}>
                            J2EE Framework, C Framework
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="요청사항"
                            className="required-label"
                            span={3}
                        >
                            <Select className="min-w-[150px]">
                                <Option value="001">기술 문의</Option>
                                <Option value="002">장애 문의</Option>
                                <Option value="003">License 문의</Option>
                                <Option value="004">기능 개선</Option>
                            </Select>
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="제목"
                            className="required-label"
                            span={3}
                        >
                            <Input placeholder="제목을 입력하세요." />
                        </Descriptions.Item>
                        <Descriptions.Item
                            label="내용"
                            className="required-label"
                            span={3}
                        >
                            <IssuesAddQuill
                                detail={detail}
                                setDetail={setDetail}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="첨부파일">
                            첨부파일~~
                        </Descriptions.Item>
                    </Descriptions>
                </SearchForm>
            </Form>
        </div>
    );
};

export default IssuesAddContainer;
