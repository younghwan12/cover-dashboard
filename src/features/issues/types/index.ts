import { LogEx, Paging } from "@/common/types";

export interface IssuesListReq extends Paging, LogEx {
  project_no?: string;
  issue_id?: string | string[];
}
export interface IssuesListResList {
  list: IssuesList[];
  recordsTotal: number;
}

export interface IssuesList {
  all_cnt: string;
  answer_cnt: string;
  chk: string;
}

export interface UpdateIssuesListRes {
  issue_id?: string;
}

export interface UpdateIssuesListReq extends LogEx {
  project_no?: string;
  create_route?: string;
  issue_request_type?: string;
  issue_name?: string;
  detail: any;
}

export interface IssuesDetailResList {
  qaInfo: {
    crtr_dt?: string;
    crtr_id?: string;
    detail: string;
    issue_id?: string;
    project_no?: string;
    qa_id?: string;
    qa_type?: string;
    upd_dt?: string;
    upd_id?: string;
    upd_name?: string;
  }[];
  issueRequest: [
    {
      code_id: string;
      code_name: string;
      detail: string;
      no: number;
      use_yn: string;
    }
  ];
  fileInfo: [
    {
      crtr_dt: string;
      crtr_id: string;
      crtr_name: string;
      file_extention: string;
      file_name: string;
      file_path: string;
      file_size: string;
      file_uid: string;
      sub_ui_id: string;
    }
  ];
  issueStatus: [
    {
      code_id: string;
      code_name: string;
    }
  ];
  issueInfo: [
    {
      project_no?: string;
      issue_request_type: string;
      issue_request_type_name?: string;
      project_name?: string;
      answer_cnt?: string;
      nexcore_solution_name?: string;
      issue_status: string;
      issue_status_name?: string;
      crtr_name?: string;
      charger?: string;
      charger_name?: string;
      crtr_dt?: string;
      upd_dt?: string;
      issue_name?: string;
    }
  ];
}

export interface UpdateFilesReq extends LogEx {
  files?: Blob[];
  project_no?: string;
  board_type?: string;
  ui_id?: any;
  sub_ui_id?: string;
}
export interface UpdateFilesRes {}

export interface IssueHistoryRes {
  issueHistory: [IssueHistoryItem];
}

export interface IssueHistoryItem {
  after_value: string;
  before_value: string;
  chg_column: string;
  crtr_dt: string;
  crtr_id: string;
  history_id: string;
  history_type: string;
  user_name: string;
}

export interface AddIssuesQAReq extends LogEx {
  project_no?: string;
  issue_id?: string;
  issue_status?: string;
  bf_issue_status?: string;
  qa_type?: string;
  detail?: string;
}
export interface AddIssuesQARes {
  qa_id: string;
}
