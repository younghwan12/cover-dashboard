import { useCallback, useEffect, useState } from "react";

import { useModal } from "@/common";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "antd";
import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable, DataTableSelection } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { useLazyGetIssuesMgtListQuery } from "../../redux";
import { IssuesList } from "../../types";

const IssuesTable = () => {
  const router = useRouter();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(15);

  const token = useAppSelector((state) => state.login.userInfo);
  const userInfoDetail = useAppSelector((state) => state.login.userInfoDetail);

  const { searchParams } = useAppSelector((state) => state.issues);

  const [getIssuesList, { data: issuesList, isFetching }] = useLazyGetIssuesMgtListQuery();
  const [isPhone, setIsPhone] = useState(false);

  const handleResize = useCallback(() => {
    setIsPhone(window.innerWidth <= 720);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // 팝업 열리면 데이터 호출
  useEffect(() => {
    if (token?.jwt) {
      getIssuesList({
        project_no: "newsupport2",
        ...searchParams,
        jwt: token?.jwt,
        login_id: userInfoDetail?.jwt?.user_id,
        page_startnum: 1,
        page_endnum: 15,
      });
    }
  }, [token?.jwt, searchParams]);

  const onPageChange = (e) => {
    setFirst(e.first);
    setRows(e.rows);
    getIssuesList({
      ...searchParams,
      project_no: "newsupport2",
      jwt: token.jwt,
      login_id: userInfoDetail.jwt.user_id,
      page_startnum: e.first + 1,
      page_endnum: e.first + rows,
    });
  };

  const issuesDetail = (e) => {
    router.push({
      pathname: "/issues/detail",
      query: { issue_id: e.data.issue_id },
    });
  };

  return (
    <>
      <div className="mt-5 rounded-xl max-w-[85%] mx-auto">
        <div className="pt-7 flex justify-between items-center ">
          <div>
            문의 정보 (전체
            {`${issuesList?.recordsTotal ?? issuesList?.recordsTotal}`}
            건)
          </div>
          <div className="mb-1">
            <Button type="primary" size="middle" onClick={() => router.push("/issues/add")}>
              등록
            </Button>
            <Button className="ml-2">액셀다운로드</Button>
          </div>
        </div>
        <DataTable
          className="datatable-custom cursor-pointer"
          stripedRows
          lazy
          rowHover
          value={issuesList?.list}
          loading={isFetching}
          rows={rows}
          scrollable
          onRowClick={issuesDetail}
        >
          <Column field="issue_id" header="No." className="!text-center" />
          <Column field="project_name" header="프로젝트명" />
          {!isPhone && <Column field="nexcore_solution_name" header="솔루션" className="!text-center" />}
          <Column field="issue_request_name" header="요청사항" />
          <Column field="issue_name" header="제목" />
          {!isPhone && <Column field="crtr_name" header="작성자" className="!text-center" />}
          {!isPhone && <Column field="last_login_dt" header="담당자" className="!text-center" />}
          {!isPhone && <Column field="issue_status_name" header="상태" className="!text-center" />}
          {!isPhone && <Column field="question_cnt" header="문의건수" className="!text-center" />}
          {!isPhone && <Column field="answer_cnt" header="답변건수" className="!text-center" />}
          {!isPhone && <Column field="crtr_dt" header="등록일시" className="!text-center" />}
        </DataTable>
        <Paginator first={first} rows={rows} totalRecords={issuesList?.recordsTotal} onPageChange={onPageChange} />
      </div>
    </>
  );
};

export default IssuesTable;
