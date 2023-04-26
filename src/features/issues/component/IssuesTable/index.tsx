import { SetStateAction, useEffect, useState } from "react";

import { useModal } from "@/common";
import { useAppSelector } from "@/redux/hooks";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTableSelection,
    DataTableSelectionChangeEvent,
} from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { IssuesList } from "../../types";
import { useLazyGetIssuesMgtListQuery } from "../../redux";

const IssuesTable = () => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(15);
    const [modal, contextHolder] = useModal();
    const [selectedDatas, setSelectedDatas] = useState<
        DataTableSelection<IssuesList[]> | undefined
    >();

    const token = useAppSelector((state) => state.login.userInfo);
    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    const { searchParams } = useAppSelector((state) => state.issues);

    const [getIssuesList, { data: issuesList, isFetching }] =
        useLazyGetIssuesMgtListQuery();

    // 팝업 열리면 데이터 호출
    useEffect(() => {
        if (token?.jwt) {
            getIssuesList({
                project_no: "newsupport2",
                ...searchParams,
                jwt: token.jwt,
                login_id: userInfoDetail.jwt.user_id,
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

    return (
        <>
            {contextHolder}
            <div className="mt-5 rounded-xl max-w-[85%] mx-auto">
                <div className="pt-7">
                    문의 정보 (전체
                    {`${issuesList?.recordsTotal ?? issuesList?.recordsTotal}`}
                    건)
                </div>
                <DataTable
                    className="datatable-custom"
                    stripedRows
                    value={issuesList?.list}
                    loading={isFetching}
                    selectionMode="checkbox"
                    selection={selectedDatas}
                    onSelectionChange={(
                        e: DataTableSelectionChangeEvent<IssuesList[]>
                    ) => setSelectedDatas(e.value)}
                    rows={rows}
                    scrollable
                >
                    <Column
                        selectionMode="multiple"
                        // headerStyle={{ width: "3rem" }}
                    ></Column>
                    <Column field="no" header="No." />
                    <Column field="project_name" header="프로젝트명" />
                    <Column field="nexcore_solution_name" header="솔루션" />
                    <Column field="issue_request_name" header="요청사항" />
                    <Column field="issue_name" header="제목" />
                    <Column field="crtr_name" header="작성자" />
                    <Column field="last_login_dt" header="담당자" />
                    <Column field="issue_status_name" header="상태" />
                    <Column field="question_cnt" header="문의건수" />
                    <Column field="answer_cnt" header="답변건수" />
                    <Column field="crtr_dt" header="등록일시" />
                </DataTable>
                <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={issuesList?.recordsTotal}
                    onPageChange={onPageChange}
                />
            </div>
        </>
    );
};

export default IssuesTable;
