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
import { ProjectList } from "../../types";
import { useLazyGetProjectMgtListQuery } from "../../redux";
import { Button } from "antd";
import { AddProjectModal } from "@/features/modal";

const ProjectMgtTable = () => {
    const [visible, setVisible] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(15);
    const [modal, contextHolder] = useModal();
    const [selectedDatas, setSelectedDatas] = useState<
        DataTableSelection<ProjectList[]> | undefined
    >();

    const token = useAppSelector((state) => state.login.userInfo);
    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    const { searchParams } = useAppSelector((state) => state.project);

    const [getProjectList, { data: projectList, isFetching }] =
        useLazyGetProjectMgtListQuery();

    // 팝업 열리면 데이터 호출
    useEffect(() => {
        if (token?.jwt) {
            getProjectList({
                ...searchParams,
                jwt: token.jwt,
                login_id: userInfoDetail?.jwt?.user_id,
                page_startnum: 1,
                page_endnum: 15,
            });
        }
    }, [token?.jwt, searchParams]);

    const onPageChange = (e) => {
        setFirst(e.first);
        setRows(e.rows);
        getProjectList({
            ...searchParams,
            jwt: token.jwt,
            login_id: userInfoDetail.jwt.user_id,
            page_startnum: e.first + 1,
            page_endnum: e.first + rows,
        });
    };

    const addProject = () => {
        setVisible(true);
    };

    return (
        <>
            {contextHolder}
            <div className="mt-5 rounded-xl max-w-[85%] mx-auto">
                <div className="pt-7 flex justify-between items-center ">
                    <div>
                        프로젝트 정보 (전체
                        {`${
                            projectList?.recordsTotal ??
                            projectList?.recordsTotal
                        }`}
                        건)
                    </div>
                    <div className="mb-1">
                        <Button
                            type="primary"
                            size="middle"
                            onClick={addProject}
                        >
                            등록
                        </Button>
                        <Button type="dashed" className="ml-1">
                            삭제
                        </Button>
                        <Button className="ml-1">엑셀다운로드</Button>
                    </div>
                </div>
                <DataTable
                    className="datatable-custom cursor-pointer"
                    stripedRows
                    lazy
                    rowHover
                    value={projectList?.list}
                    loading={isFetching}
                    selectionMode="checkbox"
                    selection={selectedDatas}
                    onSelectionChange={(
                        e: DataTableSelectionChangeEvent<ProjectList[]>
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
                    <Column field="project_dt" header="프로젝트기간" />
                    <Column field="company" header="계약처" />
                    <Column field="business_price" header="사업 금액" />
                    <Column
                        field="nexcore_solution_name"
                        header="피엠에스플러스 솔루션"
                    />
                    <Column
                        field="last_login_dt"
                        header="예상 무상 유지보수 시간"
                    />
                    <Column
                        field="project_status_name"
                        // style={{ minWidth: "80px" }}
                        header="상태"
                    />
                    <Column field="crtr_dt" header="등록일" />
                    <Column field="create_route" header="등록경로" />
                </DataTable>
                <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={projectList?.recordsTotal}
                    onPageChange={onPageChange}
                />
            </div>

            <AddProjectModal visible={visible} setVisible={setVisible} />
        </>
    );
};

export default ProjectMgtTable;
