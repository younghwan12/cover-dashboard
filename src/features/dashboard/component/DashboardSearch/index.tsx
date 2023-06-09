import { Form, FormItem, Input, Button, useForm, Space, useModal, RangePicker } from "@/common";
import { Option, Select } from "@/common/Select";
import { SearchForm, SearchFormBox, SearchFormControls } from "@/components/search";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { DatePicker, Checkbox } from "antd";
import { setSearchParams } from "../../redux/dashboardSlice";

import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { useAppSelector } from "@/redux/hooks";
import { useLazyGetIssuesMgtListQuery } from "@/features/issues/redux";
import ProjectInfoModal from "@/features/modal/ProjectInfoModal";
import dayjs from "dayjs";

const DashboardSearch = () => {
  const [form] = useForm();
  const [modal, contextHolder] = useModal();
  const dispatch = useAppDispatch();
  const [rangePickerDisabled, setRangePickerDisabled] = useState(true);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      srch_project_no: "",
      srch_issue_request: "",
    });
  }, []);

  const handleFinish = (v) => {
    const { srch_auth, ...params } = v;
    if (!rangePickerDisabled && v.srch_auth === undefined) {
      modal.error({
        title: "전체기간이 아닙니다. 등록기간을 입력해 주세요.",
      });
    } else {
      dispatch(
        setSearchParams({
          ...params,
          srch_all_dt: rangePickerDisabled ? "Y" : "N",
          srch_start_dt: v.srch_auth ? dayjs(v.srch_auth[0]).format("YYYY-MM-DD") : "",
          srch_end_dt: v.srch_auth ? dayjs(v.srch_auth[1]).format("YYYY-MM-DD") : "",
        })
      );
    }
  };

  const allDatePicker = (e) => {
    if (e.target.checked) {
      setRangePickerDisabled(true);
    } else {
      setRangePickerDisabled(false);
    }
  };

  // 엑셀 다운로드
  const token = useAppSelector((state) => state.login.userInfo);
  const userInfoDetail = useAppSelector((state) => state.login.userInfoDetail);
  const { searchParams } = useAppSelector((state) => state.issues);

  const [getIssuesList, { data: issuesList, isFetching }] = useLazyGetIssuesMgtListQuery();

  const projName = "newsupport1" || "newsupport2";

  useEffect(() => {
    if (token?.jwt) {
      getIssuesList({
        project_no: projName,
        ...searchParams,
        jwt: token?.jwt,
        login_id: userInfoDetail?.jwt?.user_id,
        page_startnum: 1,
        page_endnum: 15,
      });
    }
  }, [token?.jwt, searchParams]);

  const getExcel = (excelData: any) => {
    const excelFileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const excelFileExtension = ".xlsx";
    const excelFileName = "Dashborad 문의목록 test";
    const ws = XLSX.utils.aoa_to_sheet([["프로젝트명", "요청사항", "상태", "제목", "작성자", "담당자", "등록일"]]);

    issuesList?.list.map((list: any) => {
      XLSX.utils.sheet_add_aoa(
        ws,
        [
          [
            list.project_name,
            list.issue_request_name,
            list.issue_status_name,
            list.issue_name,
            list.crtr_name,
            list.chk,
            list.crtr_dt,
          ],
        ],
        { origin: -1 }
      );
      ws["!cols"] = [{ wpx: 200 }, { wpx: 200 }];
      return false;
    });

    const wb: any = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelButter = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelFile = new Blob([excelButter], { type: excelFileType });
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
  };

  const handleInfoSelect = (e) => {
    form.setFieldsValue({
      srch_project_no: e.project_no,
    });
  };

  return (
    <>
      <div className="mt-5 rounded-xl max-w-[85%] mx-auto border border-[#cdcdcd]">
        <div className="px-7 py-3 border-b-[1px] pb-2 bg-slate-100 rounded-t-xl">검색</div>
        <div className="px-7 py-4">
          <Form form={form} onFinish={handleFinish}>
            <SearchFormBox>
              <FormItem label="프로젝트">
                <Space>
                  <FormItem name="srch_project_no">
                    <Select>
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
              <FormItem label="유형">
                <Space>
                  <FormItem name="srch_issue_request">
                    <Select>
                      <Option value="">(All)</Option>
                      <Option value="기술 문의">기술 문의</Option>
                      <Option value="장애 문의">장애 문의</Option>
                      <Option value="License 문의">License 문의</Option>
                      <Option value="기능 개선">기능 개선</Option>
                      <Option value="사업지원 문의">사업지원 문의</Option>
                      <Option value="설치 문의">설치 문의</Option>
                      <Option value="교육 문의">교육 문의</Option>
                      <Option value="기타 문의">기타 문의</Option>
                    </Select>
                  </FormItem>
                </Space>
              </FormItem>
              <FormItem label="전체기간">
                <Space className="mr-2">
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
                  <Space>
                    <Checkbox onChange={allDatePicker} defaultChecked className="whitespace-pre">
                      전체기간
                    </Checkbox>
                  </Space>
                </Space>
              </FormItem>
            </SearchFormBox>
            <div className="flex justify-center gap-4 mt-3">
              <Button className="" size="large" onClick={getExcel}>
                엑셀다운로드
              </Button>
              <Button className="" type="primary" size="large" htmlType="submit">
                검색
              </Button>
            </div>
          </Form>
        </div>
      </div>
      {contextHolder}

      <ProjectInfoModal visible={visible} setVisible={setVisible} onOk={handleInfoSelect} />
    </>
  );
};

export default DashboardSearch;
