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
import { useLazyGetCodeListQuery } from "../../redux/codeApi";
import { List } from "../../types";

const CodeMgtTable = () => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(15);
    const [modal, contextHolder] = useModal();
    const [selectedDatas, setSelectedDatas] = useState<
        DataTableSelection<List[]> | undefined
    >();

    const token = useAppSelector((state) => state.login.userInfo);
    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    const { searchParams } = useAppSelector((state) => state.code);

    const [getCdList, { data: cdList, isFetching }] = useLazyGetCodeListQuery();

    // 팝업 열리면 데이터 호출
    useEffect(() => {
        if (token && token?.jwt) {
            getCdList({
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
        getCdList({
            ...searchParams,
            jwt: token.jwt,
            login_id: userInfoDetail.jwt.user_id,
            page_startnum: e.first + 1,
            page_endnum: e.first + rows,
        });
    };

    return (
        <>
            {/* <div className="mt-5 rounded-xl max-w-[80%] mx-auto border border-[#cdcdcd]"> */}
            {contextHolder}
            <div className="mt-5 rounded-xl max-w-[85%] mx-auto">
                <div className="pt-7">
                    코드 정보 (전체
                    {`${cdList?.recordsTotal ?? cdList?.recordsTotal}`}건)
                </div>
                <DataTable
                    className="datatable-custom"
                    stripedRows
                    value={cdList?.list}
                    loading={isFetching}
                    selectionMode="checkbox"
                    selection={selectedDatas}
                    onSelectionChange={(
                        e: DataTableSelectionChangeEvent<List[]>
                    ) => setSelectedDatas(e.value)}
                    rows={rows}
                >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3rem" }}
                    ></Column>
                    <Column field="no" header="No." />
                    <Column field="code_group_name" header="그룹코드명" />
                    <Column field="code_id" header="코드ID" />
                    <Column field="code_name" header="코드명" />
                    <Column
                        field="parent_code_group_name"
                        header="상위그룹코드명"
                    />
                    <Column field="mapping_code" header="매핑코드명" />
                    <Column field="code_order" header="정렬순서" />
                    <Column field="use_yn" header="사용여부" />
                </DataTable>
                <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={cdList?.recordsTotal}
                    onPageChange={onPageChange}
                />
            </div>
            {/* </div> */}
        </>
    );
};
export default CodeMgtTable;
