import { Button, Form, FormItem, Input, Space, useForm } from "@/common";
import { Option, Select } from "@/common/Select";
import { SearchForm, SearchFormBox } from "@/components/search";
import { useAppDispatch } from "@/redux/hooks";
import { useCallback, useEffect, useState } from "react";
import { setSearchParams } from "../../redux/codeSlice";
import { CodeMgtReq } from "../../types";
const CodeMgtSearch = () => {
  const [form] = useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    form.setFieldsValue({
      srch_code_group_id: "",
    });
  }, []);

  const handleFinish = (v: CodeMgtReq) => {
    dispatch(
      setSearchParams({
        ...v,
      })
    );
  };
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 575);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="mt-5 rounded-xl max-w-[85%] mx-auto border border-[#cdcdcd]">
        <div className="px-7 py-3 border-b-[1px] pb-2 bg-slate-100 rounded-t-xl">검색</div>
        <div className="px-7 py-4">
          <Form form={form} onFinish={handleFinish}>
            <SearchForm>
              <SearchFormBox className="xl:flex justify-between">
                <FormItem label="그룹코드명">
                  <Space className="ml-5">
                    <FormItem name="srch_code_group_id">
                      <Select placeholder={isMobile && "그룹코드명"}>
                        <Option value="">(All)</Option>
                        <Option value="GROUP_SOLUTION">그룹솔루션</Option>
                        <Option value="USER_AUTH">사용자권한</Option>
                        <Option value="SOLUTION">솔루션</Option>
                        <Option value="ISSUE_REQUEST_TYPE">요청사항</Option>
                        <Option value="ISSUE_STATUS">처리상태</Option>
                      </Select>
                    </FormItem>
                  </Space>
                </FormItem>
                <FormItem label="코드명">
                  <Space className="ml-5">
                    <FormItem name="srch_code_name">
                      <Input placeholder={isMobile ? "코드명" : ""} />
                    </FormItem>
                  </Space>
                </FormItem>
              </SearchFormBox>
            </SearchForm>
            <Button className="mx-auto block" type="primary" size="large" htmlType="submit">
              검색
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CodeMgtSearch;
