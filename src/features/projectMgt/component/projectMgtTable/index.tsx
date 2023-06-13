import { SetStateAction, useCallback, useEffect, useState } from "react";

import { useModal } from "@/common";
import { useAppSelector } from "@/redux/hooks";
import { Column } from "primereact/column";
import { DataTable, DataTableSelection, DataTableSelectionChangeEvent } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { ProjectDelReq, ProjectList } from "../../types";
import { useDelProjectMgtListMutation, useLazyGetProjectMgtListQuery } from "../../redux";
import { Button, InputNumber } from "antd";
import { AddProjectModal, DetailProjectModal } from "@/features/modal";

const ProjectMgtTable = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(15);
  const [modal, contextHolder] = useModal();
  const [selectedDatas, setSelectedDatas] = useState<DataTableSelection<ProjectList[]> | undefined>();
  const [rowData, setRowData] = useState([]);

  const token = useAppSelector((state) => state.login.userInfo);
  const userInfoDetail = useAppSelector((state) => state.login.userInfoDetail);

  const { searchParams } = useAppSelector((state) => state.project);

  const [getProjectList, { data: projectList, isFetching }] = useLazyGetProjectMgtListQuery();

  const [delProject] = useDelProjectMgtListMutation();

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

  const detailPrj = (e) => {
    setVisible2(true);
    setRowData(e.data);
  };

  const removeProject = () => {
    if (Array.isArray(selectedDatas) && selectedDatas.length > 0) {
      const selectnewData = selectedDatas.map(({ project_no }) => ({
        project_no,
      }));
      modal.confirm({
        title: "선택된 프로젝트와 연관된 모든 데이터가 삭제됩니다. 삭제하시겠습니까?",
        onOk() {
          console.log(selectnewData);
          const formData: ProjectDelReq = {
            delData: JSON.stringify(selectnewData),
            jwt: token.jwt,
            login_id: userInfoDetail.jwt.user_id,
          };
          delProject(formData)
            .unwrap()
            .then((data) => {
              modal.success({
                title: "삭제되었습니다.",
                onOk() {
                  setVisible(false);
                  setSelectedDatas([]);
                },
              });
            });
        },
      });
    } else {
      modal.error({
        title: "선택된 항목이 없습니다.",
      });
    }
  };

  const bpTemplateBody = (data) => {
    const formattedNumber = data.business_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return <div>{formattedNumber}</div>;
  };

  return (
    <>
      {contextHolder}
      <div className="mt-5 rounded-xl max-w-[85%] mx-auto">
        <div className="pt-7 flex justify-between items-center ">
          <div>
            프로젝트 정보 (전체
            {`${projectList?.recordsTotal ?? projectList?.recordsTotal}`}
            건)
          </div>
          <div className="mb-1">
            <Button type="primary" size="middle" onClick={addProject}>
              등록
            </Button>
            <Button type="dashed" className="ml-1" onClick={removeProject}>
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
          onSelectionChange={(e: DataTableSelectionChangeEvent<ProjectList[]>) => setSelectedDatas(e.value)}
          scrollable
          onRowClick={detailPrj}
        >
          <Column
            selectionMode="multiple"
            // headerStyle={{ width: "3rem" }}
          ></Column>
          <Column field="no" header="No." className="!text-center" />
          <Column field="project_name" header="프로젝트명" />
          <Column field="project_dt" header="프로젝트기간" className="!text-center" />
          <Column field="company" header="계약처" />
          <Column field="business_price" body={bpTemplateBody} header="사업 금액" className="!text-right" />
          {!isPhone && <Column field="nexcore_solution_name" header="피엠에스플러스 솔루션" className="!text-center" />}
          {!isPhone && <Column field="last_login_dt" header="예상 무상 유지보수 시간" className="!text-center" />}
          {!isPhone && <Column field="project_status_name" header="상태" className="!text-center" />}
          {!isPhone && <Column field="crtr_dt" header="등록일" className="!text-center" />}
          {!isPhone && <Column field="create_route" header="등록경로" className="!text-center" />}
        </DataTable>
        <Paginator first={first} rows={rows} totalRecords={projectList?.recordsTotal} onPageChange={onPageChange} />
      </div>

      <AddProjectModal visible={visible} setVisible={setVisible} />

      <DetailProjectModal visible={visible2} setVisible={setVisible2} rowData={rowData} />
    </>
  );
};

export default ProjectMgtTable;
