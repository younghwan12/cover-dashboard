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
import { useLazyGetUserMgtListQuery } from "../../redux";
import { UserList } from "../../types";

const UserMgtTable = () => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(15);
    const [modal, contextHolder] = useModal();
    const [selectedDatas, setSelectedDatas] = useState<
        DataTableSelection<UserList[]> | undefined
    >();

    const token = useAppSelector((state) => state.login.userInfo);
    const userInfoDetail = useAppSelector(
        (state) => state.login.userInfoDetail
    );

    const { searchParams } = useAppSelector((state) => state.user);

    const [getUserList, { data: userList, isFetching }] =
        useLazyGetUserMgtListQuery();

    // 팝업 열리면 데이터 호출
    useEffect(() => {
        if (token?.jwt) {
            getUserList({
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
        getUserList({
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
                    사용자 정보 (전체
                    {`${userList?.recordsTotal ?? userList?.recordsTotal}`}건)
                </div>
                <DataTable
                    className="datatable-custom"
                    stripedRows
                    value={userList?.list}
                    loading={isFetching}
                    selectionMode="checkbox"
                    selection={selectedDatas}
                    onSelectionChange={(
                        e: DataTableSelectionChangeEvent<UserList[]>
                    ) => setSelectedDatas(e.value)}
                    rows={rows}
                >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3rem" }}
                    ></Column>
                    <Column field="no" header="No." />
                    <Column field="user_id" header="사용자 ID" />
                    <Column field="company" header="회사" />
                    <Column field="auth_name" header="권한" />
                    <Column field="active_status_name" header="상태" />
                    <Column field="crtr_dt" header="등록일시" />
                    <Column field="last_login_dt" header="마지막 로그인" />
                    <Column field="create_route" header="등록경로" />
                </DataTable>
                <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={userList?.recordsTotal}
                    onPageChange={onPageChange}
                />
            </div>
            {/* </div> */}
        </>
    );
};

export default UserMgtTable;
