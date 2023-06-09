import { Form, FormItem, Input, Modal, useForm } from "@/components";
import { SearchForm } from "@/components/search";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";

import { Option, Select } from "@/common/Select";
import { useModal } from "@/components/Modal";
import { AuthInfo } from "@/features/main/types";
import { Button } from "antd";

import { useAddCodeListMutation } from "@/features/codeMgt/redux";
import { DefaultOptionType } from "antd/es/select";
import { AddCodeMgtReq } from "@/features/codeMgt/types";

interface IModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPrivacyPolicyAgreed: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrivacyAgreeModal = ({ visible, setVisible, setIsPrivacyPolicyAgreed }: IModalProps) => {
  const [form] = useForm();
  const [modal, contextHolder] = useModal();

  const modalOnCancelFun = () => {
    setVisible(false);
  };

  const modalOnOkFun = () => {
    setIsPrivacyPolicyAgreed(true);
    setVisible(false);
  };

  return (
    <>
      <Modal
        className="register"
        centered
        title="피엠에스플러스 고객지원 센터 개인정보처리방침(만 14세 이상)"
        width={800}
        open={visible}
        onCancel={() => modalOnCancelFun()}
        footer={[
          <Button key="ok" type="primary" onClick={() => modalOnOkFun()}>
            확인
          </Button>,
        ]}
      >
        <p>
          <strong>**피엠에스플러스 고객지원 서비스 센터 개인정보처리방침**</strong>
        </p>
        <p>
          • 피엠에스플러스 고객지원 서비스 센터 (이하 &quot;고객지원 센터&quot; 또는 &quot;회사&quot;라 함)는
          통신비밀보호법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 정보통신서비스제공자가
          준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자
          권익 보호에 최선을 다하고 있습니다.
        </p>
        <p>고객지원 센터의 개인정보처리방침은 다음과 같은 내용을 담고 있습니다.</p>
        <ul className="pl-[40px] list-disc mb-4">
          <li>1. 수집하는 개인정보의 항목 및 수집방법 </li>
          <li>2. 개인정보의 수집 및 이용목적</li>
          <li>3. 개인정보 공유 및 제공</li>
          <li>4. 개인정보의 취급위탁</li>
          <li>5. 개인정보의 보유 및 이용기간</li>
          <li>6. 개인정보 파기절차 및 방법</li>
          <li>7. 이용자 및 법정대리인의 권리와 그 행사방법</li>
          <li>8. 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항</li>
          <li>9. 개인정보의 기술적/관리적 보호 대책</li>
          <li>10. 개인정보관리책임자 및 담당자의 연락처</li>
          <li>11. 기타</li>
          <li>12. 고지의 의무</li>
        </ul>
        <p>
          <strong>1. 수집하는 개인정보의 항목 및 수집방법</strong>
        </p>
        <p>가. 수집하는 개인정보의 항목</p>
        <p>
          첫째, 회사는 회원가입, 원활한 고객상담, 각종 서비스의 제공을 위해 최초 회원가입 당시 아래와 같은 개인정보를
          수집하고 있습니다.
        </p>
        <p>
          &lt; 일반 회원가입 시 &gt; <br /> 필수항목 : 아이디, 비밀번호, 비밀번호 확인, 이름, 이메일 주소, 회사명,
          전화번호, Project 명, 사용제품명
        </p>
        <p>둘째, 서비스 이용과정이나 업무처리 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.</p>
        <p>IP Address, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록</p>
        <p>나. 개인정보 수집방법</p>
        <p>회사는 다음과 같은 방법으로 개인정보를 수집합니다.</p>
        <p>홈페이지, 전화, 이메일을 통한 수집</p>
        <p>
          <strong>2. 개인정보의 수집 및 이용목적</strong>
        </p>
        <p>가. 회원관리</p>
        <p>
          회원제 서비스 이용 및 제한적 본인 확인제에 따른 본인확인, 개인식별, 불량회원의 부정 이용방지와 비인가
          사용방지, 가입의사 확인, 가입 및 가입횟수 제한, 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인,
          추후 법정 대리인 본인확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달
        </p>
        <p>나. 신규 서비스 개발 및 마케팅</p>
        <p>
          신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인,
          회원의 서비스이용에 대한 통계
        </p>
        <p>
          <strong>3. 개인정보의 공유 및 제공</strong>
        </p>
        <p>
          회사는 이용자들의 개인정보를 &quot;2. 개인정보의 수집 및 이용목적&quot;에서 고지한 범위내에서 사용하며,
          이용자의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 외부에 공개하지
          않습니다. 다만, 아래의 경우에는 예외로 합니다.
        </p>
        <ul className="pl-[40px] list-disc mb-4">
          <li>이용자들이 사전에 공개에 동의한 경우</li>
          <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
        </ul>
        <p>
          <strong>4. 개인정보의 취급위탁</strong>
        </p>
        <p>해당 없음</p>
        <p>
          <strong>5. 개인정보의 보유 및 이용기간</strong>
        </p>
        <p>
          이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 다음의 정보에
          대해서는 아래의 이유로 명시한 기간 동안 보존합니다.
        </p>
        <p>가. 회사 내부 방침에 의한 정보보유 사유</p>
        <p>&lt; 부정이용기록 &gt;</p>
        <p>보존 이유 : 부정 이용 방지 보존 기간 : 1년</p>
        <p>나. 관련법령에 의한 정보보유 사유</p>
        <p>
          상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는
          관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만
          이용하며 보존기간은 아래와 같습니다.
        </p>
        <p>
          &lt; 계약 또는 청약철회 등에 관한 기록 &gt; <br /> 보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률 보존
          기간 : 5년
        </p>
        <p>
          &lt; 대금결제 및 재화 등의 공급에 관한 기록 &gt; <br /> 보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
          보존 기간 : 5년
        </p>
        <p>
          &lt; 소비자의 불만 또는 분쟁처리에 관한 기록 &gt; <br /> 보존 이유 : 전자상거래 등에서의 소비자보호에 관한
          법률 보존 기간 : 3년
        </p>
        <p>
          &lt; 본인확인에 관한 기록 &gt; <br /> 보존 이유 : 정보통신 이용촉진 및 정보보호 등에 관한 법률 보존 기간 :
          6개월
        </p>
        <p>
          &lt; 방문에 관한 기록 &gt; <br /> 보존 이유 : 통신비밀보호법 보존 기간 : 3개월
        </p>
        <p>
          <strong>6. 개인정보 파기절차 및 방법</strong>
        </p>
        <p>
          이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 회사의 개인정보
          파기절차 및 방법은 다음과 같습니다.
        </p>
        <p>가. 파기절차</p>
        <ul className="pl-[40px] list-disc mb-4">
          <li>
            이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함)
            내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조)일정 기간 저장된 후
            파기됩니다.
          </li>
          <li>동 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되지 않습니다.</li>
        </ul>
        <p>나. 파기방법</p>
        <ul className="pl-[40px] list-disc mb-4">
          <li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
          <li>전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
        </ul>
        <p>
          <strong>7. 이용자 및 법정대리인의 권리와 그 행사방법</strong>
        </p>
        <ul className="pl-[40px] list-disc mb-4">
          <li>
            이용자 및 법정 대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나
            수정할 수 있으며 가입해지를 요청할 수도 있습니다.
          </li>
          <li>
            이용자 혹은 만 14세 미만 아동의 개인정보 조회, 수정을 위해서는 &apos;개인정보변경&apos;(또는
            &apos;회원정보수정&apos; 등)을, 가입해지(동의철회)를 위해서는 &quot;회원탈퇴&quot;를 클릭하여 본인 확인
            절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.
          </li>
          <li>혹은 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.</li>
          <li>
            이용자가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는
            제공하지 않습니다. 또한 잘못된 개인정보를 제3 자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체
            없이 통지하여 정정이 이루어지도록 하겠습니다.
          </li>
          <li>
            회사는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 &quot;5. 개인정보의 보유 및
            이용기간&quot;에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.
          </li>
          <li>회사는 원칙적으로 정보주체가 미성년자일 경우 개인정보를 수집하지 않습니다.</li>
        </ul>
        <p>
          <strong>8. 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항</strong>
        </p>
        <p>
          회사는 이용자들에게 특화된 맞춤서비스를 제공하기 위해서 이용자들의 정보를 저장하고 수시로 불러오는
          &apos;쿠키(cookie)&apos;를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버(HTTP)가 이용자의 컴퓨터
          브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.
        </p>
        <p>가. 쿠키의 사용 목적</p>
        <p>
          이용자들이 방문한 고객지원 센터의 각 서비스 등을 파악하여 이용자에게 최적화된 정보 제공을 위하여 사용합니다.
        </p>
        <p>나. 쿠키의 사용 목적</p>
        <ul className="pl-[40px] list-disc mb-4">
          <li>
            이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 모든
            쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
          </li>
          <li>
            쿠키 설정을 거부하는 방법으로는 이용자가 사용하는 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나
            쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.
          </li>
          <li>설정방법 예(인터넷 익스플로어의 경우) : 웹 브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보</li>
        </ul>
        <p>
          <strong>9. 개인정보의 기술적/관리적 보호 대책</strong>
        </p>
        <p>
          회사는 이용자들의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성
          확보를 위하여 다음과 같은 기술적/관리적 대책을 강구하고 있습니다.
        </p>
        <p>가. 비밀번호 암호화</p>
        <p>
          고객지원 센터 회원 아이디(ID)의 비밀번호는 암호화되어 저장 및 관리되고 있어 본인만이 알고 있으며, 개인정보의
          확인 및 변경도 비밀번호를 알고 있는 본인에 의해서만 가능합니다.
        </p>
        <p>나. 해킹 등에 대비한 대책</p>
        <p>
          회사는 해킹이나 컴퓨터 바이러스 등에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고
          있습니다.
        </p>
        <p>
          개인정보의 훼손에 대비해서 자료를 수시로 백업하고 있고, 최신 백신프로그램을 이용하여 이용자들의 개인정보나
          자료가 누출되거나 손상되지 않도록 방지하고 있으며, 암호화통신 등을 통하여 네트워크상에서 개인정보를 안전하게
          전송할 수 있도록 하고 있습니다. 그리고 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있으며,
          기타 시스템적으로 보안성을 확보하기 위한 가능한 모든 기술적 장치를 갖추려 노력하고 있습니다.
        </p>
        <p>다. 취급 직원의 최소화 및 교육</p>
        <p>
          회사의 개인정보관련 취급 직원은 담당자에 한정시키고 있고 이를 위한 별도의 비밀번호를 부여하여 정기적으로
          갱신하고 있으며, 담당자에 대한 수시 교육을 통하여 고객지원 센터 개인정보처리방침의 준수를 항상 강조하고
          있습니다.
        </p>
        <p>라. 개인정보보호전담기구의 운영</p>
        <p>
          그리고 사내 개인정보보호전담기구 등을 통하여 고객지원 센터 개인정보처리방침의 이행사항 및 담당자의 준수여부를
          확인하여 문제가 발견될 경우 즉시 수정하고 바로 잡을 수 있도록 노력하고 있습니다. 단, 이용자 본인의 부주의나
          인터넷상의 문제로 ID, 비밀번호 등 개인정보가 유출되어 발생한 문제에 대해 회사는 일체의 책임을 지지 않습니다.
        </p>
        <p>
          <strong>10. 개인정보관리책임자 및 담당자의 연락처</strong>
        </p>
        <p>
          귀하께서는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자 혹은
          담당부서로 신고하실 수 있습니다.
        </p>
        <p>회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.</p>
        <p>개인정보 관리책임자</p>
        <p>
          이 름 박 희운 <br />
          전 화 010-8785-7935 <br />메 일{" "}
          <a className="text-[#1677ff] hover:underline" href="mailto:kihihi81@pmsplus.co.kr">
            kihihi81@pmsplus.co.kr
          </a>
        </p>
        <p>기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.</p>
        <ul className="pl-[40px] list-disc mb-4">
          <li>
            개인분쟁조정위원회 ({" "}
            <a className="text-[#1677ff] hover:underline" href="http://www.kopico.go.kr" target="_blank">
              www.kopico.go.kr
            </a>{" "}
            / 1833-6972 )
          </li>
          <li>
            정보보호마크인증위원회 ({" "}
            <a className="text-[#1677ff] hover:underline" href="http://www.eprivacy.or.kr" target="_blank">
              www.eprivacy.or.kr
            </a>{" "}
            / 02-550-9531~2)
          </li>
          <li>
            대검찰청 인터넷범죄수사센터 ({" "}
            <a className="text-[#1677ff] hover:underline" href="http://www.spo.go.kr" target="_blank">
              www.spo.go.kr
            </a>{" "}
            / 1301)
          </li>
          <li>
            경찰청 사이버테러대응센터 ({" "}
            <a className="text-[#1677ff] hover:underline" href="http://cyberbureau.police.go.kr" target="_blank">
              cyberbureau.police.go.kr
            </a>{" "}
            / 182)
          </li>
        </ul>
        <p>
          <strong>11. 기타</strong>
        </p>
        <p>해당 없음</p>
        <p>
          <strong>12. 고지의 의무</strong>
        </p>
        <p>
          현 개인정보처리방침 내용 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일전부터 홈페이지의
          &apos;공지사항&apos;을 통해 고지할 것입니다.
        </p>
        <ul className="pl-[40px] list-disc mb-4">
          <li>공고일자 : 2013년 10월 21일</li>
          <li>시행일자 : 2013년 10월 21일</li>
        </ul>
      </Modal>
      {contextHolder}
    </>
  );
};
export default PrivacyAgreeModal;
