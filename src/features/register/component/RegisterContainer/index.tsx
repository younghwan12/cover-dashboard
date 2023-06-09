import { Form, FormItem, Input, Button, useForm, Space, useModal } from "@/common";
import { Option, Select } from "@/common/Select";
import { SearchForm, SearchFormBox, SearchFormControls } from "@/components/search";
import { useRouter } from "next/router";
import { useState } from "react";
import { useLazyCheckDupIdQuery, useRegisterIDMutation } from "../../redux/registerApi";
import { Checkbox, Descriptions } from "antd";
import { PrivacyAgreeModal, ServiceTermModal } from "@/features/modal/register";
import { RegisterReq } from "../../types";

const RegisterContainer = () => {
  const [form] = useForm();
  const router = useRouter();
  const [id, setId] = useState("");
  const [idCheckOK, setIdCheckOK] = useState(false);
  const [modal, contextHolder] = useModal();
  // 서비스약관
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [visible, setVisible] = useState(false);
  // 개인정보
  const [isPrivacyPolicyAgreed, setIsPrivacyPolicyAgreed] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const [checkId] = useLazyCheckDupIdQuery();

  const [registerId] = useRegisterIDMutation();

  const handleFinish = (v) => {
    if (idCheckOK) {
      if (isTermsAgreed) {
        if (isPrivacyPolicyAgreed) {
          modal.confirm({
            title: "저장하시겠습니까?",
            onOk() {
              // console.log(v);
              const formData: RegisterReq = {
                user_id: v.user_id,
                pwd: v.pwd,
                user_name: v.user_name,
                email: v.email,
                company: v.company,
                phone_number: v.phone_number,
                project_name: v.project_name,
                nexcore_solution: v.nexcore_solution.join(","),
                create_route: "newsupport",
              };
              registerId(formData)
                .unwrap()
                .then((data) => {
                  modal.success({
                    title: "가입신청이 완료되었습니다. 관리자승인 후 계정이용이 가능합니다.",
                    onOk() {
                      router.push("/");
                      setIdCheckOK(false);
                      setIsTermsAgreed(false);
                      setIsPrivacyPolicyAgreed(false);
                    },
                  });
                });
            },
          });
        } else {
          modal.error({
            title: "NEXCORE 고객지원센터 개인정보처리방침에 동의해 주세요.",
          });
        }
      } else {
        modal.error({
          title: "NEXCORE 고객지원 서비스 약관에 동의해 주세요.",
        });
      }
    } else {
      modal.error({
        title: "ID 중복확인을 클릭해 주세요.",
      });
    }
  };

  const doubleCheck = (v) => {
    if (id == "") {
      modal.warning({
        title: "사용자 ID를 입력해 주세요.",
      });
    } else {
      checkId({
        user_id: id,
      })
        .unwrap()
        .then((result) => {
          if (result.isDupId == "Y") {
            modal.error({
              title: "이미 사용중인 ID가 있습니다.",
            });
            setIdCheckOK(false);
          } else {
            modal.success({
              title: "사용가능한 ID입니다.",
              onOk() {
                setIdCheckOK(true);
              },
            });
          }
        });
    }
  };

  /** async doubleCheck */
  // const doubleCheck = async (v) => {
  //   if (id == "") {
  //     modal.warning({
  //       title: "사용자 ID를 입력해 주세요.",
  //     });
  //   } else {
  //     try {
  //       const result = await checkId({ user_id: id }).unwrap();
  //       console.log(result.isDupId);
  //       if (result.isDupId == "Y") {
  //         modal.error({
  //           title: "이미 사용중인 ID가 있습니다.",
  //         });
  //       } else {
  //         modal.success({
  //           title: "사용가능한 ID입니다.",
  //         });
  //       }
  //     } catch (error) {
  //       // 오류 처리
  //     }
  //   }
  // };

  const handleTermsChange = (e) => {
    setIsTermsAgreed(e.target.checked);
  };

  const handlePrivacyPolicyChange = (e) => {
    setIsPrivacyPolicyAgreed(e.target.checked);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
    setIdCheckOK(false);
  };

  return (
    <>
      <div className="l-0 t-0 w-full py-5 min-h-screen bg-[#F6F9FF]">
        <div className="xl:max-w-[1200px] mx-auto bg-[white] shadow-xl rounded-md px-[30px] py-5">
          <h2 className="font-semibold mb-[10px]">피엠에스플러스 고객지원센터 가입 신청 절차 안내</h2>
          <div className="text-[#656565] text-sm mb-[10px]">
            피엠에스플러스 제품과의 협업을 진행하시는 관계자가 아닌 경우는 가입 승인이 이루어지지 않으며, 기타 목적이나
            용도의 고객지원센터 사용은 금지됩니다.
            <br />
            <br />
            피엠에스플러스 고객지원센터 계정 생성 정책에 따라, 가입 신청 후 고객지원센터 관리자에게 e-mail로 계정승인
            요청을 해 주시기 바랍니다.
            <br />
            고객지원센터 관리자가 가입 절차 확인한 후 해당 계정이 승인 처리됩니다.
            <br />
            (피엠에스플러스 고객지원센터 관리자: kihihi81@pmsplus.co.kr)
          </div>
          <Form form={form} onFinish={handleFinish}>
            <Descriptions bordered className="tal register">
              <Descriptions.Item label="사용자 ID" span={3} className="required-label">
                <Space className="mr-5">
                  <FormItem
                    name="user_id"
                    className="mb-0 w-80"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="사용자 id를 입력하세요" onChange={handleIdChange} />
                  </FormItem>
                </Space>
                <Button onClick={doubleCheck}>중복확인</Button>
              </Descriptions.Item>
              <Descriptions.Item label="비밀번호" span={3} className="required-label">
                <FormItem
                  name="pwd"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: "비밀번호 형식에 맞게 입력해주세요.",
                    },
                  ]}
                >
                  <Space className="block">
                    <Input type="password" placeholder="비밀번호를 입력하세요" />
                    <p className="text-xs mt-1 whitespace-nowrap text-gray-500">
                      최소한 8글자 이상, 특수문자/영문/숫자 모두 포함되어야 합니다.
                    </p>
                  </Space>
                </FormItem>
              </Descriptions.Item>
              <Descriptions.Item label="비밀번호 확인" span={3} className="required-label">
                <FormItem
                  name="pwdCheck"
                  rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("pwd") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("비밀번호가 일치하지 않습니다."));
                      },
                    }),
                  ]}
                >
                  <Input type="password" placeholder="비밀번호를 입력하세요." />
                </FormItem>
              </Descriptions.Item>
              <Descriptions.Item label="이름" span={3} className="required-label">
                <FormItem
                  name="user_name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="이름을 입력하세요." />
                </FormItem>
              </Descriptions.Item>
              <Descriptions.Item label="메일" span={3} className="required-label">
                <FormItem
                  name="email"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "올바른 이메일 형식이 아닙니다. 확인해 주세요.",
                    },
                  ]}
                >
                  <Input placeholder="메일을 입력하세요." />
                </FormItem>
              </Descriptions.Item>
              <Descriptions.Item label="회사" span={3} className="required-label">
                <FormItem
                  name="company"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="회사를 입력하세요." />
                </FormItem>
              </Descriptions.Item>
              <Descriptions.Item label="연락처" span={3} className="required-label">
                <FormItem
                  name="phone_number"
                  rules={[
                    {
                      required: true,
                    },
                    // {
                    //   pattern: /^(010)(\d{4})(\d{4})$/,
                    //   message: "올바른 전화번호를 입력하세요."
                    // }
                  ]}
                >
                  <Input placeholder="연락처를 입력하세요." />
                </FormItem>
              </Descriptions.Item>
              <Descriptions.Item label="프로젝트" span={3} className="required-label">
                <FormItem
                  name="project_name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Space className="block">
                    <Input placeholder="프로젝트를 입력하세요." />
                    <p className="text-xs mt-1 whitespace-nowrap text-gray-500">
                      사업년도 / 고객사명 / 프로젝트명 으로 입력해 주세요.
                    </p>
                  </Space>
                </FormItem>
              </Descriptions.Item>
              <Descriptions.Item label="피엠에스플러스 사용 제품" span={3} className="required-label">
                <FormItem
                  name="nexcore_solution"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select mode="multiple">
                    <Option value="framework_j2ee">J2EE Framework</Option>
                    <Option value="framework_c">C Framework</Option>
                    <Option value="framework_dotnet">.NET Framework</Option>
                    <Option value="framework_open">Open Framework</Option>
                    <Option value="framework_batch">Batch Scheduler</Option>
                    <Option value="framework_nmp">NMP/NSWP</Option>
                    <Option value="alopex_ui">Alopex UI</Option>
                    <Option value="alopex_grid">Alopex Grid</Option>
                    <Option value="alopex_dash">Alopex Dash</Option>
                    <Option value="alopex_runtime">Alopex Runtime</Option>
                    <Option value="codeinspector_nci">NCI</Option>
                    <Option value="testmanage_ntm">NTM</Option>
                    <Option value="pims_its">ITS</Option>
                    <Option value="pims_pms">PMS</Option>
                    <Option value="pims_qms">QMS</Option>
                    <Option value="pims_tms">TMS</Option>
                    <Option value="pims_agile">AGILE</Option>
                  </Select>
                </FormItem>
              </Descriptions.Item>
            </Descriptions>
          </Form>
          <div>
            <h3 className="font-semibold my-3">개인정보보호에 관한 안내</h3>
            <div className="text-[#656565] text-sm">
              피엠에스플러스 고객지원센터(이하, ‘센터’)는 귀하가 회원가입 시 제공한 개인정보(성명, 이메일, 회사명,
              전화번호)를 기술서비스 제공을 위해 회원가입과 동시에 보유하며 이용할 수 있습니다. <br /> 또한 귀하의
              개인정보는 기술서비스 제공 외 타 목적으로는 활용되지 않으며, 회원탈퇴 요청 시 회원 삭제와 함께 즉시 폐기할
              것입니다. <br />
              이상의 내용에 모두 동의하실 경우, 회원가입을 진행해주시기 바랍니다.
            </div>
            <ul className="mt-5 ml-5 text-sm">
              <li className="flex mb-1">
                <Checkbox disabled checked={isTermsAgreed} onChange={handleTermsChange} />
                <div className="ml-2">
                  <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => setVisible(true)}>
                    피엠에스플러스 고객지원 서비스 약관
                  </span>
                  에 동의합니다.
                </div>
              </li>
              <li className="flex">
                <Checkbox disabled checked={isPrivacyPolicyAgreed} onChange={handlePrivacyPolicyChange} />
                <div className="ml-2">
                  <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => setVisible2(true)}>
                    피엠에스플러스 고객지원센터 개인정보처리방침(만 14세 이상)
                  </span>
                  에 동의합니다
                </div>
              </li>
            </ul>
          </div>
          <Space className="mt-10 flex items-center justify-center">
            <Button type="primary" size="large" onClick={() => form.submit()}>
              확인
            </Button>
            <Button size="large" onClick={() => router.push("/")}>
              취소
            </Button>
          </Space>
        </div>
      </div>
      {contextHolder}

      {/* 서비스약관 */}
      <ServiceTermModal visible={visible} setVisible={setVisible} setIsTermsAgreed={setIsTermsAgreed} />

      {/* 개인정보처리방침 */}
      <PrivacyAgreeModal
        visible={visible2}
        setVisible={setVisible2}
        setIsPrivacyPolicyAgreed={setIsPrivacyPolicyAgreed}
      />
    </>
  );
};
export default RegisterContainer;
