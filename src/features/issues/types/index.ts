import { LogEx, Paging } from "@/common/types";

export interface IssuesListReq extends Paging, LogEx {
    project_no?: string;
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
