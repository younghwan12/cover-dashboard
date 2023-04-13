import { useState } from "react";
import {
    Button,
    Form,
    FormItem,
    Input,
    Search,
    Space,
    useForm,
} from "@/common";
import {
    SearchForm,
    SearchFormBox,
    SearchFormControls,
} from "@/components/search";
import { useAppDispatch } from "@/redux/hooks";
import { Option, Select } from "@/common/Select";

const SysMgtCdSearch = () => {
    const [form] = useForm();
    const dispatch = useAppDispatch();

    const [visible, setVisible] = useState(false);

    const onSearchAppCode = () => {
        setVisible(true);
    };

    const handleFinish = (v) => {
        // dispatch(
        //     setSearchParams({
        //         ...v
        //     })
        // )
        console.log(v);
    };
    return (
        <>
            <Form form={form} onFinish={handleFinish}>
                <SearchForm>
                    <SearchFormBox className="flex justify-around">
                        <FormItem label="그룹코드명">
                            <Space>
                                <FormItem name="groupCd">
                                    <Select className="min-w-[150px]">
                                        <Option value="all">(All)</Option>
                                        <Option value="그룹솔루션">
                                            그룹솔루션
                                        </Option>
                                        <Option value="사용자권한">
                                            사용자권한
                                        </Option>
                                        <Option value="솔루션">솔루션</Option>
                                        <Option value="요청사항">
                                            요청사항
                                        </Option>
                                        <Option value="처리상태">
                                            처리상태
                                        </Option>
                                    </Select>
                                </FormItem>
                            </Space>
                        </FormItem>
                        <FormItem label="코드명">
                            <Space>
                                <FormItem name="cdName">
                                    <Input />
                                </FormItem>
                            </Space>
                        </FormItem>
                    </SearchFormBox>
                    {/* <SearchFormControls form={form} /> */}
                    <div className="flex items-center justify-center">
                        <Button type="primary" size="large" htmlType="submit">
                            검색
                        </Button>
                    </div>
                </SearchForm>
            </Form>
        </>
    );
};
export default SysMgtCdSearch;
