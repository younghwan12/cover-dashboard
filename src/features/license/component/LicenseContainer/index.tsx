import { useModal } from "@/components/Modal";
import CustomAddModal from "@/features/modal/license/CustomAddModal";
import CustomDetailModal from "@/features/modal/license/CustomDetailModal";
import IpAddModal from "@/features/modal/license/IpAddModal";
import ProjectAddModal from "@/features/modal/license/ProjectAddModal";
import { Button } from "antd";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import IpDetailModal from "@/features/modal/license/IpDetailModal";
import axios from "axios";
import { parseStringPromise } from "xml2js";
import { useLazyIssueLicenseQuery } from "../../redux/licenseCallApi";

const customInfo = [
  {
    userId: "0000000012",
    고객: "CDI",
  },
  {
    userId: "0000000007",
    고객: "GSTIM",
  },
  {
    userId: "0000000004",
    고객: "SKWELL",
  },
  {
    userId: "0000000009",
    고객: "SK-증권금융_임시",
  },
  {
    userId: "0000000008",
    고객: "디앤아이컨설팅",
  },
  {
    userId: "0000000011",
    고객: "루키도",
  },
  {
    userId: "0000000009",
    고객: "SK-증권금융_임시",
  },
  {
    userId: "0000000005",
    고객: "피엠에스플러스",
  },
  {
    userId: "0000000012",
    고객: "CDI",
  },
];

const LicenseContainer = () => {
  const [visible, setVisible] = useState(false);
  const [visible4, setVisible4] = useState(false);

  const [visible2, setVisible2] = useState(false);
  const [visible5, setVisible5] = useState(false);

  const [visible3, setVisible3] = useState(false);
  const [customRowData, setCustomRowData] = useState([]);
  const [ipRowData, setIpRowData] = useState([]);

  const [modal, contextHolder] = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const url =
      "/api/coverdreamit/web/common/BCLicenseManager2/pmLicenseHistoryListInq_for_ip.xmd";

    const xmlData =
      '<?xml version="1.0" encoding="UTF-8"?><request><transaction><id>common.BCLicenseManager2#pmLicenseHistoryListInq_for_ip</id></transaction><attributes><userId/></attributes><dataSet><fields><urlStr>http://coverdreamit.co.kr:2401/web/jsp/cm/SLicenseManagerRetrieve2.jsp</urlStr><uid>0000000005</uid></fields></dataSet><validation><result>true</result><errors/></validation></request>';
    axios
      .post(url, xmlData, {
        headers: {
          Accept: "application/xml, text/xml, */*; q=0.01",
          "Content-Type": "text/xml; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
        },
      })
      .then((response) => {
        parseStringPromise(response.data, { explicitArray: false })
          .then((result) => {
            setData(result.response.dataSet.recordSet.record);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [
    issueLicense,
    { isLoading: LicenseLoading, isError, data: LicenseData },
  ] = useLazyIssueLicenseQuery();

  // RTK수정중..
  // const [
  //     getlicenseList,
  //     { data: licenseData, error, isLoading, isFetching },
  // ] = useLazyGetLicenseQuery();

  // useEffect(() => {
  //     if (!isLoading && licenseData) {
  //         console.log("licenseData", licenseData);
  //     }
  // }, [isLoading, licenseData]);

  const CustomInfoheader = () => {
    return (
      <div className="flex justify-between items-center">
        <h2>고객정보</h2>
        <div>
          <Button size="small" onClick={() => setVisible(true)}>
            고객등록
          </Button>
          <Button size="small">삭제</Button>
        </div>
      </div>
    );
  };
  const IpInfoheader = () => {
    return (
      <div className="flex justify-between items-center">
        <h2>IP 정보</h2>
        <div>
          <Button size="small" onClick={() => setVisible2(true)}>
            IP등록
          </Button>
          <Button size="small">삭제</Button>
        </div>
      </div>
    );
  };
  const Projectheader = () => {
    return (
      <div className="flex justify-between items-center">
        <h2>프로젝트 정보</h2>
        <div>
          <Button size="small" onClick={() => setVisible3(true)}>
            PROJECT등록
          </Button>
          <Button size="small">삭제</Button>
        </div>
      </div>
    );
  };

  const CustomModBodyTemplate = (e) => {
    return (
      <div className="inline-block">
        <FaSearch className="cursor-pointer" onClick={() => CustomModify(e)} />
      </div>
    );
  };
  const CustomModify = (e) => {
    setCustomRowData(e);
    setVisible4(true);
  };

  const IpModBodyTemplate = (e) => {
    return (
      <div className="inline-block">
        <FaSearch className="cursor-pointer" onClick={() => IpModify(e)} />
      </div>
    );
  };
  const licenseIssueTemplate = (e) => {
    return <button onClick={() => excelIssues(e)}>발급</button>;
  };

  /** 라이센스 발급*/
  const excelIssues = (e) => {
    const formData = {
      nc_trId: "common.BCLicenseManager2#pmImportLicense",
      nc_target: "/jsp/cm/ExcelDownload.jsp",
      file_nm: "",
      ip_uid: e.ip_uid,
      excelFileNm: "",
      excelPath: "",
    };
    const url =
      "/api/coverdreamit/web/common/BCLicenseManager2/pmImportLicense.xmd";

    axios
      .post(url, formData, {
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        parseStringPromise(response.data, { explicitArray: false })
          .then((result) => {
            if (result.response.dataSet.message.result === "FAIL") {
              modal.error({
                title: result.response.dataSet.message.result,
                content: result.response.dataSet.message.messageName,
              });
            } else {
              // 성공 응답 처리
              // 엑셀 파일 다운로드 링크 생성
              const downloadLink = document.createElement("a");
              downloadLink.href = "<URL_TO_EXCEL_FILE>";
              downloadLink.download = "example.xlsx";
              downloadLink.click();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });

    // issueLicense(formData);
  };

  const IpModify = (e) => {
    setIpRowData(e);
    setVisible5(true);
  };

  const CustomRowClick = (e) => {
    const url =
      "/api/coverdreamit/web/common/BCLicenseManager2/pmLicenseHistoryListInq_for_ip.xmd";

    const xmlData = `<?xml version="1.0" encoding="UTF-8"?><request><transaction><id>common.BCLicenseManager2#pmLicenseHistoryListInq_for_ip</id></transaction><attributes><userId/></attributes><dataSet><fields><urlStr>http://coverdreamit.co.kr:2401/web/jsp/cm/SLicenseManagerRetrieve2.jsp</urlStr><uid>${e.data.userId}</uid></fields></dataSet><validation><result>true</result><errors/></validation></request>`;
    setIsLoading(true);
    axios
      .post(url, xmlData, {
        headers: {
          Accept: "application/xml, text/xml, */*; q=0.01",
          "Content-Type": "text/xml; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
        },
      })
      .then((response) => {
        parseStringPromise(response.data, { explicitArray: false })
          .then((result) => {
            const records = Array.isArray(
              result.response.dataSet.recordSet.record
            )
              ? result.response.dataSet.recordSet.record
              : [result.response.dataSet.recordSet.record];

            setData(records);
            // setData(result.response.dataSet.recordSet.record);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div>
        <h2>라이센스 관리</h2>
        {contextHolder}
      </div>
      <div className="flex justify-between">
        {/* 고객정보 데이터테이블 */}
        <DataTable
          rowHover
          selectionMode="checkbox"
          className="!w-[25%] headersize cursor-pointer"
          header={CustomInfoheader}
          value={customInfo}
          onRowClick={(e) => CustomRowClick(e)}
        >
          <Column selectionMode="multiple" className="w-[5%]"></Column>
          <Column header="고객" field="고객" className="w-[70%]"></Column>
          <Column header="수정" body={CustomModBodyTemplate}></Column>
        </DataTable>
        {/* IP정보 데이터테이블 */}
        <DataTable
          rowHover
          loading={isLoading}
          selectionMode="checkbox"
          className="!w-[48%] headersize"
          header={IpInfoheader}
          value={data}
          onRowClick={(v) => console.log(v)}
        >
          <Column selectionMode="multiple" className="w-[5%]"></Column>
          <Column header="IP" field="host_ip" className="w-[15%]"></Column>
          <Column
            header="MAC Address"
            field="mac_address"
            className="w-[30%]"
          ></Column>
          <Column header="시작일" field="start_dt"></Column>
          <Column header="종료일" field="expriy_dt"></Column>
          <Column header="발급" body={licenseIssueTemplate}></Column>
          <Column header="수정" body={IpModBodyTemplate}></Column>
        </DataTable>
        {/* 프로젝트정보 데이터테이블 */}
        <DataTable
          rowHover
          selectionMode="checkbox"
          className="!w-[25%] headersize"
          header={Projectheader}
        >
          <Column selectionMode="multiple" className="w-[5%]"></Column>
          <Column
            header="프로젝트NO"
            field="프로젝트NO"
            className="w-[70%]"
          ></Column>
          <Column header="수정" field="수정"></Column>
        </DataTable>
      </div>

      <CustomAddModal visible={visible} setVisible={setVisible} />

      <CustomDetailModal
        visible={visible4}
        setVisible={setVisible4}
        customRowData={customRowData}
      />

      <IpAddModal visible={visible2} setVisible={setVisible2} />

      <IpDetailModal
        visible={visible5}
        setVisible={setVisible5}
        ipRowData={ipRowData}
      />

      <ProjectAddModal visible={visible3} setVisible={setVisible3} />
    </>
  );
};

export default LicenseContainer;
