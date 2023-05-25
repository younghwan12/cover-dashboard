import { Form, Input, Modal, useForm } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";

import { Option, Select } from "@/common/Select";
import { useModal } from "@/components/Modal";
import { Button, Descriptions } from "antd";

import {
  useDelCodeMutation,
  useUpDateCodeListMutation,
} from "@/features/codeMgt/redux";
import { AddCodeMgtReq } from "@/features/codeMgt/types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useLazyGetIssuesHistoryQuery } from "@/features/issues/redux";
import { IssueHistoryItem } from "@/features/issues/types";

interface IModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  issueId: string;
  projectNo: string;
}

const IssuesHistoryModal = ({
  visible,
  setVisible,
  issueId,
  projectNo,
}: IModalProps) => {
  const [form] = useForm();
  const [modal, contextHolder] = useModal();
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.login.userInfo);
  const userInfoDetail = useAppSelector((state) => state.login.userInfoDetail);

  const [getHistory, { data: history, isFetching }] =
    useLazyGetIssuesHistoryQuery();
  useEffect(() => {
    if (visible) {
      getHistory({
        issue_id: issueId,
        project_no: projectNo,
        jwt: token?.jwt,
        login_id: userInfoDetail?.jwt?.user_id,
      });
    }
  }, [token?.jwt, userInfoDetail?.jwt?.user_id, visible]);

  const modalOnCancelFun = () => {
    setVisible(false);
  };

  const modifierTemplate = (rowData: IssueHistoryItem) => {
    const { user_name, crtr_id } = rowData;
    return (
      <div>
        {user_name}({crtr_id})
      </div>
    );
  };

  const modifyContentTemplate = (rowData: IssueHistoryItem) => {
    const { history_id, history_type, chg_column, before_value, after_value } =
      rowData;

    if (history_type === "new") {
      return (
        <ul className="list-disc text-left px-5">
          <li>신규등록</li>
        </ul>
      );
    } else {
      const chgColumns = chg_column.split(",");
      const beforeValues = before_value.split(",");
      const afterValues = after_value.split(",");

      return (
        <ul className="list-disc text-left px-5">
          {chgColumns.map((column, index) => (
            <li key={index}>
              <b>{column.trim()}</b>을(를) <i>{beforeValues[index].trim()}</i>
              에서 <i>{afterValues[index].trim() || "빈 값"}</i>(으)로
              변경되었습니다.
            </li>
          ))}
        </ul>
      );
    }
  };

  const processedData: IssueHistoryItem[] = [];
  let mergedData: IssueHistoryItem | null = null;

  if (history && history.issueHistory) {
    history.issueHistory.forEach((item) => {
      if (!mergedData || mergedData.history_id !== item.history_id) {
        if (mergedData) {
          processedData.push(mergedData);
        }
        mergedData = { ...item };
      } else {
        mergedData.chg_column += `, ${item.chg_column}`;
        mergedData.before_value += `, ${item.before_value}`;
        mergedData.after_value += `, ${item.after_value}`;
      }
    });

    if (mergedData) {
      processedData.push(mergedData);
    }
  }

  return (
    <>
      <Modal
        title="이력 정보"
        width={1000}
        open={visible}
        onCancel={() => modalOnCancelFun()}
        footer={[
          <Button key="close" onClick={() => modalOnCancelFun()}>
            닫기
          </Button>,
        ]}
      >
        <DataTable
          className="datatable-custom"
          stripedRows
          lazy
          rowHover
          value={processedData}
        >
          <Column style={{ width: "5%" }} field="history_id" header="No." />
          <Column
            style={{ width: "15%" }}
            body={modifierTemplate}
            header="수정자"
          />
          <Column
            style={{ width: "60%" }}
            body={modifyContentTemplate}
            header="수정내용"
          />
          <Column style={{ width: "15%" }} field="crtr_dt" header="수정일시" />
        </DataTable>
      </Modal>
      {contextHolder}
    </>
  );
};
export default IssuesHistoryModal;
