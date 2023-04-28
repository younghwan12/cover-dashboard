import { LogEx } from "@/common/types";

export interface DashboardReq extends LogEx {
    srch_project_no?: string;
    srch_issue_request?: string;
    srch_all_dt?: string;
    srch_start_dt?: string;
    srch_end_dt?: string;
}

export interface DashboardResList {
    list: DashboardList[];
}

export interface DashboardList {
    all_cnt: number;
    charger_ing_cnt: number;
    code_name?: string;
    complete_cnt: number;
    request_cnt: number;
}
