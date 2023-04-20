import { Form, FormItem, Input, Button, useForm, Space } from "@/common";
import { Option, Select } from "@/common/Select";
import {
    SearchForm,
    SearchFormBox,
    SearchFormControls,
} from "@/components/search";
import { useRouter } from "next/router";

const RegisterContainer = () => {
    const [form] = useForm();
    const router = useRouter();

    const handleFinish = (v) => {
        console.log(v);
    };
    return (
        <>
            <div className="fixed l-0 t-0 w-full min-h-screen bg-[#F6F9FF]">
                <div className="xl:max-w-[1200px] m-auto my-5  bg-[white] shadow-lg rounded-md px-[30px] py-5">
                    <h2 className="font-semibold mb-[10px]">
                        피엠에스플러스 고객지원센터 가입 신청 절차 안내
                    </h2>
                    <div className="text-[#656565] text-sm">
                        피엠에스플러스 제품과의 협업을 진행하시는 관계자가 아닌
                        경우는 가입 승인이 이루어지지 않으며, 기타 목적이나
                        용도의 고객지원센터 사용은 금지됩니다.
                        <br />
                        <br />
                        피엠에스플러스 고객지원센터 계정 생성 정책에 따라, 가입
                        신청 후 고객지원센터 관리자에게 e-mail로 계정승인 요청을
                        해 주시기 바랍니다.
                        <br />
                        고객지원센터 관리자가 가입 절차 확인한 후 해당 계정이
                        승인 처리됩니다.
                        <br />
                        (피엠에스플러스 고객지원센터 관리자:
                        kihihi81@pmsplus.co.kr)
                    </div>
                    <Form
                        form={form}
                        onFinish={handleFinish}
                        className="border border-[#cdcdcd] px-7 py-5 mt-5 rounded-xl"
                    >
                        <SearchForm>
                            <SearchFormBox>
                                <FormItem label="사용자 ID" required={true}>
                                    <Space className="mr-5">
                                        <FormItem
                                            name="title"
                                            className="mb-0 w-80"
                                        >
                                            <Input placeholder="사용자 id를 입력하세요" />
                                        </FormItem>
                                    </Space>
                                    <Button>중복확인</Button>
                                </FormItem>
                                <FormItem label="비밀번호" required={true}>
                                    <Space className="relative">
                                        <FormItem
                                            name="password"
                                            className="mb-0 w-80"
                                        >
                                            <Space className="block">
                                                <Input placeholder="비밀번호를 입력하세요" />
                                                <p className="text-xs mt-1 whitespace-nowrap text-gray-500">
                                                    최소한 8글자 이상,
                                                    특수문자/영문/숫자 모두
                                                    포함되어야 합니다.
                                                </p>
                                            </Space>
                                        </FormItem>
                                    </Space>
                                </FormItem>
                                <FormItem label="비밀번호확인" required={true}>
                                    <Space>
                                        <FormItem
                                            name="passwordCheck"
                                            className="mb-0 w-80"
                                        >
                                            <Input placeholder="비밀번호를 입력하세요" />
                                        </FormItem>
                                    </Space>
                                </FormItem>
                                <FormItem label="이름" required={true}>
                                    <Space>
                                        <FormItem
                                            name="name"
                                            className="mb-0 w-80"
                                        >
                                            <Input placeholder="이름을 입력하세요" />
                                        </FormItem>
                                    </Space>
                                </FormItem>
                                <FormItem label="메일" required={true}>
                                    <Space>
                                        <FormItem
                                            name="email"
                                            className="mb-0 w-80"
                                        >
                                            <Input placeholder="메일을 입력하세요" />
                                        </FormItem>
                                    </Space>
                                </FormItem>
                                <FormItem label="회사" required={true}>
                                    <Space>
                                        <FormItem
                                            name="company"
                                            className="mb-0 w-80"
                                        >
                                            <Input placeholder="회사를 입력하세요" />
                                        </FormItem>
                                    </Space>
                                </FormItem>
                                <FormItem label="연락처" required={true}>
                                    <Space>
                                        <FormItem
                                            name="phone"
                                            className="mb-0 w-80"
                                        >
                                            <Input placeholder="연락처를 입력하세요" />
                                        </FormItem>
                                    </Space>
                                </FormItem>
                                <FormItem label="프로젝트" required={true}>
                                    <Space>
                                        <FormItem
                                            name="project"
                                            className="mb-0 w-80"
                                        >
                                            <Space className="block">
                                                <Input placeholder="프로젝트를 입력하세요" />
                                                <p className="text-xs mt-1 whitespace-nowrap text-gray-500">
                                                    사업년도 / 고객사명 /
                                                    프로젝트명 으로 입력해
                                                    주세요.
                                                </p>
                                            </Space>
                                        </FormItem>
                                    </Space>
                                </FormItem>
                                <FormItem
                                    label="피엠에스플러스 사용 제품"
                                    required={true}
                                >
                                    <Space>
                                        <FormItem
                                            name="pmsplus"
                                            className="mb-0 w-80"
                                        >
                                            <Select mode="multiple">
                                                <Option value="J2EE Framework">
                                                    J2EE Framework
                                                </Option>
                                                <Option value="C Framework">
                                                    C Framework
                                                </Option>
                                                <Option value="D Framework">
                                                    C Framework
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Space>
                                </FormItem>
                                <Space className="flex items-center justify-center">
                                    <Button
                                        type="primary"
                                        size="large"
                                        htmlType="submit"
                                    >
                                        확인
                                    </Button>
                                    <Button
                                        size="large"
                                        onClick={() => router.push("/")}
                                    >
                                        취소
                                    </Button>
                                </Space>
                            </SearchFormBox>
                        </SearchForm>
                    </Form>
                </div>
            </div>
        </>
    );
};
export default RegisterContainer;
