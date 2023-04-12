import SearchFormFooter from "../SearchFormFooter";
import { Button, Space } from "@/common/";

import type { FormInstance } from "antd";
import { useRouter } from "next/router";

interface ISearchFormControlsProps {
    /**검색영역 Form 전달 */
    form: FormInstance<any>;
}
const SearchFormControls = ({ form }: ISearchFormControlsProps) => {
    const router = useRouter();

    return (
        <SearchFormFooter>
            <Space className="flex items-center justify-center">
                <Button type="primary" size="large" htmlType="submit">
                    확인
                </Button>
                {/* <Button size="large" onClick={() => form.resetFields()}>
                    검색조건 초기화
                </Button> */}
                <Button size="large" onClick={() => router.push("/login")}>
                    취소
                </Button>
            </Space>
        </SearchFormFooter>
    );
};
export default SearchFormControls;
