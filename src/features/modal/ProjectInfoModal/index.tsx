import { Form, FormItem, Input, Modal, useForm } from "@/components";
import { useModal } from "@/components/Modal";
import { SearchForm } from "@/components/search";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";

import { Space } from "@/common";
import {
  useLazyGetProjectDetailQuery,
  useLazyGetProjectMgtListQuery,
  useUpDateProjectMgtListMutation,
} from "@/features/projectMgt/redux";
import { Column } from "primereact/column";
import { DataTable, DataTableSelectionChangeEvent } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
interface IModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: (selectionRow: any) => void;

  //   , e: React.MouseEvent<HTMLElement, MouseEvent>
}

const ProjectInfoModal = ({ visible, setVisible, onOk }: IModalProps) => {
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

  const [getProject, { data: projectList, isFetching }] = useLazyGetProjectMgtListQuery();

  // 팝업 열리면 데이터 호출
  useEffect(() => {
    if (visible) {
      getProject({
        project_name: "",
        except_prj: "",
        page_startnum: 1,
        page_endnum: 10,
        login_id: userInfoDetail?.jwt?.user_id,
        jwt: token?.jwt,
      });
    }
  }, [token?.jwt, userInfoDetail?.jwt?.user_id, visible]);

  //   onOk(r, e);

  const handleFinish = (v) => {
    getProject({
      project_name: v.project_name,
      except_prj: "",
      page_startnum: 1,
      page_endnum: 10,
      login_id: userInfoDetail?.jwt?.user_id,
      jwt: token?.jwt,
    });
  };

  const modalOnCancelFun = () => {
    setVisible(false);
  };

  const modalOnOkFun = (r, e) => {
    form.submit();
    // setVisible(false);
  };

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(15);

  const onPageChange = (e) => {
    setFirst(e.first);
    setRows(e.rows);
    getProject({
      jwt: token?.jwt,
      login_id: userInfoDetail?.jwt?.user_id,
      page_startnum: e.first + 1,
      page_endnum: e.first + rows,
    });
  };

  const onRowSelect = (e) => {
    // onOk(r, e);
    onOk(e);
    setVisible(false);
  };

  /** 드래그기능 */
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);
  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 575);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Modal
        title={
          <div
            className="cursor-move"
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
          >
            프로젝트 정보
          </div>
        }
        width={700}
        open={visible}
        onCancel={() => modalOnCancelFun()}
        onOk={(e) => modalOnOkFun(selectedDatas, e)}
        footer={[
          <Button key="close" onClick={() => modalOnCancelFun()}>
            닫기
          </Button>,
        ]}
        modalRender={(modal) => (
          <Draggable disabled={disabled} bounds={bounds} onStart={(event, uiData) => onStart(event, uiData)}>
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Form form={form} onFinish={handleFinish}>
          <FormItem label="프로젝트 명" name="project_name">
            <Space className="">
              <Input placeholder={isMobile ? "프로젝트" : ""} />
              <Button type="primary" onClick={() => form.submit()}>
                조회
              </Button>
            </Space>
          </FormItem>
        </Form>
        <DataTable
          className="datatable-custom whitespace-nowrap cursor-pointer"
          stripedRows
          lazy
          rowHover
          scrollable
          value={projectList?.list}
          loading={isFetching}
          onRowClick={(e) => onRowSelect(e.data)}
        >
          <Column field="no" header="No." />
          <Column field="project_name" header="프로젝트명" />
          <Column field="project_dt" header="프로젝트 기간" />
          <Column field="company" header="계약처" />
          <Column field="nexcore_solution_name" header="PMS PLUS 솔루션" />
        </DataTable>
        <Paginator first={first} rows={rows} totalRecords={projectList?.recordsTotal} onPageChange={onPageChange} />
      </Modal>
      {contextHolder}
    </>
  );
};
export default ProjectInfoModal;
