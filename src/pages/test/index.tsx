import { Button, Form, FormItem, Input, RangePicker, Space, useForm, useModal } from "@/common";
import { Option, Select } from "@/common/Select";
import { SearchForm, SearchFormBox } from "@/components/search";
import { useAppDispatch } from "@/redux/hooks";
import { Checkbox } from "antd";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ProjectMgtPage = () => {
  const [visible, setVisible] = useState(false);
  const [modal, contextHolder] = useModal();

  const [form] = useForm();
  const dispatch = useAppDispatch();
  const [rangePickerDisabled, setRangePickerDisabled] = useState(true);

  const handleFinish = (v) => {};

  const allDatePicker = (e) => {
    if (e.target.checked) {
      setRangePickerDisabled(true);
    } else {
      setRangePickerDisabled(false);
    }
  };

  const handleInfoSelect = (e) => {
    form.setFieldsValue({
      srch_project_no: e.project_no,
    });
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 575);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const DynamicLayout = dynamic(() => import("@/layout/main/Layout"));
  return (
    <DynamicLayout>
      <div className="  mt-5 rounded-xl mx-auto border border-[#cdcdcd]">
        <div className="px-7 py-3 borer-b-[1px] pb-2 bg-slate-100 rounded-t-xl">검색</div>
        <div className="px-7 py-4">
          <Form form={form} onFinish={handleFinish}>
            <SearchFormBox>
              <FormItem label="프로젝트">
                <Space>
                  <FormItem name="srch_project_no">
                    <Select placeholder={isMobile && "프로젝트"}>
                      <Option value="">(All)</Option>
                      <Option value="newsupport1">KB IQ+ 빌드배포테스트 자동화 시스템 구축 프로젝트</Option>
                      <Option value="newsupport2">나라키움 차세대 소스코드 점검 시스템 구축</Option>
                      <Option value="newsupport3">테스트 입니다.</Option>
                    </Select>
                  </FormItem>
                  <Space>
                    <Button type="primary" onClick={() => setVisible(true)}>
                      선택
                    </Button>
                  </Space>
                </Space>
              </FormItem>
              <FormItem label="솔루션" className="items-center">
                <Space>
                  <FormItem name="srch_nexcore_solution">
                    <Select placeholder={isMobile && "솔루션"}>
                      <Option value="framework_j2ee">J2EE Framework</Option>
                    </Select>
                  </FormItem>
                </Space>
              </FormItem>
              <FormItem label="계약처" className="items-center">
                <Space>
                  <FormItem name="srch_user_name">
                    <Input placeholder={isMobile ? "계약처" : ""} />
                  </FormItem>
                </Space>
              </FormItem>
              <FormItem label="프로젝트 기간">
                <Space>
                  <FormItem name="srch_auth">
                    <RangePicker
                      presets={[
                        {
                          label: "올해",
                          value: [dayjs().startOf("year"), dayjs().endOf("year")],
                        },
                        {
                          label: "작년",
                          value: [
                            dayjs().subtract(1, "year").startOf("year"),
                            dayjs().subtract(1, "year").endOf("year"),
                          ],
                        },
                        {
                          label: "한달",
                          value: [dayjs().subtract(1, "month").startOf("day"), dayjs()],
                        },
                        {
                          label: "1분기",
                          value: [
                            dayjs().startOf("year").startOf("month"),
                            dayjs().startOf("year").month(2).endOf("month"),
                          ],
                        },
                        {
                          label: "2분기",
                          value: [
                            dayjs().startOf("year").month(3).startOf("month"),
                            dayjs().startOf("year").month(5).endOf("month"),
                          ],
                        },
                        {
                          label: "3분기",
                          value: [
                            dayjs().startOf("year").month(6).startOf("month"),
                            dayjs().startOf("year").month(8).endOf("month"),
                          ],
                        },
                        {
                          label: "4분기",
                          value: [
                            dayjs().startOf("year").month(9).startOf("month"),
                            dayjs().startOf("year").month(11).endOf("month"),
                          ],
                        },
                        {
                          label: "전반기",
                          value: [
                            dayjs().startOf("year").startOf("month"),
                            dayjs().startOf("year").month(5).endOf("month"),
                          ],
                        },
                        {
                          label: "하반기",
                          value: [
                            dayjs().startOf("year").month(5).startOf("month"),
                            dayjs().startOf("year").month(11).endOf("month"),
                          ],
                        },
                      ]}
                      disabled={rangePickerDisabled}
                    />
                  </FormItem>
                  <Checkbox onChange={allDatePicker} defaultChecked />
                  <div className="whitespace-pre">전체기간</div>
                </Space>
              </FormItem>
              <FormItem label="상태">
                <Space>
                  <FormItem name="srch_active_status">
                    <Select placeholder={isMobile && "상태"}>
                      <Option value="">(all)</Option>
                      <Option value="active">활성</Option>
                      <Option value="nactive">비활성</Option>
                    </Select>
                  </FormItem>
                </Space>
              </FormItem>

              <FormItem label="등록경로">
                <Space>
                  <FormItem name="srch_user_id">
                    <Select placeholder={isMobile && "등록경로"}>
                      <Option value="">(all)</Option>
                      <Option value="old">구 고객센터</Option>
                      <Option value="new">신 고객센터</Option>
                    </Select>
                  </FormItem>
                </Space>
              </FormItem>
            </SearchFormBox>
            <Button className="mx-auto block" type="primary" size="large" htmlType="submit">
              검색
            </Button>
          </Form>
        </div>
        {contextHolder}
      </div>
    </DynamicLayout>
  );
};
export default ProjectMgtPage;
