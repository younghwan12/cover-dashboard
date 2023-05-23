import { Option, Select } from "@/common/Select";
import { Form, FormItem, Input, Modal, useForm } from "@/components";
import { useModal } from "@/components/Modal";
import { SearchForm } from "@/components/search";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, DatePicker, InputNumber, Pagination, Radio } from "antd";
import React, { useEffect, useState } from "react";

import { Space } from "@/common";
import TextArea from "@/common/TextArea";
import { useAddCodeListMutation } from "@/features/codeMgt/redux";
import { ProjectAddReq } from "@/features/projectMgt/types";
import { useAddProjectMgtListMutation } from "@/features/projectMgt/redux";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
  const userInfoDetail = useAppSelector((state) => state.login.userInfoDetail);

  const [addProject] = useAddProjectMgtListMutation();

  const dateFormat = "YYYY-MM-DD";
  const handleFinish = (v) => {
    const formData: ProjectAddReq = {
      ...v,
      business_price: String(v.business_price),
      pay_maintenance_price: String(v.pay_maintenance_price),
      solutions: JSON.stringify(
        v.solutions.map((solution) => ({
          nexcore_solution_cd: solution.nexcore_solution_cd,
          solution_price: String(solution.solution_price),
        }))
      ),
      start_dt: startDate,
      end_dt: endDate,
      free_maintenance_start_dt: fStartDate,
      free_maintenance_end_dt: fEndDate,
      login_id: userInfoDetail.jwt.user_id,
      jwt: token.jwt,
    };
    modal.confirm({
      title: "저장하시겠습니까?",
      onOk() {
        console.log(formData);
        addProject(formData)
          .unwrap()
          .then((data) => {
            modal.success({
              title: "저장되었습니다.",
              onOk() {
                setVisible(false);
                form.resetFields();
              },
            });
          });
      },
    });
  };

  const modalOnCancelFun = () => {
    setVisible(false);
  };

  const modalOnOkFun = (r, e) => {
    form.submit();
    // setVisible(false);
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
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="프로젝트 명을 입력하세요." />
            </FormItem>
            <FormItem label="프로젝트 기간" required={true}>
              <Space>
                <FormItem
                  name="start_dt"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="시작일"
                    onChange={(date, dateString) => {
                      setStartDate(dateString);
                    }}
                  />
                </FormItem>
                <span>~</span>
                <FormItem
                  name="end_dt"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="종료일"
                    onChange={(date, dateString) => {
                      setEndDate(dateString);
                    }}
                  />
                </FormItem>
              </Space>
            </FormItem>
            <FormItem
              label="계약처"
              name="company"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="계약처를 입력하세요." />
            </FormItem>
            <FormItem
              label="사업금액"
              name="business_price"
              rules={[
                {
                  message: "숫자만 입력해주시기 바랍니다.",
                  pattern: /^\d+$/,
                },
              ]}
            >
              <InputNumber
                placeholder="사업 금액을 입력하세요."
                formatter={(value) =>
                  value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
                }
                parser={(value) =>
                  value ? value.replace(/\$\s?|(,*)/g, "") : ""
                }
              />
            </FormItem>
            <FormItem label="피엠에스플러스 솔루션 / 금액" required={true}>
              <Form.List name="solutions" initialValue={[{}]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Space key={field.key} className="prj-space">
                        <FormItem
                          noStyle
                          shouldUpdate={(prevValues, curValues) =>
                            (prevValues as { area?: any; sights?: any })
                              .area !==
                              (curValues as { area?: any; sights?: any })
                                .area ||
                            (prevValues as { area?: any; sights?: any })
                              .sights !==
                              (curValues as { area?: any; sights?: any }).sights
                          }
                        >
                          {() => (
                            <FormItem
                              {...field}
                              name={[field.name, "nexcore_solution_cd"]}
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Select className="!w-[200px]">
                                <Option value="framework_j2ee">
                                  J2EE Framework
                                </Option>
                                <Option value="framework_c">C Framework</Option>
                                <Option value="framework_dotnet">
                                  .NET Framework
                                </Option>
                                <Option value="framework_open">
                                  Open Framework
                                </Option>
                                <Option value="framework_batch">
                                  Batch Scheduler
                                </Option>
                                <Option value="framework_nmp">NMP/NSWP</Option>
                                <Option value="alopex_grid">Alopex Grid</Option>
                                <Option value="alopex_dash">Alopex Dash</Option>
                                <Option value="alopex_runtime">
                                  Alopex Runtime
                                </Option>
                                <Option value="codeinspector_nci">NCI</Option>
                                <Option value="testmanage_ntm">NTM</Option>
                                <Option value="pims_its">ITS</Option>
                                <Option value="pims_pms">PMS</Option>
                                <Option value="pims_qms">QMS</Option>
                                <Option value="pims_tms">TMS</Option>
                                <Option value="pims_agile">AGILE</Option>
                              </Select>
                            </FormItem>
                          )}
                        </FormItem>
                        <FormItem
                          {...field}
                          name={[field.name, "solution_price"]}
                          rules={[
                            {
                              required: true,
                            },
                            {
                              message: "숫자만 입력해주시기 바랍니다.",
                              pattern: /^\d+$/,
                            },
                          ]}
                        >
                          <InputNumber
                            placeholder="금액"
                            formatter={(value) =>
                              value
                                ? `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                : ""
                            }
                            parser={(value) =>
                              value ? value.replace(/\$\s?|(,*)/g, "") : ""
                            }
                          />
                        </FormItem>
                        {index > 0 && (
                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                          />
                        )}
                      </Space>
                    ))}
                    <FormItem>
                      <Button
                        type="default"
                        className="bg-blue-300 text-white"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        추가
                      </Button>
                    </FormItem>
                  </>
                )}
              </Form.List>
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
            <FormItem label="사업 수행 솔루션 담당자" name="solution_charger">
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
            <FormItem label="유상 유지보수 여부" name="pay_maintenance_yn">
              <Radio.Group>
                <Radio value="N">없음</Radio>
                <Radio value="Y">있음</Radio>
              </Radio.Group>
            </FormItem>
            <FormItem
              label="유상 유지보수 금액"
              name="pay_maintenance_price"
              rules={[
                {
                  message: "숫자만 입력해주시기 바랍니다.",
                  pattern: /^\d+$/,
                },
              ]}
            >
              <InputNumber
                placeholder="유상 유지보수 금액을 입력하세요."
                formatter={(value) =>
                  value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
                }
                parser={(value) =>
                  value ? value.replace(/\$\s?|(,*)/g, "") : ""
                }
              />
            </FormItem>
            <FormItem label="정기점검 여부" name="regular_maintenance_state">
              <Radio.Group>
                <Radio value="N">없음</Radio>
                <Radio value="month">월</Radio>
                <Radio value="quarter">분기</Radio>
                <Radio value="half">반기</Radio>
              </Radio.Group>
            </FormItem>
            <FormItem label="고객사 담당자(정기정검)" name="customer_charger">
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
