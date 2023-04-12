import { Form, FormItem, Input, Search, Button } from "@/common";
import { Space } from "antd";

const RegisterContainer = () => {
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
                    <Form>
                        <FormItem label="사용자 ID" required={true}>
                            <Space>
                                <FormItem name="title" className="mb-0">
                                    {/* <Search /> */}
                                    <Input placeholder="사용자 id를 입력하세요" />
                                </FormItem>
                                <Button>중복확인</Button>
                            </Space>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </>
    );
};
export default RegisterContainer;
