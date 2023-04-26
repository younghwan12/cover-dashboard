import { LogEx } from "@/common/types";

export interface DashboardReq extends LogEx {
    srch_project_no?: string;
    srch_issue_request?: string;
    srch_all_dt?: string;
    srch_start_dt?: string;
    srch_end_dt?: string;
}

export interface DashboardResList {
    list: List[];
}

export interface List {
    all_cnt: Number;
    charger_ing_cnt: Number;
    code_name: string;
    complete_cnt: Number;
    request_cnt: Number;
}
