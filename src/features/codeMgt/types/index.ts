import { LogEx, Paging } from "@/common/types";

export interface CodeMgtReq extends Paging, LogEx {
    srch_code_group_id?: string;
    srch_code_name?: string;
}

export interface CodeMgtResList {
    list: List[];
    recordsTotal: number;
}

export interface List {
    all_cnt: number;
    chk: string;
    code_group_id: string;
    code_group_name: string;
    code_id: string;
    code_name: string;
    code_order: number;
    crtr_dt: string;
    mapping_code: string;
    no: number;
    parent_code_group_id: string;
    upd_dt: string;
    use_yn: string;
}
